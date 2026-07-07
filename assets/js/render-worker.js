/* Module Web Worker hosting the franken_markdown WASM renderer.
   Keeps parsing/layout/PDF work off the main thread so typing stays smooth.

   Protocol (main -> worker):
     { id, format: "html" | "pdf", markdown, options }
   Protocol (worker -> main):
     { type: "ready", capabilities }            once, after wasm init
     { type: "init-error", error }              if init fails
     { type: "result", id, format, ok: true, bytes, diagnostics, sourceLength, ms }
     { type: "result", id, format, ok: false, error }
   Result bytes are transferred (zero-copy) to the main thread. */

/* The wasm bundle lives in a version-named directory so the wrapper, glue,
   and .wasm always update as one unit: edge caches can never pair an old
   glue file with a new binary. Bump this path (and the worker URL ?v= in
   playground.js) when refreshing the engine. */
import { init, capabilities, renderHtml, renderPdf } from "../wasm/0.3.1/franken_markdown.js";

const booted = (async () => {
  await init();
  return capabilities();
})();

booted
  .then((caps) => {
    self.postMessage({ type: "ready", capabilities: caps });
  })
  .catch((error) => {
    self.postMessage({ type: "init-error", error: describe(error) });
  });

self.onmessage = async (event) => {
  const { id, format, markdown, options } = event.data;
  try {
    await booted;
    const t0 = performance.now();
    const output = format === "pdf"
      ? await renderPdf(markdown, options)
      : await renderHtml(markdown, options);
    const ms = performance.now() - t0;
    self.postMessage(
      {
        type: "result",
        id,
        format,
        ok: true,
        bytes: output.bytes,
        diagnostics: output.diagnostics,
        sourceLength: output.sourceLength,
        ms
      },
      [output.bytes.buffer]
    );
  } catch (error) {
    self.postMessage({ type: "result", id, format, ok: false, error: describe(error) });
  }
};

function describe(error) {
  if (error instanceof Error) return error.message;
  return String(error);
}
