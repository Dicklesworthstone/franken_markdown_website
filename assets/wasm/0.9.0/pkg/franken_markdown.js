/* @ts-self-types="./franken_markdown.d.ts" */

/**
 * A parsed book and bounded source capture retained across browser exports.
 * Source edits are transactional and preserve render options and assets.
 *
 * Construct with parallel arrays of book-relative paths and Markdown sources
 * in reading order. Call `free()` when the book is no longer needed, as with
 * other wasm-bindgen classes. Render methods return `Uint8Array` payloads:
 * PDF (`application/pdf`), EPUB (`application/epub+zip`), and site ZIP
 * (`application/zip`).
 */
export class FmdBook {
    static __wrap(ptr) {
        const obj = Object.create(FmdBook.prototype);
        obj.__wbg_ptr = ptr;
        FmdBookFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FmdBookFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fmdbook_free(ptr, 0);
    }
    /**
     * Number of chapters, in reading order.
     * @returns {number}
     */
    get chapterCount() {
        const ret = wasm.fmdbook_chapterCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Select the source dialect before include protection, URL rebasing and
     * parsing. This preserves CommonMark inline syntax spanning colon lines,
     * including literal code examples that contain include directives.
     *
     * # Errors
     * Rejects invalid profiles before source construction, and the same
     * source/expansion/diagnostic failures as `fromSources`.
     * @param {string[]} paths
     * @param {string[]} sources
     * @param {string[]} include_paths
     * @param {string[]} include_sources
     * @param {string | null} [authoring_profile]
     * @returns {FmdBook}
     */
    static fromSourcesProfiled(paths, sources, include_paths, include_sources, authoring_profile) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
            try {
                ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
                ptr2 = passArrayJsValueToWasm0(include_paths, wasm.__wbindgen_export);
                len2 = WASM_VECTOR_LEN;
                ptr3 = passArrayJsValueToWasm0(include_sources, wasm.__wbindgen_export);
                len3 = WASM_VECTOR_LEN;
                ptr4 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len4 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
                if (ptr3) { wasm.__wbindgen_export6(ptr3, len3); wasm.__wbindgen_export3(ptr3, len3 * 4, 4); }
                if (ptr2) { wasm.__wbindgen_export6(ptr2, len2); wasm.__wbindgen_export3(ptr2, len2 * 4, 4); }
                if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
                if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
                throw e;
            }
            wasm.fmdbook_fromSourcesProfiled(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeFromExternrefTable0(r1);
            }
            return FmdBook.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Expand includes from the selected chapters and optional include-only
     * resources, then retain one parsed book for every export format.
     * Resources never become chapters. The original constructor remains
     * parse-only so hosts can deliberately supply already expanded source.
     *
     * # Errors
     * Rejects mismatched arrays, invalid or duplicate paths, missing sources,
     * cycles, selectors, and whole-book source/expansion budgets.
     * @param {string[]} paths
     * @param {string[]} sources
     * @param {string[]} include_paths
     * @param {string[]} include_sources
     * @returns {FmdBook}
     */
    static fromSources(paths, sources, include_paths, include_sources) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
            try {
                ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
                ptr2 = passArrayJsValueToWasm0(include_paths, wasm.__wbindgen_export);
                len2 = WASM_VECTOR_LEN;
                ptr3 = passArrayJsValueToWasm0(include_sources, wasm.__wbindgen_export);
                len3 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr3) { wasm.__wbindgen_export6(ptr3, len3); wasm.__wbindgen_export3(ptr3, len3 * 4, 4); }
                if (ptr2) { wasm.__wbindgen_export6(ptr2, len2); wasm.__wbindgen_export3(ptr2, len2 * 4, 4); }
                if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
                if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
                throw e;
            }
            wasm.fmdbook_fromSources(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeFromExternrefTable0(r1);
            }
            return FmdBook.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Parse already-expanded chapters in the selected source dialect.
     * Include directives remain literal, as with the original constructor.
     *
     * # Errors
     * Rejects invalid profiles before parsing and the same inputs as `new`.
     * @param {string[]} paths
     * @param {string[]} sources
     * @param {string | null} [authoring_profile]
     * @returns {FmdBook}
     */
    static newWithProfile(paths, sources, authoring_profile) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            let ptr0, len0, ptr1, len1, ptr2, len2;
            try {
                ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
                ptr2 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len2 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
                if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
                if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
                throw e;
            }
            wasm.fmdbook_newWithProfile(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeFromExternrefTable0(r1);
            }
            return FmdBook.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Parse all chapters once, with bounded source bytes and validated paths.
     *
     * # Errors
     * Rejects mismatched arrays, empty books, invalid paths, collisions,
     * or the source limits enforced by the pure book renderer.
     * @param {string[]} paths
     * @param {string[]} sources
     */
    constructor(paths, sources) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
                if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
                throw e;
            }
            wasm.fmdbook_new(retptr, ptr0, len0, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeFromExternrefTable0(r1);
            }
            this.__wbg_ptr = r0;
            FmdBookFinalization.register(this, this.__wbg_ptr, this);
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Render one chapter and the complete navigation map, without rendering
     * or compressing a full site. Returns fmd-book-chapter-preview-v1 JSON.
     *
     * # Errors
     * Rejects lossy JavaScript indexes, invalid assets and preview budgets.
     * @param {number} selected
     * @returns {Uint8Array}
     */
    renderChapterPreview(selected) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdbook_renderChapterPreview(retptr, this.__wbg_ptr, selected);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            if (r3) {
                throw takeFromExternrefTable0(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export3(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Export a multi-chapter EPUB with ordered spine and packaged images.
     *
     * # Errors
     * Returns asset validation or EPUB rendering failures as JavaScript errors.
     * @returns {Uint8Array}
     */
    renderEpub() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdbook_renderEpub(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            if (r3) {
                throw takeFromExternrefTable0(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export3(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Emit the same archival book PDF with bounded rendering diagnostics from
     * its actual layout. Warnings do not claim independent PDF/A validation.
     * The returned FmdRenderResult is owned separately from this retained book.
     *
     * # Errors
     * Returns the same policy, geometry and writer failures as renderPdfArchival.
     * @param {string} profile
     * @param {boolean} strict
     * @param {Float64Array | number[]} page_geometry
     * @returns {FmdRenderResult}
     */
    renderPdfArchivalReported(profile, strict, page_geometry) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +strict;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 8, 8); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdbook_renderPdfArchivalReported(retptr, this.__wbg_ptr, ptr0, len0, val3, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeFromExternrefTable0(r1);
            }
            return FmdRenderResult.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Emit the retained book with an explicit PDF/A profile and optional paper
     * geometry (width, height, top, right, bottom, left, in points). Empty
     * geometry keeps the stored paper. Supported profiles are `off` and `2b`.
     * Strict mode requires `2b` and uses the existing writer's URI policy.
     *
     * Neither successful nor rejected exports change sources, fonts, images,
     * presentation settings or the source revision. This selects emission
     * settings; it does not independently certify PDF/A conformance.
     *
     * # Errors
     * Invalid profiles, strictness/profile combinations, paper geometry and
     * failures from the chapter-aware PDF/A writer are returned to the host.
     * @param {string} profile
     * @param {boolean} strict
     * @param {Float64Array | number[]} page_geometry
     * @returns {Uint8Array}
     */
    renderPdfArchival(profile, strict, page_geometry) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +strict;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 8, 8); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdbook_renderPdfArchival(retptr, this.__wbg_ptr, ptr0, len0, val3, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            if (r3) {
                throw takeFromExternrefTable0(r2);
            }
            var v4 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export3(r0, r1 * 1, 1);
            return v4;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Render a PDF plus bounded, coded fidelity diagnostics from that exact
     * emission. A clean audited render returns `[]`; unavailable chapter
     * source coordinates use `0..0`. Parser findings remain sourceDiagnostics.
     *
     * The caller owns the returned FmdRenderResult and must free it after
     * copying its bytes and diagnostics. Freeing it does not dispose the book.
     *
     * # Errors
     * Returns the same validation and writer failures as renderPdf.
     * @returns {FmdRenderResult}
     */
    renderPdfReported() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdbook_renderPdfReported(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeFromExternrefTable0(r1);
            }
            return FmdRenderResult.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Apply export-local paper geometry and return the PDF's actual fidelity
     * diagnostics. Empty geometry uses retained settings; the book's source,
     * presentation, grid, fonts and assets remain unchanged after this call.
     *
     * # Errors
     * Returns the same failures as renderPdfWithPage.
     * @param {Float64Array | number[]} page_geometry
     * @returns {FmdRenderResult}
     */
    renderPdfWithPageReported(page_geometry) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const ptr0 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            const len0 = WASM_VECTOR_LEN;
            wasm.fmdbook_renderPdfWithPageReported(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeFromExternrefTable0(r1);
            }
            return FmdRenderResult.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Render the retained book with export-local paper geometry in points:
     * width, height, top, right, bottom, left. An empty vector uses the stored
     * theme. No chapter is reparsed and no retained option or asset is changed,
     * including when validation or rendering fails. The ordinary book pipeline
     * still binds chapter links, isolates citations, and resolves image paths.
     *
     * # Errors
     * Rejects invalid geometry using the single-document browser policy, or
     * returns book, asset-budget, and PDF rendering errors.
     * @param {Float64Array | number[]} page_geometry
     * @returns {Uint8Array}
     */
    renderPdfWithPage(page_geometry) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const ptr0 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            const len0 = WASM_VECTOR_LEN;
            wasm.fmdbook_renderPdfWithPage(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            if (r3) {
                throw takeFromExternrefTable0(r2);
            }
            var v2 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export3(r0, r1 * 1, 1);
            return v2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Export a continuous PDF with isolated citations and chapter assets.
     *
     * # Errors
     * Returns asset validation or PDF rendering failures as JavaScript errors.
     * @returns {Uint8Array}
     */
    renderPdf() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdbook_renderPdf(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            if (r3) {
                throw takeFromExternrefTable0(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export3(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Export an HTML-site ZIP with navigation and chapter-addressed search.
     *
     * # Errors
     * Returns path, resource-budget, or HTML rendering failures.
     * @returns {Uint8Array}
     */
    renderSite() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdbook_renderSite(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            if (r3) {
                throw takeFromExternrefTable0(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export3(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Replace the complete ordered chapter/include capture at an expected
     * revision, preserving publishing settings, page defaults and all assets.
     * Empty include arrays remove the include-only capture; expansion mode
     * remains fixed. No host files or source text are rewritten. Changed sets
     * rebuild all chapter bindings; exact normalized no-ops retain the AST.
     * Returns bounded fmd-book-source-set-v1 JSON.
     *
     * # Errors
     * Invalid/stale revisions, mismatched arrays, source/path/output limits,
     * and invalid include graphs leave the previous usable book untouched.
     * @param {string[]} paths
     * @param {string[]} sources
     * @param {string[]} include_paths
     * @param {string[]} include_sources
     * @param {number} expected_revision
     * @returns {string}
     */
    replaceSources(paths, sources, include_paths, include_sources, expected_revision) {
        let deferred7_0;
        let deferred7_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val5 = +expected_revision;
            let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
            try {
                ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
                ptr2 = passArrayJsValueToWasm0(include_paths, wasm.__wbindgen_export);
                len2 = WASM_VECTOR_LEN;
                ptr3 = passArrayJsValueToWasm0(include_sources, wasm.__wbindgen_export);
                len3 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr3) { wasm.__wbindgen_export6(ptr3, len3); wasm.__wbindgen_export3(ptr3, len3 * 4, 4); }
                if (ptr2) { wasm.__wbindgen_export6(ptr2, len2); wasm.__wbindgen_export3(ptr2, len2 * 4, 4); }
                if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
                if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
                throw e;
            }
            wasm.fmdbook_replaceSources(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, val5);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr6 = r0;
            var len6 = r1;
            if (r3) {
                ptr6 = 0; len6 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred7_0 = ptr6;
            deferred7_1 = len6;
            return getStringFromWasm0(ptr6, len6);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred7_0, deferred7_1, 1);
        }
    }
    /**
     * Select the Markdown authoring dialect shared by every book export.
     * `undefined` restores the historical extension-enabled default. A changed
     * dialect reparses the retained source and diagnostics atomically; selecting
     * the same dialect reuses cached ASTs. Source revision and assets survive.
     *
     * # Errors
     * Invalid dialects or failed include/diagnostic admission leave the entire
     * previous usable source capture and renderer settings unchanged.
     * @param {string | null} [profile]
     */
    setAuthoringProfile(profile) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            var ptr0 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len0 = WASM_VECTOR_LEN;
            wasm.fmdbook_setAuthoringProfile(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Set the opt-in body baseline spacing in points. Zero disables it;
     * positive spacings must be finite values from 1 through 144 points.
     * Paper overrides preserve this setting, including archival exports.
     *
     * # Errors
     * Invalid or page-fitting-incompatible settings leave the retained book
     * unchanged. This additive method does not alter earlier setter arities.
     * @param {number} points
     */
    setBaselineGridPt(points) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdbook_setBaselineGridPt(retptr, this.__wbg_ptr, points);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Replace HTML/EPUB CSS. `undefined` restores the built-in stylesheet;
     * an empty string deliberately requests no stylesheet rules.
     * @param {string | null} [css]
     */
    setCustomCss(css) {
        var ptr0 = isLikeNone(css) ? 0 : passStringToWasm0(css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        var len0 = WASM_VECTOR_LEN;
        wasm.fmdbook_setCustomCss(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Select compact subsets or complete fonts for HTML and EPUB exports.
     * PDF font subsetting and the source revision remain unchanged.
     *
     * # Errors
     * Invalid policies leave the last valid policy unchanged.
     * @param {string} policy
     */
    setFontEmbedding(policy) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const ptr0 = passStringToWasm0(policy, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.fmdbook_setFontEmbedding(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Set a finite, positive uniform font scale (1.0 means no scaling).
     *
     * # Errors
     * Non-finite, zero, negative, or unrepresentable scales are rejected
     * without changing the current value.
     * @param {number} scale
     */
    setFontScale(scale) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdbook_setFontScale(retptr, this.__wbg_ptr, scale);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Pin a variable font's CSS weight in the range 1 through 1000.
     * Static fonts ignore the weight pin.
     *
     * # Errors
     * Unknown slots or out-of-range weights do not mutate the font settings.
     * @param {string} slot
     * @param {number} weight
     */
    setFontWeight(slot, weight) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val2 = +weight;
            const ptr0 = passStringToWasm0(slot, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.fmdbook_setFontWeight(retptr, this.__wbg_ptr, ptr0, len0, val2);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Supply a validated font for one shared PDF/HTML renderer slot. EPUB
     * font styling remains controlled by its stylesheet.
     *
     * # Errors
     * Unknown slots or unsupported font bytes leave the existing slot intact.
     * @param {string} slot
     * @param {Uint8Array | number[]} bytes
     */
    setFont(slot, bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(slot, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdbook_setFont(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Select the HTML site's embedded font container; EPUB still uses its
     * publication-local TrueType package. Does not change PDF or source state.
     *
     * # Errors
     * Unknown formats leave the last valid format unchanged.
     * @param {string} format
     */
    setHtmlFontFormat(format) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const ptr0 = passStringToWasm0(format, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.fmdbook_setHtmlFontFormat(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Add or replace one image keyed by its book-relative destination.
     * For `guide/start.md` containing `figure.svg`, supply
     * `guide/figure.svg`. Different chapters may use the same basename.
     *
     * # Errors
     * Rejects invalid keys and image budgets. No partial replacement occurs
     * when validation fails. The core does not fetch missing images.
     * @param {string} destination
     * @param {Uint8Array | number[]} bytes
     */
    setImage(destination, bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(destination, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdbook_setImage(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Set shared metadata. Absent or blank values restore renderer defaults.
     * Per-chapter frontmatter language overrides the book's language in HTML
     * and EPUB. Author metadata is used by the PDF path.
     * @param {string | null} [title]
     * @param {string | null} [author]
     * @param {string | null} [language]
     */
    setMetadata(title, author, language) {
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(language) ? 0 : passStringToWasm0(language, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.fmdbook_setMetadata(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
    }
    /**
     * Configure table-of-contents generation and PDF running page numbers.
     * EPUB's required navigation document is generated independently of this
     * optional in-content table of contents.
     * @param {boolean} table_of_contents
     * @param {boolean} page_numbers
     */
    setNavigation(table_of_contents, page_numbers) {
        wasm.fmdbook_setNavigation(this.__wbg_ptr, table_of_contents, page_numbers);
    }
    /**
     * Replace the PDF settings profile, including optional running logos, as
     * one transaction. Image keys refer to assets supplied with `setImage`.
     * The original `setPdfOptions` ABI still resets to text-only bands.
     *
     * # Errors
     * Invalid image references, position codes, heights or other settings leave
     * the entire retained profile unchanged. Payload decoding occurs at render.
     * @param {string | null | undefined} typography
     * @param {number | null | undefined} base_font_size
     * @param {number | null | undefined} heading_scale
     * @param {number | null | undefined} table_font_size
     * @param {number | null | undefined} toc_depth
     * @param {number | null | undefined} fit_to_pages
     * @param {boolean} code_line_numbers
     * @param {number | null | undefined} metadata_epoch_seconds
     * @param {string[]} running_slots
     * @param {boolean} header_rule
     * @param {boolean} footer_rule
     * @param {boolean} skip_first_page
     * @param {string[]} image_destinations
     * @param {Uint32Array | number[]} image_positions
     * @param {Uint32Array | number[]} image_heights
     */
    setPdfOptionsWithRunningImages(typography, base_font_size, heading_scale, table_font_size, toc_depth, fit_to_pages, code_line_numbers, metadata_epoch_seconds, running_slots, header_rule, footer_rule, skip_first_page, image_destinations, image_positions, image_heights) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val6 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
            const val7 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
            const val8 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
            const val9 = +(isLikeNone(toc_depth) ? 0 : toc_depth);
            const val10 = +(isLikeNone(fit_to_pages) ? 0 : fit_to_pages);
            const val11 = +code_line_numbers;
            const val12 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
            const val13 = +header_rule;
            const val14 = +footer_rule;
            const val15 = +skip_first_page;
            let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
            try {
                ptr0 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArrayJsValueToWasm0(running_slots, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
                ptr2 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
                len2 = WASM_VECTOR_LEN;
                ptr3 = passArray32ToWasm0(image_positions, wasm.__wbindgen_export);
                len3 = WASM_VECTOR_LEN;
                ptr4 = passArray32ToWasm0(image_heights, wasm.__wbindgen_export);
                len4 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 4, 4); }
                if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 4, 4); }
                if (ptr2) { wasm.__wbindgen_export6(ptr2, len2); wasm.__wbindgen_export3(ptr2, len2 * 4, 4); }
                if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdbook_setPdfOptionsWithRunningImages(retptr, this.__wbg_ptr, ptr0, len0, !isLikeNone(base_font_size), val6, !isLikeNone(heading_scale), val7, !isLikeNone(table_font_size), val8, !isLikeNone(toc_depth), val9, !isLikeNone(fit_to_pages), val10, val11, !isLikeNone(metadata_epoch_seconds), val12, ptr1, len1, val13, val14, val15, ptr2, len2, ptr3, len3, ptr4, len4);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Replace detailed PDF layout, typography, metadata epoch and running
     * bands as one transaction. Absent fields reset this profile to defaults;
     * title, author, theme, assets, source and navigation enablement survive.
     * Typography tokens use the single-document contract. Running templates
     * are header left/center/right followed by footer left/center/right.
     * Geometry and template validity that depends on it are checked at render.
     * The TOC depth also applies to subsequent HTML table-of-contents output.
     *
     * # Errors
     * Invalid tokens, sizes, integers or band sizes leave every setting intact.
     * @param {string | null | undefined} typography
     * @param {number | null | undefined} base_font_size
     * @param {number | null | undefined} heading_scale
     * @param {number | null | undefined} table_font_size
     * @param {number | null | undefined} toc_depth
     * @param {number | null | undefined} fit_to_pages
     * @param {boolean} code_line_numbers
     * @param {number | null | undefined} metadata_epoch_seconds
     * @param {string[]} running_slots
     * @param {boolean} header_rule
     * @param {boolean} footer_rule
     * @param {boolean} skip_first_page
     */
    setPdfOptions(typography, base_font_size, heading_scale, table_font_size, toc_depth, fit_to_pages, code_line_numbers, metadata_epoch_seconds, running_slots, header_rule, footer_rule, skip_first_page) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
            const val4 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
            const val5 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
            const val6 = +(isLikeNone(toc_depth) ? 0 : toc_depth);
            const val7 = +(isLikeNone(fit_to_pages) ? 0 : fit_to_pages);
            const val8 = +code_line_numbers;
            const val9 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
            const val10 = +header_rule;
            const val11 = +footer_rule;
            const val12 = +skip_first_page;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArrayJsValueToWasm0(running_slots, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdbook_setPdfOptions(retptr, this.__wbg_ptr, ptr0, len0, !isLikeNone(base_font_size), val3, !isLikeNone(heading_scale), val4, !isLikeNone(table_font_size), val5, !isLikeNone(toc_depth), val6, !isLikeNone(fit_to_pages), val7, val8, !isLikeNone(metadata_epoch_seconds), val9, ptr1, len1, val10, val11, val12);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Choose the shared font family and HTML dark-mode policy. `auto` follows
     * the browser's preferred color scheme; `light` or `disabled` emits only
     * the default light palette. EPUB uses its own or caller-supplied CSS.
     *
     * # Errors
     * Invalid names leave the previous theme unchanged.
     * @param {string} font
     * @param {string} dark_mode
     */
    setTheme(font, dark_mode) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdbook_setTheme(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Complete parser findings for the currently captured chapter revision,
     * without reparsing or rendering. Returns fmd-book-source-diagnostics-v1
     * JSON with explicit expanded_chapter UTF-8 coordinates. Original include
     * source offsets are not implied; assets and presentation do not affect it.
     * @returns {string}
     */
    sourceDiagnostics() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdbook_sourceDiagnostics(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Original Markdown size in UTF-8 bytes, excluding logical filenames.
     * Includes include-only resource bytes when constructed by `fromSources`.
     * @returns {number}
     */
    get sourceLength() {
        const ret = wasm.fmdbook_sourceLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Committed source revision, independent of presentation and asset edits.
     * @returns {number}
     */
    get sourceRevision() {
        const ret = wasm.fmdbook_sourceRevision(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Atomically replace selected chapter/include sources at an expected
     * revision, without recreating the renderer or reparsing unchanged chapters.
     * Source membership, reading order and expansion mode remain fixed.
     * Returns bounded fmd-book-source-update-v1 JSON; an unchanged batch keeps
     * its revision. Existing render settings and image/font assets survive.
     *
     * # Errors
     * Rejects invalid/stale revisions, mismatched arrays, unknown/duplicate
     * source keys, source/expansion limits and include failures. The last
     * successful source capture remains usable after every rejected update.
     * @param {string[]} paths
     * @param {string[]} sources
     * @param {number} expected_revision
     * @returns {string}
     */
    updateSources(paths, sources, expected_revision) {
        let deferred5_0;
        let deferred5_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +expected_revision;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
                if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
                throw e;
            }
            wasm.fmdbook_updateSources(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, val3);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr4 = r0;
            var len4 = r1;
            if (r3) {
                ptr4 = 0; len4 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred5_0 = ptr4;
            deferred5_1 = len4;
            return getStringFromWasm0(ptr4, len4);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred5_0, deferred5_1, 1);
        }
    }
    /**
     * Check local HTML navigation on the retained, expanded book. Returns
     * fmd-book-link-report-v1 JSON without rendering pages or inspecting assets.
     * External URLs and non-chapter downloads are counted, not verified.
     *
     * # Errors
     * Rejects invalid books or validation/report budget overruns.
     * @returns {string}
     */
    validateLinks() {
        let deferred2_0;
        let deferred2_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdbook_validateLinks(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr1 = r0;
            var len1 = r1;
            if (r3) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * Verify the retained book's actual assembled PDF publication. The JSON
     * contains positioned page text, chapter-scoped destinations, original
     * source ranges, findings and pagination provenance. It is bounded to
     * 8 MiB and is never truncated or replaced by a source-only link check.
     *
     * Profile, strictness and optional geometry have exactly the same meaning
     * as renderPdfArchival. All other settings, fonts and images come from
     * this book. Verification does not change its source revision or settings
     * and does not independently certify PDF/A or PDF/UA conformance.
     *
     * # Errors
     * Propagates publication admission, strict pagination and report limits.
     * @param {string} profile
     * @param {boolean} strict
     * @param {Float64Array | number[]} page_geometry
     * @returns {string}
     */
    verifyPdf(profile, strict, page_geometry) {
        let deferred5_0;
        let deferred5_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +strict;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 8, 8); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdbook_verifyPdf(retptr, this.__wbg_ptr, ptr0, len0, val3, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr4 = r0;
            var len4 = r1;
            if (r3) {
                ptr4 = 0; len4 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred5_0 = ptr4;
            deferred5_1 = len4;
            return getStringFromWasm0(ptr4, len4);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred5_0, deferred5_1, 1);
        }
    }
}
if (Symbol.dispose) FmdBook.prototype[Symbol.dispose] = FmdBook.prototype.free;

/**
 * Persistent browser editing and measured display output. The generated class
 * owns Rust allocations until free() (the public JS adapter calls dispose()).
 */
export class FmdFlowSession {
    static __wrap(ptr) {
        const obj = Object.create(FmdFlowSession.prototype);
        obj.__wbg_ptr = ptr;
        FmdFlowSessionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FmdFlowSessionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fmdflowsession_free(ptr, 0);
    }
    /**
     * @param {string} request_id
     * @param {string} revision
     * @returns {Uint8Array | undefined}
     */
    assetBytes(request_id, revision) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(request_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_assetBytes(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            if (r3) {
                throw takeFromExternrefTable0(r2);
            }
            let v3;
            if (r0 !== 0) {
                v3 = getArrayU8FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export3(r0, r1 * 1, 1);
            }
            return v3;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {string} revision
     * @param {string} layout_revision
     * @param {number} offset
     * @param {number} limit
     * @returns {string}
     */
    assetInventoryJson(revision, layout_revision, offset, limit) {
        let deferred6_0;
        let deferred6_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +offset;
            const val4 = +limit;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(layout_revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_assetInventoryJson(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, val3, val4);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr5 = r0;
            var len5 = r1;
            if (r3) {
                ptr5 = 0; len5 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred6_0 = ptr5;
            deferred6_1 = len5;
            return getStringFromWasm0(ptr5, len5);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred6_0, deferred6_1, 1);
        }
    }
    /**
     * @returns {boolean}
     */
    get codeHighlighting() {
        const ret = wasm.fmdflowsession_codeHighlighting(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {string} revision
     * @param {number} start
     * @param {number} end
     * @returns {string}
     */
    copySource(revision, start, end) {
        let deferred5_0;
        let deferred5_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val2 = +start;
            const val3 = +end;
            const ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.fmdflowsession_copySource(retptr, this.__wbg_ptr, ptr0, len0, val2, val3);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr4 = r0;
            var len4 = r1;
            if (r3) {
                ptr4 = 0; len4 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred5_0 = ptr4;
            deferred5_1 = len4;
            return getStringFromWasm0(ptr4, len4);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred5_0, deferred5_1, 1);
        }
    }
    /**
     * @param {string} revision
     * @param {number} start
     * @param {number} end
     * @param {string} replacement
     * @param {boolean} verified_asset_reuse
     */
    editBytes(revision, start, end, replacement, verified_asset_reuse) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +start;
            const val4 = +end;
            const val5 = +verified_asset_reuse;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(replacement, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_editBytes(retptr, this.__wbg_ptr, ptr0, len0, val3, val4, ptr1, len1, val5);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * One atomic editor transaction in original UTF-16 coordinates.
     * @param {string} revision
     * @param {Uint32Array | number[]} ranges
     * @param {Uint32Array | number[]} lengths
     * @param {string} replacements
     * @param {boolean} verified_asset_reuse
     */
    editManyUtf16Packed(revision, ranges, lengths, replacements, verified_asset_reuse) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val5 = +verified_asset_reuse;
            let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
            try {
                ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArray32ToWasm0(ranges, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
                ptr2 = passArray32ToWasm0(lengths, wasm.__wbindgen_export);
                len2 = WASM_VECTOR_LEN;
                ptr3 = passStringToWasm0(replacements, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len3 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
                if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 4, 4); }
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_editManyUtf16Packed(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, val5);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {string} revision
     * @param {number} start
     * @param {number} end
     * @param {string} replacement
     * @param {boolean} verified_asset_reuse
     */
    editUtf16(revision, start, end, replacement, verified_asset_reuse) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +start;
            const val4 = +end;
            const val5 = +verified_asset_reuse;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(replacement, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_editUtf16(retptr, this.__wbg_ptr, ptr0, len0, val3, val4, ptr1, len1, val5);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {string} font_id
     * @returns {Uint8Array}
     */
    fontBytes(font_id) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const ptr0 = passStringToWasm0(font_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.fmdflowsession_fontBytes(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            if (r3) {
                throw takeFromExternrefTable0(r2);
            }
            var v2 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export3(r0, r1 * 1, 1);
            return v2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Batch paths from the same immutable font identities as the display list.
     * @param {string} font_id
     * @param {Uint16Array | number[]} glyph_ids
     * @returns {string}
     */
    glyphOutlinesJson(font_id, glyph_ids) {
        let deferred4_0;
        let deferred4_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(font_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArray16ToWasm0(glyph_ids, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 2, 2); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_glyphOutlinesJson(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr3 = r0;
            var len3 = r1;
            if (r3) {
                ptr3 = 0; len3 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred4_0 = ptr3;
            deferred4_1 = len3;
            return getStringFromWasm0(ptr3, len3);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred4_0, deferred4_1, 1);
        }
    }
    /**
     * @param {string} revision
     * @param {string} layout_revision
     * @param {number} x
     * @param {number} y
     * @returns {string}
     */
    hitTestJson(revision, layout_revision, x, y) {
        let deferred6_0;
        let deferred6_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +x;
            const val4 = +y;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(layout_revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_hitTestJson(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, val3, val4);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr5 = r0;
            var len5 = r1;
            if (r3) {
                ptr5 = 0; len5 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred6_0 = ptr5;
            deferred6_1 = len5;
            return getStringFromWasm0(ptr5, len5);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred6_0, deferred6_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get layoutRevision() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdflowsession_layoutRevision(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} source
     * @param {string} font
     * @param {number} width
     * @param {number} body
     * @param {number} code
     * @param {number} leading
     */
    constructor(source, font, width, body, code, leading) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +width;
            const val4 = +body;
            const val5 = +code;
            const val6 = +leading;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(source, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_new(retptr, ptr0, len0, ptr1, len1, val3, val4, val5, val6);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeFromExternrefTable0(r1);
            }
            this.__wbg_ptr = r0;
            FmdFlowSessionFinalization.register(this, this.__wbg_ptr, this);
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {string} revision
     * @param {number} offset
     * @param {number} limit
     * @returns {string}
     */
    pendingAssetsJson(revision, offset, limit) {
        let deferred5_0;
        let deferred5_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val2 = +offset;
            const val3 = +limit;
            const ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.fmdflowsession_pendingAssetsJson(retptr, this.__wbg_ptr, ptr0, len0, val2, val3);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr4 = r0;
            var len4 = r1;
            if (r3) {
                ptr4 = 0; len4 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred5_0 = ptr4;
            deferred5_1 = len4;
            return getStringFromWasm0(ptr4, len4);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred5_0, deferred5_1, 1);
        }
    }
    /**
     * @returns {string | undefined}
     */
    get profile() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdflowsession_profile(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1);
                wasm.__wbindgen_export3(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {string} request_id
     * @param {string} generation
     * @param {number} width
     * @param {number} height
     * @param {Uint8Array | number[] | null} [bytes]
     */
    provideAsset(request_id, generation, width, height, bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val4 = +width;
            const val5 = +height;
            let ptr0, len0, ptr1, len1, ptr2, len2;
            try {
                ptr0 = passStringToWasm0(request_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(generation, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
                ptr2 = isLikeNone(bytes) ? 0 : passArray8ToWasm0(bytes, wasm.__wbindgen_export);
                len2 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_provideAsset(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, val4, val5, ptr2, len2);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * One data-only batch, one native parse/reflow, no partial publication.
     * @param {string} metadata
     * @param {Uint8Array | number[]} payload
     */
    provideAssetsPacked(metadata, payload) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(metadata, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArray8ToWasm0(payload, wasm.__wbindgen_export);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_provideAssetsPacked(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {string} revision
     * @param {string} layout_revision
     * @param {number} offset
     * @param {number} limit
     * @returns {string}
     */
    readingJson(revision, layout_revision, offset, limit) {
        let deferred6_0;
        let deferred6_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +offset;
            const val4 = +limit;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(layout_revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_readingJson(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, val3, val4);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr5 = r0;
            var len5 = r1;
            if (r3) {
                ptr5 = 0; len5 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred6_0 = ptr5;
            deferred6_1 = len5;
            return getStringFromWasm0(ptr5, len5);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred6_0, deferred6_1, 1);
        }
    }
    /**
     * @param {string} revision
     * @param {string} layout_revision
     * @param {number} width
     * @param {number} body
     * @param {number} code
     * @param {number} leading
     */
    reflow(revision, layout_revision, width, body, code, leading) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +width;
            const val4 = +body;
            const val5 = +code;
            const val6 = +leading;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(layout_revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_reflow(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, val3, val4, val5, val6);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {string} revision
     */
    reloadAssets(revision) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.fmdflowsession_reloadAssets(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {string} revision
     * @param {string} source
     * @param {boolean} verified_asset_reuse
     */
    replaceSource(revision, source, verified_asset_reuse) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +verified_asset_reuse;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(source, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_replaceSource(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, val3);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {string}
     */
    get revision() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdflowsession_revision(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} revision
     * @param {string} layout_revision
     * @param {number} index
     * @param {number} start
     * @param {number} end
     * @returns {string}
     */
    selectItemJson(revision, layout_revision, index, start, end) {
        let deferred7_0;
        let deferred7_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +index;
            const val4 = +start;
            const val5 = +end;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(layout_revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_selectItemJson(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, val3, val4, val5);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr6 = r0;
            var len6 = r1;
            if (r3) {
                ptr6 = 0; len6 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred7_0 = ptr6;
            deferred7_1 = len6;
            return getStringFromWasm0(ptr6, len6);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred7_0, deferred7_1, 1);
        }
    }
    /**
     * @param {string} revision
     * @param {string} layout_revision
     * @param {boolean} enabled
     */
    setCodeHighlighting(revision, layout_revision, enabled) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +enabled;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(layout_revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_setCodeHighlighting(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, val3);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeFromExternrefTable0(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {string} revision
     * @param {string} layout_revision
     * @param {number} offset
     * @param {number} limit
     * @param {boolean} glyphs
     * @returns {string}
     */
    snapshotJson(revision, layout_revision, offset, limit, glyphs) {
        let deferred7_0;
        let deferred7_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +offset;
            const val4 = +limit;
            const val5 = +glyphs;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(layout_revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_snapshotJson(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, val3, val4, val5);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr6 = r0;
            var len6 = r1;
            if (r3) {
                ptr6 = 0; len6 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred7_0 = ptr6;
            deferred7_1 = len6;
            return getStringFromWasm0(ptr6, len6);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred7_0, deferred7_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get source() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdflowsession_source(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Bounded indexed query; the original snapshot API remains available.
     * @param {string} revision
     * @param {string} layout_revision
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} after
     * @param {number} limit
     * @param {boolean} glyphs
     * @returns {string}
     */
    viewportJson(revision, layout_revision, x, y, width, height, after, limit, glyphs) {
        let deferred11_0;
        let deferred11_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val3 = +x;
            const val4 = +y;
            const val5 = +width;
            const val6 = +height;
            const val7 = +after;
            const val8 = +limit;
            const val9 = +glyphs;
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(layout_revision, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_viewportJson(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, val3, val4, val5, val6, val7, val8, val9);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            var ptr10 = r0;
            var len10 = r1;
            if (r3) {
                ptr10 = 0; len10 = 0;
                throw takeFromExternrefTable0(r2);
            }
            deferred11_0 = ptr10;
            deferred11_1 = len10;
            return getStringFromWasm0(ptr10, len10);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred11_0, deferred11_1, 1);
        }
    }
    /**
     * Additive constructor with an explicit, canonical authoring profile.
     * @param {string} source
     * @param {string} font
     * @param {number} width
     * @param {number} body
     * @param {number} code
     * @param {number} leading
     * @param {string} profile
     * @returns {FmdFlowSession}
     */
    static withProfile(source, font, width, body, code, leading, profile) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val4 = +width;
            const val5 = +body;
            const val6 = +code;
            const val7 = +leading;
            let ptr0, len0, ptr1, len1, ptr2, len2;
            try {
                ptr0 = passStringToWasm0(source, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len1 = WASM_VECTOR_LEN;
                ptr2 = passStringToWasm0(profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
                len2 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
                if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
                throw e;
            }
            wasm.fmdflowsession_withProfile(retptr, ptr0, len0, ptr1, len1, val4, val5, val6, val7, ptr2, len2);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeFromExternrefTable0(r1);
            }
            return FmdFlowSession.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
if (Symbol.dispose) FmdFlowSession.prototype[Symbol.dispose] = FmdFlowSession.prototype.free;

/**
 * Render output object exposed to JavaScript.
 */
export class FmdRenderResult {
    static __wrap(ptr) {
        const obj = Object.create(FmdRenderResult.prototype);
        obj.__wbg_ptr = ptr;
        FmdRenderResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FmdRenderResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fmdrenderresult_free(ptr, 0);
    }
    /**
     * Rendered output bytes. HTML is UTF-8; PDF is binary.
     * @returns {Uint8Array}
     */
    get bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdrenderresult_bytes(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export3(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Recoverable parser and rendering diagnostics as stable JSON.
     * @returns {string}
     */
    diagnosticsJson() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdrenderresult_diagnosticsJson(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Default file extension without a leading dot.
     * @returns {string}
     */
    get extension() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdrenderresult_extension(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Stable output format (`html`, `pdf`, `svg`, `epub`, `zip`, or `diff-html`).
     * @returns {string}
     */
    get format() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdrenderresult_format(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Browser MIME type for Blob construction.
     * @returns {string}
     */
    get mimeType() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.fmdrenderresult_mimeType(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Source size in bytes.
     * @returns {number}
     */
    get sourceLength() {
        const ret = wasm.fmdrenderresult_sourceLength(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) FmdRenderResult.prototype[Symbol.dispose] = FmdRenderResult.prototype.free;

/**
 * Run the exact PDF verification pipeline and keep only authoring-time
 * accessibility findings.
 * @param {string} markdown
 * @returns {string}
 */
export function accessibilityAudit(markdown) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.accessibilityAudit(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
        var ptr2 = r0;
        var len2 = r1;
        if (r3) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(r2);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export3(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Run the authoring accessibility audit using the requested source dialect.
 * PDF layout keeps the existing audit defaults; only the Markdown authoring
 * profile changes. This is not a verification of a workspace's configured
 * assets, typography, archival settings or final exported PDF.
 *
 * # Errors
 * Rejects an unknown authoring profile before parsing, or a document that the
 * existing PDF verification pipeline cannot materialize.
 * @param {string} markdown
 * @param {string | null} [authoring_profile]
 * @returns {string}
 */
export function accessibilityAuditProfiled(markdown, authoring_profile) {
    let deferred4_0;
    let deferred4_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.accessibilityAuditProfiled(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
        var ptr3 = r0;
        var len3 = r1;
        if (r3) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(r2);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export3(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Dependency-free capability contract as JSON.
 * @returns {string}
 */
export function capabilities() {
    let deferred1_0;
    let deferred1_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        wasm.capabilities(retptr);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred1_0 = r0;
        deferred1_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export3(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Compute the engine's document intelligence, readability, outline, and
 * structural-lint report without rendering a second time in the host.
 * @param {string} markdown
 * @returns {string}
 */
export function documentStats(markdown) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.documentStats(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export3(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Compute document intelligence using the requested source dialect.
 * An omitted profile preserves the exact legacy report. Explicit profiles
 * select the grammar before parsing and apply the same authoring transform
 * as publication, so definition-list delimiters and page-break comments have
 * their selected meanings before the document is counted.
 *
 * # Errors
 * Rejects an unknown authoring profile before parsing the source.
 * @param {string} markdown
 * @param {string | null} [authoring_profile]
 * @returns {string}
 */
export function documentStatsProfiled(markdown, authoring_profile) {
    let deferred4_0;
    let deferred4_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.documentStatsProfiled(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
        var ptr3 = r0;
        var len3 = r1;
        if (r3) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(r2);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export3(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Extract an owned standalone SFNT face. Omitted `face_index` selects zero.
 * Receive a floating-point number so fractional, negative and wrapped indices
 * cannot silently select a different face through wasm-bindgen's `u32` cast.
 *
 * # Errors
 * Refuses invalid indices, malformed tables, unsupported face formats and
 * input/output limits using the native extractor's stable error categories.
 * @param {Uint8Array | number[]} bytes
 * @param {number | null} [face_index]
 * @returns {Uint8Array}
 */
export function extractFontCollectionFace(bytes, face_index) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val2 = +(isLikeNone(face_index) ? 0 : face_index);
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        wasm.extractFontCollectionFace(retptr, ptr0, len0, !isLikeNone(face_index), val2);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
        if (r3) {
            throw takeFromExternrefTable0(r2);
        }
        var v3 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_export3(r0, r1 * 1, 1);
        return v3;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Count TTC/OTC faces after validating the complete collection header.
 * No font discovery, filesystem access or rendering is performed.
 *
 * # Errors
 * Refuses standalone fonts, malformed/unsupported headers and input limits.
 * @param {Uint8Array | number[]} bytes
 * @returns {number}
 */
export function fontCollectionFaceCount(bytes) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        wasm.fontCollectionFaceCount(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return r0 >>> 0;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Prepare one complete source-only rename transaction. The host retains the
 * source checkpoint and applies this response atomically; no file or retained
 * render handle is changed by this operation.
 *
 * # Errors
 * Invalid profiles/arrays, path collisions, source limits, include failures or
 * unproven destination ownership return an error without a partial capture.
 * @param {string[]} paths
 * @param {string[]} sources
 * @param {string[]} include_paths
 * @param {string[]} include_sources
 * @param {string} old_path
 * @param {string} new_path
 * @param {string | null | undefined} profile
 * @param {string[]} image_destinations
 * @returns {string}
 */
export function renameBookSource(paths, sources, include_paths, include_sources, old_path, new_path, profile, image_destinations) {
    let deferred10_0;
    let deferred10_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7;
        try {
            ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passArrayJsValueToWasm0(include_paths, wasm.__wbindgen_export);
            len2 = WASM_VECTOR_LEN;
            ptr3 = passArrayJsValueToWasm0(include_sources, wasm.__wbindgen_export);
            len3 = WASM_VECTOR_LEN;
            ptr4 = passStringToWasm0(old_path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passStringToWasm0(new_path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr7) { wasm.__wbindgen_export6(ptr7, len7); wasm.__wbindgen_export3(ptr7, len7 * 4, 4); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export6(ptr3, len3); wasm.__wbindgen_export3(ptr3, len3 * 4, 4); }
            if (ptr2) { wasm.__wbindgen_export6(ptr2, len2); wasm.__wbindgen_export3(ptr2, len2 * 4, 4); }
            if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
            throw e;
        }
        wasm.renameBookSource(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
        var ptr9 = r0;
        var len9 = r1;
        if (r3) {
            ptr9 = 0; len9 = 0;
            throw takeFromExternrefTable0(r2);
        }
        deferred10_0 = ptr9;
        deferred10_1 = len9;
        return getStringFromWasm0(ptr9, len9);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export3(deferred10_0, deferred10_1, 1);
    }
}

/**
 * Compile in-memory Markdown files into one continuous, bookmarked PDF book.
 * @param {string[]} paths
 * @param {string[]} sources
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {number | null | undefined} font_scale
 * @param {boolean} page_numbers
 * @returns {FmdRenderResult}
 */
export function renderBookPdf(paths, sources, title, author, font, dark_mode, font_scale, page_numbers) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val7 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val8 = +page_numbers;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5;
        try {
            ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
            throw e;
        }
        wasm.renderBookPdf(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, !isLikeNone(font_scale), val7, val8);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render a book with explicit typography, optimal pagination and running bands.
 *
 * The first 29 arguments match `renderBookPdfConfiguredPage`. Running slots,
 * rules and images use the single-document ABI contract; `typography` is the
 * same comma-separated native token list. Chapter-relative links, citations,
 * image resolution and includes still use the ordinary book renderer.
 *
 * # Errors
 * Rejects malformed presentation settings before source parsing or per-asset
 * copies, then propagates source, asset, geometry and native rendering errors.
 * @param {string[]} paths
 * @param {string[]} sources
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {Float64Array | number[]} page_geometry
 * @param {string[]} running_slots
 * @param {boolean} header_rule
 * @param {boolean} footer_rule
 * @param {boolean} skip_first_page
 * @param {string[]} running_image_destinations
 * @param {Uint32Array | number[]} running_image_positions
 * @param {Uint32Array | number[]} running_image_heights
 * @param {string | null} [typography]
 * @returns {FmdRenderResult}
 */
export function renderBookPdfConfiguredAdvanced(paths, sources, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, page_geometry, running_slots, header_rule, footer_rule, skip_first_page, running_image_destinations, running_image_positions, running_image_heights, typography) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val23 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val24 = +allow_raw_html;
        const val25 = +code_line_numbers;
        const val26 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val27 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val28 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val29 = +page_numbers;
        const val30 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val31 = +toc;
        const val32 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val33 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val34 = +microtype_protrusion;
        const val35 = +header_rule;
        const val36 = +footer_rule;
        const val37 = +skip_first_page;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21;
        try {
            ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
            ptr17 = passArrayJsValueToWasm0(running_slots, wasm.__wbindgen_export);
            len17 = WASM_VECTOR_LEN;
            ptr18 = passArrayJsValueToWasm0(running_image_destinations, wasm.__wbindgen_export);
            len18 = WASM_VECTOR_LEN;
            ptr19 = passArray32ToWasm0(running_image_positions, wasm.__wbindgen_export);
            len19 = WASM_VECTOR_LEN;
            ptr20 = passArray32ToWasm0(running_image_heights, wasm.__wbindgen_export);
            len20 = WASM_VECTOR_LEN;
            ptr21 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len21 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr21) { wasm.__wbindgen_export3(ptr21, len21 * 1, 1); }
            if (ptr20) { wasm.__wbindgen_export3(ptr20, len20 * 4, 4); }
            if (ptr19) { wasm.__wbindgen_export3(ptr19, len19 * 4, 4); }
            if (ptr18) { wasm.__wbindgen_export6(ptr18, len18); wasm.__wbindgen_export3(ptr18, len18 * 4, 4); }
            if (ptr17) { wasm.__wbindgen_export6(ptr17, len17); wasm.__wbindgen_export3(ptr17, len17 * 4, 4); }
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 8, 8); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 4, 4); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 1, 1); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 4, 4); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export6(ptr6, len6); wasm.__wbindgen_export3(ptr6, len6 * 4, 4); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
            throw e;
        }
        wasm.renderBookPdfConfiguredAdvanced(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, !isLikeNone(metadata_epoch_seconds), val23, val24, val25, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, !isLikeNone(base_font_size), val26, !isLikeNone(heading_scale), val27, !isLikeNone(table_font_size), val28, val29, !isLikeNone(font_scale), val30, ptr15, len15, val31, val32, val33, val34, ptr16, len16, ptr17, len17, val35, val36, val37, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render a book with all advanced PDF options and a final body-grid spacing.
 * The first 37 arguments match `renderBookPdfConfiguredAdvanced`; the legacy
 * export's arity and default byte output are unchanged.
 *
 * # Errors
 * Rejects invalid or fitting-incompatible grids before source normalization
 * and per-asset copying, then preserves the native render error.
 * @param {string[]} paths
 * @param {string[]} sources
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {Float64Array | number[]} page_geometry
 * @param {string[]} running_slots
 * @param {boolean} header_rule
 * @param {boolean} footer_rule
 * @param {boolean} skip_first_page
 * @param {string[]} running_image_destinations
 * @param {Uint32Array | number[]} running_image_positions
 * @param {Uint32Array | number[]} running_image_heights
 * @param {string | null | undefined} typography
 * @param {number} baseline_grid_pt
 * @returns {FmdRenderResult}
 */
export function renderBookPdfConfiguredGrid(paths, sources, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, page_geometry, running_slots, header_rule, footer_rule, skip_first_page, running_image_destinations, running_image_positions, running_image_heights, typography, baseline_grid_pt) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val23 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val24 = +allow_raw_html;
        const val25 = +code_line_numbers;
        const val26 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val27 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val28 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val29 = +page_numbers;
        const val30 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val31 = +toc;
        const val32 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val33 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val34 = +microtype_protrusion;
        const val35 = +header_rule;
        const val36 = +footer_rule;
        const val37 = +skip_first_page;
        const val38 = +baseline_grid_pt;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21;
        try {
            ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
            ptr17 = passArrayJsValueToWasm0(running_slots, wasm.__wbindgen_export);
            len17 = WASM_VECTOR_LEN;
            ptr18 = passArrayJsValueToWasm0(running_image_destinations, wasm.__wbindgen_export);
            len18 = WASM_VECTOR_LEN;
            ptr19 = passArray32ToWasm0(running_image_positions, wasm.__wbindgen_export);
            len19 = WASM_VECTOR_LEN;
            ptr20 = passArray32ToWasm0(running_image_heights, wasm.__wbindgen_export);
            len20 = WASM_VECTOR_LEN;
            ptr21 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len21 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr21) { wasm.__wbindgen_export3(ptr21, len21 * 1, 1); }
            if (ptr20) { wasm.__wbindgen_export3(ptr20, len20 * 4, 4); }
            if (ptr19) { wasm.__wbindgen_export3(ptr19, len19 * 4, 4); }
            if (ptr18) { wasm.__wbindgen_export6(ptr18, len18); wasm.__wbindgen_export3(ptr18, len18 * 4, 4); }
            if (ptr17) { wasm.__wbindgen_export6(ptr17, len17); wasm.__wbindgen_export3(ptr17, len17 * 4, 4); }
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 8, 8); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 4, 4); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 1, 1); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 4, 4); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export6(ptr6, len6); wasm.__wbindgen_export3(ptr6, len6 * 4, 4); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
            throw e;
        }
        wasm.renderBookPdfConfiguredGrid(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, !isLikeNone(metadata_epoch_seconds), val23, val24, val25, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, !isLikeNone(base_font_size), val26, !isLikeNone(heading_scale), val27, !isLikeNone(table_font_size), val28, val29, !isLikeNone(font_scale), val30, ptr15, len15, val31, val32, val33, val34, ptr16, len16, ptr17, len17, val35, val36, val37, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21, val38);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Compile selected chapters with the complete PDF configuration contract.
 * Unlike the narrow legacy book ABI, this route retains host images and fonts,
 * typography, metadata, navigation and optional paper geometry. Includes use
 * the bounded source-bundle resolver, and chapter links/citations are bound by
 * the ordinary native book renderer. No source is fetched from the host.
 *
 * # Errors
 * Rejects source/asset budgets, invalid options, include resolution errors,
 * and book or PDF rendering failures.
 * @param {string[]} paths
 * @param {string[]} sources
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {Float64Array | number[]} page_geometry
 * @returns {FmdRenderResult}
 */
export function renderBookPdfConfiguredPage(paths, sources, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, page_geometry) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val18 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val19 = +allow_raw_html;
        const val20 = +code_line_numbers;
        const val21 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val22 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val23 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val24 = +page_numbers;
        const val25 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val26 = +toc;
        const val27 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val28 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val29 = +microtype_protrusion;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16;
        try {
            ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 8, 8); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 4, 4); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 1, 1); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 4, 4); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export6(ptr6, len6); wasm.__wbindgen_export3(ptr6, len6 * 4, 4); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
            throw e;
        }
        wasm.renderBookPdfConfiguredPage(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, !isLikeNone(metadata_epoch_seconds), val18, val19, val20, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, !isLikeNone(base_font_size), val21, !isLikeNone(heading_scale), val22, !isLikeNone(table_font_size), val23, val24, !isLikeNone(font_scale), val25, ptr15, len15, val26, val27, val28, val29, ptr16, len16);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render a book with the complete PDF contract and an explicit authoring dialect.
 * Omitting the dialect preserves the historical extension-enabled default.
 *
 * # Errors
 * Rejects unknown dialects before source parsing or per-asset copying.
 * @param {string[]} paths
 * @param {string[]} sources
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {Float64Array | number[]} page_geometry
 * @param {string[]} running_slots
 * @param {boolean} header_rule
 * @param {boolean} footer_rule
 * @param {boolean} skip_first_page
 * @param {string[]} running_image_destinations
 * @param {Uint32Array | number[]} running_image_positions
 * @param {Uint32Array | number[]} running_image_heights
 * @param {string | null | undefined} typography
 * @param {number} baseline_grid_pt
 * @param {string | null} [authoring_profile]
 * @returns {FmdRenderResult}
 */
export function renderBookPdfConfiguredProfiled(paths, sources, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, page_geometry, running_slots, header_rule, footer_rule, skip_first_page, running_image_destinations, running_image_positions, running_image_heights, typography, baseline_grid_pt, authoring_profile) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val24 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val25 = +allow_raw_html;
        const val26 = +code_line_numbers;
        const val27 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val28 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val29 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val30 = +page_numbers;
        const val31 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val32 = +toc;
        const val33 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val34 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val35 = +microtype_protrusion;
        const val36 = +header_rule;
        const val37 = +footer_rule;
        const val38 = +skip_first_page;
        const val39 = +baseline_grid_pt;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21, ptr22, len22;
        try {
            ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
            ptr17 = passArrayJsValueToWasm0(running_slots, wasm.__wbindgen_export);
            len17 = WASM_VECTOR_LEN;
            ptr18 = passArrayJsValueToWasm0(running_image_destinations, wasm.__wbindgen_export);
            len18 = WASM_VECTOR_LEN;
            ptr19 = passArray32ToWasm0(running_image_positions, wasm.__wbindgen_export);
            len19 = WASM_VECTOR_LEN;
            ptr20 = passArray32ToWasm0(running_image_heights, wasm.__wbindgen_export);
            len20 = WASM_VECTOR_LEN;
            ptr21 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len21 = WASM_VECTOR_LEN;
            ptr22 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len22 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr22) { wasm.__wbindgen_export3(ptr22, len22 * 1, 1); }
            if (ptr21) { wasm.__wbindgen_export3(ptr21, len21 * 1, 1); }
            if (ptr20) { wasm.__wbindgen_export3(ptr20, len20 * 4, 4); }
            if (ptr19) { wasm.__wbindgen_export3(ptr19, len19 * 4, 4); }
            if (ptr18) { wasm.__wbindgen_export6(ptr18, len18); wasm.__wbindgen_export3(ptr18, len18 * 4, 4); }
            if (ptr17) { wasm.__wbindgen_export6(ptr17, len17); wasm.__wbindgen_export3(ptr17, len17 * 4, 4); }
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 8, 8); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 4, 4); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 1, 1); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 4, 4); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export6(ptr6, len6); wasm.__wbindgen_export3(ptr6, len6 * 4, 4); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
            throw e;
        }
        wasm.renderBookPdfConfiguredProfiled(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, !isLikeNone(metadata_epoch_seconds), val24, val25, val26, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, !isLikeNone(base_font_size), val27, !isLikeNone(heading_scale), val28, !isLikeNone(table_font_size), val29, val30, !isLikeNone(font_scale), val31, ptr15, len15, val32, val33, val34, val35, ptr16, len16, ptr17, len17, val36, val37, val38, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21, val39, ptr22, len22);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render a book from explicit chapters and optional include-only sources.
 *
 * The first 39 arguments match `renderBookPdfConfiguredProfiled`; the final
 * vectors supply relative paths and UTF-8 text for transclusion only. Source
 * order and roles are retained. `expand_includes = false` treats directives
 * literally and requires empty include vectors. Source dialect selection
 * precedes both include protection and parsing.
 *
 * The whole capture shares the existing 4096-source / 64 MiB input budget,
 * and the native source-bundle engine owns expansion, rebasing, cycle, depth,
 * resolver-copy and expanded-output limits. Output and diagnostics come from
 * the same chapter-aware PDF emission as the retained book API.
 *
 * # Errors
 * Rejects mismatched source arrays, invalid source roles, budgets, profiles,
 * paths, includes, assets, typography, and rendering errors. No host file or
 * network resource is opened.
 * @param {string[]} paths
 * @param {string[]} sources
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {Float64Array | number[]} page_geometry
 * @param {string[]} running_slots
 * @param {boolean} header_rule
 * @param {boolean} footer_rule
 * @param {boolean} skip_first_page
 * @param {string[]} running_image_destinations
 * @param {Uint32Array | number[]} running_image_positions
 * @param {Uint32Array | number[]} running_image_heights
 * @param {string | null | undefined} typography
 * @param {number} baseline_grid_pt
 * @param {string | null | undefined} authoring_profile
 * @param {string[]} include_paths
 * @param {string[]} include_sources
 * @param {boolean} expand_includes
 * @returns {FmdRenderResult}
 */
export function renderBookPdfConfiguredSources(paths, sources, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, page_geometry, running_slots, header_rule, footer_rule, skip_first_page, running_image_destinations, running_image_positions, running_image_heights, typography, baseline_grid_pt, authoring_profile, include_paths, include_sources, expand_includes) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val26 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val27 = +allow_raw_html;
        const val28 = +code_line_numbers;
        const val29 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val30 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val31 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val32 = +page_numbers;
        const val33 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val34 = +toc;
        const val35 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val36 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val37 = +microtype_protrusion;
        const val38 = +header_rule;
        const val39 = +footer_rule;
        const val40 = +skip_first_page;
        const val41 = +baseline_grid_pt;
        const val42 = +expand_includes;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21, ptr22, len22, ptr23, len23, ptr24, len24;
        try {
            ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
            ptr17 = passArrayJsValueToWasm0(running_slots, wasm.__wbindgen_export);
            len17 = WASM_VECTOR_LEN;
            ptr18 = passArrayJsValueToWasm0(running_image_destinations, wasm.__wbindgen_export);
            len18 = WASM_VECTOR_LEN;
            ptr19 = passArray32ToWasm0(running_image_positions, wasm.__wbindgen_export);
            len19 = WASM_VECTOR_LEN;
            ptr20 = passArray32ToWasm0(running_image_heights, wasm.__wbindgen_export);
            len20 = WASM_VECTOR_LEN;
            ptr21 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len21 = WASM_VECTOR_LEN;
            ptr22 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len22 = WASM_VECTOR_LEN;
            ptr23 = passArrayJsValueToWasm0(include_paths, wasm.__wbindgen_export);
            len23 = WASM_VECTOR_LEN;
            ptr24 = passArrayJsValueToWasm0(include_sources, wasm.__wbindgen_export);
            len24 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr24) { wasm.__wbindgen_export6(ptr24, len24); wasm.__wbindgen_export3(ptr24, len24 * 4, 4); }
            if (ptr23) { wasm.__wbindgen_export6(ptr23, len23); wasm.__wbindgen_export3(ptr23, len23 * 4, 4); }
            if (ptr22) { wasm.__wbindgen_export3(ptr22, len22 * 1, 1); }
            if (ptr21) { wasm.__wbindgen_export3(ptr21, len21 * 1, 1); }
            if (ptr20) { wasm.__wbindgen_export3(ptr20, len20 * 4, 4); }
            if (ptr19) { wasm.__wbindgen_export3(ptr19, len19 * 4, 4); }
            if (ptr18) { wasm.__wbindgen_export6(ptr18, len18); wasm.__wbindgen_export3(ptr18, len18 * 4, 4); }
            if (ptr17) { wasm.__wbindgen_export6(ptr17, len17); wasm.__wbindgen_export3(ptr17, len17 * 4, 4); }
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 8, 8); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 4, 4); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 1, 1); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 4, 4); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export6(ptr6, len6); wasm.__wbindgen_export3(ptr6, len6 * 4, 4); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
            throw e;
        }
        wasm.renderBookPdfConfiguredSources(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, !isLikeNone(metadata_epoch_seconds), val26, val27, val28, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, !isLikeNone(base_font_size), val29, !isLikeNone(heading_scale), val30, !isLikeNone(table_font_size), val31, val32, !isLikeNone(font_scale), val33, ptr15, len15, val34, val35, val36, val37, ptr16, len16, ptr17, len17, val38, val39, val40, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21, val41, ptr22, len22, ptr23, len23, ptr24, len24, val42);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Compile in-memory Markdown files into a deterministic, zero-JavaScript HTML
 * site ZIP. The host owns file selection; the core owns include expansion,
 * link rewriting, navigation, parsing, rendering, and the search index.
 * @param {string[]} paths
 * @param {string[]} sources
 * @param {string | null} [title]
 * @param {string | null} [font]
 * @param {string | null} [dark_mode]
 * @param {number | null} [font_scale]
 * @returns {FmdRenderResult}
 */
export function renderBookSite(paths, sources, title, font, dark_mode, font_scale) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val6 = +(isLikeNone(font_scale) ? 0 : font_scale);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
        try {
            ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
            throw e;
        }
        wasm.renderBookSite(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(font_scale), val6);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Publish chapters and optional include-only resources as one offline ZIP.
 *
 * Images use book-root keys; fonts use the five ordinary renderer slots.
 * Chapter order is preserved. The output includes the canonical chapter-aware
 * search page/index and `frankenmarkdown-receipt.json`. Source parsing remains
 * safe: this API deliberately has no raw-HTML trust switch.
 *
 * # Errors
 * Rejects source, asset, metadata and output budgets, malformed options,
 * missing/cyclic includes, colliding paths and rendering failures.
 * @param {string[]} paths
 * @param {string[]} sources
 * @param {string[]} include_paths
 * @param {string[]} include_sources
 * @param {boolean} expand_includes
 * @param {string | null | undefined} title
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {string | null | undefined} custom_css
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string | null} [font_embedding]
 * @returns {Uint8Array}
 */
export function renderBookSitePublication(paths, sources, include_paths, include_sources, expand_includes, title, font, dark_mode, font_scale, lang, custom_css, toc, toc_depth, image_destinations, image_bytes_flat, image_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, font_embedding) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val20 = +expand_includes;
        const val21 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val22 = +toc;
        const val23 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18;
        try {
            ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passArrayJsValueToWasm0(include_paths, wasm.__wbindgen_export);
            len2 = WASM_VECTOR_LEN;
            ptr3 = passArrayJsValueToWasm0(include_sources, wasm.__wbindgen_export);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len6 = WASM_VECTOR_LEN;
            ptr7 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len7 = WASM_VECTOR_LEN;
            ptr8 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray32ToWasm0(image_lengths, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len14 = WASM_VECTOR_LEN;
            ptr15 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
            ptr17 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len17 = WASM_VECTOR_LEN;
            ptr18 = isLikeNone(font_embedding) ? 0 : passStringToWasm0(font_embedding, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len18 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr18) { wasm.__wbindgen_export3(ptr18, len18 * 1, 1); }
            if (ptr17) { wasm.__wbindgen_export3(ptr17, len17 * 4, 4); }
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 1, 1); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 1, 1); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 4, 4); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export6(ptr9, len9); wasm.__wbindgen_export3(ptr9, len9 * 4, 4); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export6(ptr3, len3); wasm.__wbindgen_export3(ptr3, len3 * 4, 4); }
            if (ptr2) { wasm.__wbindgen_export6(ptr2, len2); wasm.__wbindgen_export3(ptr2, len2 * 4, 4); }
            if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
            throw e;
        }
        wasm.renderBookSitePublication(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, val20, ptr4, len4, ptr5, len5, ptr6, len6, !isLikeNone(font_scale), val21, ptr7, len7, ptr8, len8, val22, val23, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
        if (r3) {
            throw takeFromExternrefTable0(r2);
        }
        var v24 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_export3(r0, r1 * 1, 1);
        return v24;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Publish a site with an explicit authoring dialect and the complete resource contract.
 * The earlier publication export keeps its exact signature and default bytes.
 *
 * # Errors
 * Rejects unknown dialects before constructing the book or copying asset payloads.
 * @param {string[]} paths
 * @param {string[]} sources
 * @param {string[]} include_paths
 * @param {string[]} include_sources
 * @param {boolean} expand_includes
 * @param {string | null | undefined} title
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {string | null | undefined} custom_css
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string | null} [font_embedding]
 * @param {string | null} [authoring_profile]
 * @returns {Uint8Array}
 */
export function renderBookSitePublicationProfiled(paths, sources, include_paths, include_sources, expand_includes, title, font, dark_mode, font_scale, lang, custom_css, toc, toc_depth, image_destinations, image_bytes_flat, image_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, font_embedding, authoring_profile) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val21 = +expand_includes;
        const val22 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val23 = +toc;
        const val24 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18, ptr19, len19;
        try {
            ptr0 = passArrayJsValueToWasm0(paths, wasm.__wbindgen_export);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayJsValueToWasm0(sources, wasm.__wbindgen_export);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passArrayJsValueToWasm0(include_paths, wasm.__wbindgen_export);
            len2 = WASM_VECTOR_LEN;
            ptr3 = passArrayJsValueToWasm0(include_sources, wasm.__wbindgen_export);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len6 = WASM_VECTOR_LEN;
            ptr7 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len7 = WASM_VECTOR_LEN;
            ptr8 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray32ToWasm0(image_lengths, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len14 = WASM_VECTOR_LEN;
            ptr15 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
            ptr17 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len17 = WASM_VECTOR_LEN;
            ptr18 = isLikeNone(font_embedding) ? 0 : passStringToWasm0(font_embedding, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len18 = WASM_VECTOR_LEN;
            ptr19 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len19 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr19) { wasm.__wbindgen_export3(ptr19, len19 * 1, 1); }
            if (ptr18) { wasm.__wbindgen_export3(ptr18, len18 * 1, 1); }
            if (ptr17) { wasm.__wbindgen_export3(ptr17, len17 * 4, 4); }
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 1, 1); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 1, 1); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 4, 4); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export6(ptr9, len9); wasm.__wbindgen_export3(ptr9, len9 * 4, 4); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export6(ptr3, len3); wasm.__wbindgen_export3(ptr3, len3 * 4, 4); }
            if (ptr2) { wasm.__wbindgen_export6(ptr2, len2); wasm.__wbindgen_export3(ptr2, len2 * 4, 4); }
            if (ptr1) { wasm.__wbindgen_export6(ptr1, len1); wasm.__wbindgen_export3(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_export6(ptr0, len0); wasm.__wbindgen_export3(ptr0, len0 * 4, 4); }
            throw e;
        }
        wasm.renderBookSitePublicationProfiled(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, val21, ptr4, len4, ptr5, len5, ptr6, len6, !isLikeNone(font_scale), val22, ptr7, len7, ptr8, len8, val23, val24, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18, ptr19, len19);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
        if (r3) {
            throw takeFromExternrefTable0(r2);
        }
        var v25 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_export3(r0, r1 * 1, 1);
        return v25;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render an EPUB 3 e-book through the same parser and HTML theme model.
 * @param {string} markdown
 * @param {string | null} [font]
 * @param {string | null} [dark_mode]
 * @param {string | null} [title]
 * @param {string | null} [lang]
 * @param {number | null} [font_scale]
 * @returns {FmdRenderResult}
 */
export function renderEpubConfigured(markdown, font, dark_mode, title, lang, font_scale) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val6 = +(isLikeNone(font_scale) ? 0 : font_scale);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderEpubConfigured(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(font_scale), val6);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render an EPUB with host-owned images, font faces, stylesheet and navigation.
 * The original six-argument `renderEpubConfigured` remains available unchanged.
 * No asset is fetched; the native EPUB writer owns XHTML, resource manifests,
 * font subsetting and ZIP serialization. Raw HTML is always escaped.
 *
 * # Errors
 * Rejects invalid options, inconsistent packed arrays, excessive input/assets,
 * invalid fonts, and publication-rendering failures before publishing output.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} lang
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} custom_css
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string | null} [font_embedding]
 * @returns {FmdRenderResult}
 */
export function renderEpubConfiguredAdvanced(markdown, font, dark_mode, title, lang, font_scale, custom_css, toc, toc_depth, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, font_embedding) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val17 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val18 = +toc;
        const val19 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(font_embedding) ? 0 : passStringToWasm0(font_embedding, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 4, 4); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 1, 1); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 4, 4); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export6(ptr6, len6); wasm.__wbindgen_export3(ptr6, len6 * 4, 4); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderEpubConfiguredAdvanced(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(font_scale), val17, ptr5, len5, val18, val19, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render an EPUB with author metadata and all existing profile/resource options.
 * Older configured bindings keep their signatures and default output bytes.
 * Author text is preserved verbatim, XML-escaped, and included in the package's
 * deterministic identifier. No author means no creator element.
 *
 * # Errors
 * Rejects author text over 64 KiB and the same invalid options, assets and
 * publications as [`render_epub_configured_profiled`].
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} lang
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} custom_css
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string | null} [font_embedding]
 * @param {string | null} [authoring_profile]
 * @param {string | null} [author]
 * @returns {FmdRenderResult}
 */
export function renderEpubConfiguredMetadata(markdown, font, dark_mode, title, lang, font_scale, custom_css, toc, toc_depth, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, font_embedding, authoring_profile, author) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val19 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val20 = +toc;
        const val21 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(font_embedding) ? 0 : passStringToWasm0(font_embedding, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
            ptr16 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len16 = WASM_VECTOR_LEN;
            ptr17 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len17 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr17) { wasm.__wbindgen_export3(ptr17, len17 * 1, 1); }
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 1, 1); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 4, 4); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 1, 1); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 4, 4); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export6(ptr6, len6); wasm.__wbindgen_export3(ptr6, len6 * 4, 4); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderEpubConfiguredMetadata(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(font_scale), val19, ptr5, len5, val20, val21, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render with an explicit Markdown authoring profile and the complete
 * resource/format options. Existing bindings retain their original signatures.
 *
 * An absent profile keeps every supported construct; `commonmark-gfm` keeps
 * definition-list syntax as paragraphs and `gfm-plus` enables definition lists.
 * This selection does not change raw-HTML safety or PDF/A policy.
 *
 * # Errors
 * Rejects an unknown authoring profile and the same invalid options, resources
 * and rendering failures as the existing configured binding.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} lang
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} custom_css
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string | null} [font_embedding]
 * @param {string | null} [authoring_profile]
 * @returns {FmdRenderResult}
 */
export function renderEpubConfiguredProfiled(markdown, font, dark_mode, title, lang, font_scale, custom_css, toc, toc_depth, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, font_embedding, authoring_profile) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val18 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val19 = +toc;
        const val20 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(font_embedding) ? 0 : passStringToWasm0(font_embedding, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
            ptr16 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len16 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 1, 1); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 4, 4); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 1, 1); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 4, 4); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export6(ptr6, len6); wasm.__wbindgen_export3(ptr6, len6 * 4, 4); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderEpubConfiguredProfiled(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(font_scale), val18, ptr5, len5, val19, val20, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render Markdown to self-contained HTML using default browser-safe options.
 *
 * # Errors
 * Returns a JavaScript error when rendering fails.
 * @param {string} markdown
 * @returns {FmdRenderResult}
 */
export function renderHtml(markdown) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.renderHtml(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render Markdown to self-contained HTML with browser package options.
 *
 * # Errors
 * Returns a JavaScript error when options are invalid or rendering fails.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} custom_css
 * @param {boolean} allow_raw_html
 * @returns {FmdRenderResult}
 */
export function renderHtmlConfigured(markdown, font, dark_mode, title, custom_css, allow_raw_html) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val6 = +allow_raw_html;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderHtmlConfigured(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, val6);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render Markdown to self-contained HTML with the complete browser option
 * set, including the core-owned uniform typographic scale.
 *
 * This additive entry point keeps the original narrow ABI stable while giving
 * the ergonomic JavaScript wrapper one canonical path for fonts, images, and
 * type scale. The scale is interpreted by [`WasmRenderOptions`] and therefore
 * changes the Rust-generated theme rather than patching the returned HTML.
 *
 * # Errors
 * Returns a JavaScript error when parallel image arrays are inconsistent, a
 * font asset is invalid, the scale is not positive and finite, or rendering
 * fails.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} custom_css
 * @param {boolean} allow_raw_html
 * @param {number | null | undefined} font_scale
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null} [toc_depth]
 * @param {string | null} [html_font_format]
 * @param {string | null} [font_embedding]
 * @returns {FmdRenderResult}
 */
export function renderHtmlConfiguredAdvanced(markdown, font, dark_mode, title, custom_css, allow_raw_html, font_scale, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, image_destinations, image_bytes_flat, image_bytes_lengths, lang, toc, toc_depth, html_font_format, font_embedding) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val18 = +allow_raw_html;
        const val19 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val20 = +toc;
        const val21 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(html_font_format) ? 0 : passStringToWasm0(html_font_format, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
            ptr16 = isLikeNone(font_embedding) ? 0 : passStringToWasm0(font_embedding, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len16 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 1, 1); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export6(ptr11, len11); wasm.__wbindgen_export3(ptr11, len11 * 4, 4); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 4, 4); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderHtmlConfiguredAdvanced(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, val18, !isLikeNone(font_scale), val19, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, val20, val21, ptr15, len15, ptr16, len16);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render HTML with resolved publication metadata, resources and an optional
 * authoring profile. Hosts resolve frontmatter defaults below explicit options
 * before calling this binding, as they do for PDF and EPUB publication.
 *
 * This additive binding preserves every existing HTML binding's signature and
 * output when no author is supplied. Author text is escaped by the shared HTML
 * renderer; an empty string omits the metadata element.
 *
 * # Errors
 * Rejects an unknown authoring profile and the same invalid options, resources
 * and rendering failures as the existing configured binding.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} custom_css
 * @param {boolean} allow_raw_html
 * @param {number | null | undefined} font_scale
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null} [toc_depth]
 * @param {string | null} [html_font_format]
 * @param {string | null} [font_embedding]
 * @param {string | null} [authoring_profile]
 * @param {string | null} [author]
 * @returns {FmdRenderResult}
 */
export function renderHtmlConfiguredMetadata(markdown, font, dark_mode, title, custom_css, allow_raw_html, font_scale, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, image_destinations, image_bytes_flat, image_bytes_lengths, lang, toc, toc_depth, html_font_format, font_embedding, authoring_profile, author) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val20 = +allow_raw_html;
        const val21 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val22 = +toc;
        const val23 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(html_font_format) ? 0 : passStringToWasm0(html_font_format, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
            ptr16 = isLikeNone(font_embedding) ? 0 : passStringToWasm0(font_embedding, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len16 = WASM_VECTOR_LEN;
            ptr17 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len17 = WASM_VECTOR_LEN;
            ptr18 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len18 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr18) { wasm.__wbindgen_export3(ptr18, len18 * 1, 1); }
            if (ptr17) { wasm.__wbindgen_export3(ptr17, len17 * 1, 1); }
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 1, 1); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export6(ptr11, len11); wasm.__wbindgen_export3(ptr11, len11 * 4, 4); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 4, 4); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderHtmlConfiguredMetadata(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, val20, !isLikeNone(font_scale), val21, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, val22, val23, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render Markdown to self-contained HTML with fonts and any number of host
 * image assets (data-URI inlined). Parallel image arrays match the PDF multi
 * ABI so the JS wrapper can share flattening.
 *
 * # Errors
 * Returns a JavaScript error when the image arrays are inconsistent, an option
 * is invalid, or rendering fails.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} custom_css
 * @param {boolean} allow_raw_html
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @returns {FmdRenderResult}
 */
export function renderHtmlConfiguredMulti(markdown, font, dark_mode, title, custom_css, allow_raw_html, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, image_destinations, image_bytes_flat, image_bytes_lengths) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val15 = +allow_raw_html;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export6(ptr11, len11); wasm.__wbindgen_export3(ptr11, len11 * 4, 4); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 4, 4); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderHtmlConfiguredMulti(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, val15, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render with an explicit Markdown authoring profile and the complete
 * resource/format options. Existing bindings retain their original signatures.
 *
 * An absent profile keeps every supported construct; `commonmark-gfm` keeps
 * definition-list syntax as paragraphs and `gfm-plus` enables definition lists.
 * This selection does not change raw-HTML safety or PDF/A policy.
 *
 * # Errors
 * Rejects an unknown authoring profile and the same invalid options, resources
 * and rendering failures as the existing configured binding.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} custom_css
 * @param {boolean} allow_raw_html
 * @param {number | null | undefined} font_scale
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null} [toc_depth]
 * @param {string | null} [html_font_format]
 * @param {string | null} [font_embedding]
 * @param {string | null} [authoring_profile]
 * @returns {FmdRenderResult}
 */
export function renderHtmlConfiguredProfiled(markdown, font, dark_mode, title, custom_css, allow_raw_html, font_scale, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, image_destinations, image_bytes_flat, image_bytes_lengths, lang, toc, toc_depth, html_font_format, font_embedding, authoring_profile) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val19 = +allow_raw_html;
        const val20 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val21 = +toc;
        const val22 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(html_font_format) ? 0 : passStringToWasm0(html_font_format, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
            ptr16 = isLikeNone(font_embedding) ? 0 : passStringToWasm0(font_embedding, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len16 = WASM_VECTOR_LEN;
            ptr17 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len17 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr17) { wasm.__wbindgen_export3(ptr17, len17 * 1, 1); }
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 1, 1); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export6(ptr11, len11); wasm.__wbindgen_export3(ptr11, len11 * 4, 4); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 4, 4); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderHtmlConfiguredProfiled(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, val19, !isLikeNone(font_scale), val20, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, val21, val22, ptr15, len15, ptr16, len16, ptr17, len17);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render Markdown to self-contained HTML with browser package options and
 * caller-supplied font bytes.
 *
 * Empty byte arrays mean "use bundled fallback" for that slot.
 *
 * # Errors
 * Returns a JavaScript error when options are invalid or rendering fails.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} custom_css
 * @param {boolean} allow_raw_html
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @returns {FmdRenderResult}
 */
export function renderHtmlConfiguredWithFonts(markdown, font, dark_mode, title, custom_css, allow_raw_html, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val12 = +allow_raw_html;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 4, 4); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderHtmlConfiguredWithFonts(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, val12, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render a self-hosting, single-file HTML workspace with its own editor,
 * preview, intelligence panel, and print/PDF path.
 * @param {string} markdown
 * @param {string | null} [font]
 * @param {string | null} [dark_mode]
 * @param {string | null} [title]
 * @param {string | null} [lang]
 * @param {number | null} [font_scale]
 * @returns {FmdRenderResult}
 */
export function renderInteractiveHtmlConfigured(markdown, font, dark_mode, title, lang, font_scale) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val6 = +(isLikeNone(font_scale) ? 0 : font_scale);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderInteractiveHtmlConfigured(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(font_scale), val6);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render an editable workspace with persistent HTML styling and explicit
 * resources. The preview is isolated from application controls; subsequent
 * edits use the documented lightweight parser with the same fonts and styles.
 *
 * # Errors
 * Rejects raw HTML passthrough, invalid resources/options and oversized inputs.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} custom_css
 * @param {boolean} allow_raw_html
 * @param {number | null | undefined} font_scale
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null} [toc_depth]
 * @param {string | null} [html_font_format]
 * @returns {FmdRenderResult}
 */
export function renderInteractiveHtmlConfiguredAdvanced(markdown, font, dark_mode, title, custom_css, allow_raw_html, font_scale, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, image_destinations, image_bytes_flat, image_bytes_lengths, lang, toc, toc_depth, html_font_format) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val17 = +allow_raw_html;
        const val18 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val19 = +toc;
        const val20 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(html_font_format) ? 0 : passStringToWasm0(html_font_format, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export6(ptr11, len11); wasm.__wbindgen_export3(ptr11, len11 * 4, 4); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 4, 4); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderInteractiveHtmlConfiguredAdvanced(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, val17, !isLikeNone(font_scale), val18, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, val19, val20, ptr15, len15);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render a self-contained editable workspace with an explicit authoring
 * grammar. The native preview and saved offline editor receive the same
 * profile before parsing; styles, resources and safe-HTML limits are retained.
 *
 * The original six- and twenty-argument bindings keep their signatures and
 * extension-enabled default. An absent profile produces the same bytes as
 * the advanced binding, including its isolated styled preview.
 *
 * # Errors
 * Rejects an unknown authoring profile before resource admission, then the
 * same invalid options, resources and limits as the advanced binding.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} custom_css
 * @param {boolean} allow_raw_html
 * @param {number | null | undefined} font_scale
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null} [toc_depth]
 * @param {string | null} [html_font_format]
 * @param {string | null} [authoring_profile]
 * @returns {FmdRenderResult}
 */
export function renderInteractiveHtmlConfiguredProfiled(markdown, font, dark_mode, title, custom_css, allow_raw_html, font_scale, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, image_destinations, image_bytes_flat, image_bytes_lengths, lang, toc, toc_depth, html_font_format, authoring_profile) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val18 = +allow_raw_html;
        const val19 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val20 = +toc;
        const val21 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(custom_css) ? 0 : passStringToWasm0(custom_css, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(html_font_format) ? 0 : passStringToWasm0(html_font_format, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
            ptr16 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len16 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 1, 1); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export6(ptr11, len11); wasm.__wbindgen_export3(ptr11, len11 * 4, 4); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 4, 4); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderInteractiveHtmlConfiguredProfiled(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, val18, !isLikeNone(font_scale), val19, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, val20, val21, ptr15, len15, ptr16, len16);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render Markdown to PDF using default browser-safe options.
 *
 * # Errors
 * Returns a JavaScript error when rendering fails.
 * @param {string} markdown
 * @returns {FmdRenderResult}
 */
export function renderPdf(markdown) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.renderPdf(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render Markdown to PDF with browser package options.
 *
 * # Errors
 * Returns a JavaScript error when options are invalid or rendering fails.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @returns {FmdRenderResult}
 */
export function renderPdfConfigured(markdown, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val6 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val7 = +allow_raw_html;
        const val8 = +code_line_numbers;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderPdfConfigured(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(metadata_epoch_seconds), val6, val7, val8);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * The running-image PDF ABI plus export-local `off` / `2b`, strictness and an
 * optional body baseline grid. Omitting the final argument preserves the
 * original archival binding's default output.
 * Ordinary bindings retain their signatures and behavior. This is emission,
 * not independent PDF/A validation. Metadata uses the supplied epoch, never
 * the clock. Strict mode fails on the native writer's forbidden URI actions;
 * non-strict mode uses its explicit action-dropping policy.
 *
 * # Errors
 * Rejects unsupported profiles, strict-with-off, source/resource budgets,
 * malformed settings and native rendering failures. Never substitutes PDF.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {Float64Array | number[]} page_geometry
 * @param {string[]} running_slots
 * @param {boolean} header_rule
 * @param {boolean} footer_rule
 * @param {boolean} skip_first_page
 * @param {string[]} running_image_destinations
 * @param {Uint32Array | number[]} running_image_positions
 * @param {Uint32Array | number[]} running_image_heights
 * @param {string | null | undefined} typography
 * @param {string} profile
 * @param {boolean} strict
 * @param {number | null} [baseline_grid_pt]
 * @returns {FmdRenderResult}
 */
export function renderPdfConfiguredArchival(markdown, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, page_geometry, running_slots, header_rule, footer_rule, skip_first_page, running_image_destinations, running_image_positions, running_image_heights, typography, profile, strict, baseline_grid_pt) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val23 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val24 = +allow_raw_html;
        const val25 = +code_line_numbers;
        const val26 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val27 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val28 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val29 = +page_numbers;
        const val30 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val31 = +toc;
        const val32 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val33 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val34 = +microtype_protrusion;
        const val35 = +header_rule;
        const val36 = +footer_rule;
        const val37 = +skip_first_page;
        const val38 = +strict;
        const val39 = +(isLikeNone(baseline_grid_pt) ? 0 : baseline_grid_pt);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArrayJsValueToWasm0(running_slots, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
            ptr17 = passArrayJsValueToWasm0(running_image_destinations, wasm.__wbindgen_export);
            len17 = WASM_VECTOR_LEN;
            ptr18 = passArray32ToWasm0(running_image_positions, wasm.__wbindgen_export);
            len18 = WASM_VECTOR_LEN;
            ptr19 = passArray32ToWasm0(running_image_heights, wasm.__wbindgen_export);
            len19 = WASM_VECTOR_LEN;
            ptr20 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len20 = WASM_VECTOR_LEN;
            ptr21 = passStringToWasm0(profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len21 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr21) { wasm.__wbindgen_export3(ptr21, len21 * 1, 1); }
            if (ptr20) { wasm.__wbindgen_export3(ptr20, len20 * 1, 1); }
            if (ptr19) { wasm.__wbindgen_export3(ptr19, len19 * 4, 4); }
            if (ptr18) { wasm.__wbindgen_export3(ptr18, len18 * 4, 4); }
            if (ptr17) { wasm.__wbindgen_export6(ptr17, len17); wasm.__wbindgen_export3(ptr17, len17 * 4, 4); }
            if (ptr16) { wasm.__wbindgen_export6(ptr16, len16); wasm.__wbindgen_export3(ptr16, len16 * 4, 4); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 8, 8); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 4, 4); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export6(ptr5, len5); wasm.__wbindgen_export3(ptr5, len5 * 4, 4); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderPdfConfiguredArchival(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(metadata_epoch_seconds), val23, val24, val25, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, !isLikeNone(base_font_size), val26, !isLikeNone(heading_scale), val27, !isLikeNone(table_font_size), val28, val29, !isLikeNone(font_scale), val30, ptr14, len14, val31, val32, val33, val34, ptr15, len15, ptr16, len16, val35, val36, val37, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21, val38, !isLikeNone(baseline_grid_pt), val39);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render one document with the complete paper/running-image/typography
 * contract plus a final baseline spacing in points. Zero disables the grid.
 *
 * # Errors
 * Rejects invalid or fitting-incompatible grids before parsing or copying
 * individual assets, then preserves the native render error.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {Float64Array | number[]} page_geometry
 * @param {string[]} running_slots
 * @param {boolean} header_rule
 * @param {boolean} footer_rule
 * @param {boolean} skip_first_page
 * @param {string[]} running_image_destinations
 * @param {Uint32Array | number[]} running_image_positions
 * @param {Uint32Array | number[]} running_image_heights
 * @param {string | null | undefined} typography
 * @param {number} baseline_grid_pt
 * @returns {FmdRenderResult}
 */
export function renderPdfConfiguredGrid(markdown, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, page_geometry, running_slots, header_rule, footer_rule, skip_first_page, running_image_destinations, running_image_positions, running_image_heights, typography, baseline_grid_pt) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val22 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val23 = +allow_raw_html;
        const val24 = +code_line_numbers;
        const val25 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val26 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val27 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val28 = +page_numbers;
        const val29 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val30 = +toc;
        const val31 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val32 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val33 = +microtype_protrusion;
        const val34 = +header_rule;
        const val35 = +footer_rule;
        const val36 = +skip_first_page;
        const val37 = +baseline_grid_pt;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArrayJsValueToWasm0(running_slots, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
            ptr17 = passArrayJsValueToWasm0(running_image_destinations, wasm.__wbindgen_export);
            len17 = WASM_VECTOR_LEN;
            ptr18 = passArray32ToWasm0(running_image_positions, wasm.__wbindgen_export);
            len18 = WASM_VECTOR_LEN;
            ptr19 = passArray32ToWasm0(running_image_heights, wasm.__wbindgen_export);
            len19 = WASM_VECTOR_LEN;
            ptr20 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len20 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr20) { wasm.__wbindgen_export3(ptr20, len20 * 1, 1); }
            if (ptr19) { wasm.__wbindgen_export3(ptr19, len19 * 4, 4); }
            if (ptr18) { wasm.__wbindgen_export3(ptr18, len18 * 4, 4); }
            if (ptr17) { wasm.__wbindgen_export6(ptr17, len17); wasm.__wbindgen_export3(ptr17, len17 * 4, 4); }
            if (ptr16) { wasm.__wbindgen_export6(ptr16, len16); wasm.__wbindgen_export3(ptr16, len16 * 4, 4); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 8, 8); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 4, 4); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export6(ptr5, len5); wasm.__wbindgen_export3(ptr5, len5 * 4, 4); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderPdfConfiguredGrid(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(metadata_epoch_seconds), val22, val23, val24, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, !isLikeNone(base_font_size), val25, !isLikeNone(heading_scale), val26, !isLikeNone(table_font_size), val27, val28, !isLikeNone(font_scale), val29, ptr14, len14, val30, val31, val32, val33, ptr15, len15, ptr16, len16, val34, val35, val36, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20, val37);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render Markdown to PDF with browser package options, ANY number of image
 * assets, and caller-supplied font bytes. This is the general form the JS
 * wrapper uses so multi-image documents reach native↔WASM parity (the
 * single-image entry points above remain for a narrower ABI).
 *
 * Images arrive as three parallel arrays — a destination per image, all image
 * bytes concatenated, and the byte length of each image — because wasm-bindgen
 * cannot pass a `Vec<Vec<u8>>` directly. Empty font byte arrays mean "use
 * bundled fallback" for that slot.
 *
 * # Errors
 * Returns a JavaScript error when the image arrays are inconsistent, an option
 * is invalid, or rendering fails.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {string | null} [typography]
 * @returns {FmdRenderResult}
 */
export function renderPdfConfiguredMulti(markdown, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, typography) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val17 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val18 = +allow_raw_html;
        const val19 = +code_line_numbers;
        const val20 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val21 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val22 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val23 = +page_numbers;
        const val24 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val25 = +toc;
        const val26 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val27 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val28 = +microtype_protrusion;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len15 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 1, 1); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 4, 4); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export6(ptr5, len5); wasm.__wbindgen_export3(ptr5, len5 * 4, 4); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderPdfConfiguredMulti(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(metadata_epoch_seconds), val17, val18, val19, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, !isLikeNone(base_font_size), val20, !isLikeNone(heading_scale), val21, !isLikeNone(table_font_size), val22, val23, !isLikeNone(font_scale), val24, ptr14, len14, val25, val26, val27, val28, ptr15, len15);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render using the ordinary PDF engine with explicit paper and margins.
 *
 * `page_geometry` is empty for the existing theme defaults, or exactly six
 * point values: width, height, top, right, bottom, left. Values are checked
 * before parsing or copying per-asset payloads, including after f32 conversion.
 * No output scaling, MediaBox patching, browser printing, or global state.
 *
 * # Errors
 * Returns an error for invalid geometry, assets, options, or rendering.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {Float64Array | number[]} page_geometry
 * @param {string | null} [typography]
 * @returns {FmdRenderResult}
 */
export function renderPdfConfiguredPage(markdown, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, page_geometry, typography) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val18 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val19 = +allow_raw_html;
        const val20 = +code_line_numbers;
        const val21 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val22 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val23 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val24 = +page_numbers;
        const val25 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val26 = +toc;
        const val27 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val28 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val29 = +microtype_protrusion;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            len15 = WASM_VECTOR_LEN;
            ptr16 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len16 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr16) { wasm.__wbindgen_export3(ptr16, len16 * 1, 1); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 8, 8); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 4, 4); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export6(ptr5, len5); wasm.__wbindgen_export3(ptr5, len5 * 4, 4); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderPdfConfiguredPage(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(metadata_epoch_seconds), val18, val19, val20, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, !isLikeNone(base_font_size), val21, !isLikeNone(heading_scale), val22, !isLikeNone(table_font_size), val23, val24, !isLikeNone(font_scale), val25, ptr14, len14, val26, val27, val28, val29, ptr15, len15, ptr16, len16);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render with an explicit Markdown authoring profile and the complete
 * resource/format options. Existing bindings retain their original signatures.
 *
 * An absent profile keeps every supported construct; `commonmark-gfm` keeps
 * definition-list syntax as paragraphs and `gfm-plus` enables definition lists.
 * This selection does not change raw-HTML safety or PDF/A policy.
 *
 * # Errors
 * Rejects an unknown authoring profile and the same invalid options, resources
 * and rendering failures as the existing configured binding.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {Float64Array | number[]} page_geometry
 * @param {string[]} running_slots
 * @param {boolean} header_rule
 * @param {boolean} footer_rule
 * @param {boolean} skip_first_page
 * @param {string[]} running_image_destinations
 * @param {Uint32Array | number[]} running_image_positions
 * @param {Uint32Array | number[]} running_image_heights
 * @param {string | null | undefined} typography
 * @param {string} profile
 * @param {boolean} strict
 * @param {number | null} [baseline_grid_pt]
 * @param {string | null} [authoring_profile]
 * @returns {FmdRenderResult}
 */
export function renderPdfConfiguredProfiled(markdown, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, page_geometry, running_slots, header_rule, footer_rule, skip_first_page, running_image_destinations, running_image_positions, running_image_heights, typography, profile, strict, baseline_grid_pt, authoring_profile) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val24 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val25 = +allow_raw_html;
        const val26 = +code_line_numbers;
        const val27 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val28 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val29 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val30 = +page_numbers;
        const val31 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val32 = +toc;
        const val33 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val34 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val35 = +microtype_protrusion;
        const val36 = +header_rule;
        const val37 = +footer_rule;
        const val38 = +skip_first_page;
        const val39 = +strict;
        const val40 = +(isLikeNone(baseline_grid_pt) ? 0 : baseline_grid_pt);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21, ptr22, len22;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArrayJsValueToWasm0(running_slots, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
            ptr17 = passArrayJsValueToWasm0(running_image_destinations, wasm.__wbindgen_export);
            len17 = WASM_VECTOR_LEN;
            ptr18 = passArray32ToWasm0(running_image_positions, wasm.__wbindgen_export);
            len18 = WASM_VECTOR_LEN;
            ptr19 = passArray32ToWasm0(running_image_heights, wasm.__wbindgen_export);
            len19 = WASM_VECTOR_LEN;
            ptr20 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len20 = WASM_VECTOR_LEN;
            ptr21 = passStringToWasm0(profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len21 = WASM_VECTOR_LEN;
            ptr22 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len22 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr22) { wasm.__wbindgen_export3(ptr22, len22 * 1, 1); }
            if (ptr21) { wasm.__wbindgen_export3(ptr21, len21 * 1, 1); }
            if (ptr20) { wasm.__wbindgen_export3(ptr20, len20 * 1, 1); }
            if (ptr19) { wasm.__wbindgen_export3(ptr19, len19 * 4, 4); }
            if (ptr18) { wasm.__wbindgen_export3(ptr18, len18 * 4, 4); }
            if (ptr17) { wasm.__wbindgen_export6(ptr17, len17); wasm.__wbindgen_export3(ptr17, len17 * 4, 4); }
            if (ptr16) { wasm.__wbindgen_export6(ptr16, len16); wasm.__wbindgen_export3(ptr16, len16 * 4, 4); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 8, 8); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 4, 4); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export6(ptr5, len5); wasm.__wbindgen_export3(ptr5, len5 * 4, 4); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderPdfConfiguredProfiled(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(metadata_epoch_seconds), val24, val25, val26, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, !isLikeNone(base_font_size), val27, !isLikeNone(heading_scale), val28, !isLikeNone(table_font_size), val29, val30, !isLikeNone(font_scale), val31, ptr14, len14, val32, val33, val34, val35, ptr15, len15, ptr16, len16, val36, val37, val38, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21, val39, !isLikeNone(baseline_grid_pt), val40, ptr22, len22);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * [`render_pdf_configured_page`] plus running header/footer chrome (GH #13).
 *
 * `running_slots` is empty (no chrome) or exactly six templates: header
 * left, center, right, then footer left, center, right. Empty strings are
 * absent slots. Tokens: `{page}`, `{pages}`, `{title}`, `{author}`,
 * `{date}` (from `metadata_epoch_seconds`; never the clock). The existing
 * bindings keep their signatures and output.
 *
 * # Errors
 * Returns an error for malformed running slots, invalid geometry, assets or
 * options, a band that does not fit its margin, or a render failure.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {Float64Array | number[]} page_geometry
 * @param {string[]} running_slots
 * @param {boolean} header_rule
 * @param {boolean} footer_rule
 * @param {boolean} skip_first_page
 * @param {string | null} [typography]
 * @returns {FmdRenderResult}
 */
export function renderPdfConfiguredRunning(markdown, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, page_geometry, running_slots, header_rule, footer_rule, skip_first_page, typography) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val19 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val20 = +allow_raw_html;
        const val21 = +code_line_numbers;
        const val22 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val23 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val24 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val25 = +page_numbers;
        const val26 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val27 = +toc;
        const val28 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val29 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val30 = +microtype_protrusion;
        const val31 = +header_rule;
        const val32 = +footer_rule;
        const val33 = +skip_first_page;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArrayJsValueToWasm0(running_slots, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
            ptr17 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len17 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr17) { wasm.__wbindgen_export3(ptr17, len17 * 1, 1); }
            if (ptr16) { wasm.__wbindgen_export6(ptr16, len16); wasm.__wbindgen_export3(ptr16, len16 * 4, 4); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 8, 8); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 4, 4); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export6(ptr5, len5); wasm.__wbindgen_export3(ptr5, len5 * 4, 4); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderPdfConfiguredRunning(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(metadata_epoch_seconds), val19, val20, val21, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, !isLikeNone(base_font_size), val22, !isLikeNone(heading_scale), val23, !isLikeNone(table_font_size), val24, val25, !isLikeNone(font_scale), val26, ptr14, len14, val27, val28, val29, val30, ptr15, len15, ptr16, len16, val31, val32, val33, ptr17, len17);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Running text and optional image logos from explicitly supplied image assets.
 * Image vectors are empty, or two entries (header, footer). A blank destination
 * is absent; positions are 0/1 (left/right), heights are 0 (automatic) or positive
 * u16 points. The text-only ABI remains unchanged.
 *
 * # Errors
 * Rejects malformed image settings before rendering; missing or invalid image
 * payloads and images that do not fit are reported by the shared PDF renderer.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {Float64Array | number[]} page_geometry
 * @param {string[]} running_slots
 * @param {boolean} header_rule
 * @param {boolean} footer_rule
 * @param {boolean} skip_first_page
 * @param {string[]} running_image_destinations
 * @param {Uint32Array | number[]} running_image_positions
 * @param {Uint32Array | number[]} running_image_heights
 * @param {string | null} [typography]
 * @returns {FmdRenderResult}
 */
export function renderPdfConfiguredRunningImages(markdown, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, page_geometry, running_slots, header_rule, footer_rule, skip_first_page, running_image_destinations, running_image_positions, running_image_heights, typography) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val22 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val23 = +allow_raw_html;
        const val24 = +code_line_numbers;
        const val25 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val26 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val27 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val28 = +page_numbers;
        const val29 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val30 = +toc;
        const val31 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val32 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val33 = +microtype_protrusion;
        const val34 = +header_rule;
        const val35 = +footer_rule;
        const val36 = +skip_first_page;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArrayJsValueToWasm0(running_slots, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
            ptr17 = passArrayJsValueToWasm0(running_image_destinations, wasm.__wbindgen_export);
            len17 = WASM_VECTOR_LEN;
            ptr18 = passArray32ToWasm0(running_image_positions, wasm.__wbindgen_export);
            len18 = WASM_VECTOR_LEN;
            ptr19 = passArray32ToWasm0(running_image_heights, wasm.__wbindgen_export);
            len19 = WASM_VECTOR_LEN;
            ptr20 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len20 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr20) { wasm.__wbindgen_export3(ptr20, len20 * 1, 1); }
            if (ptr19) { wasm.__wbindgen_export3(ptr19, len19 * 4, 4); }
            if (ptr18) { wasm.__wbindgen_export3(ptr18, len18 * 4, 4); }
            if (ptr17) { wasm.__wbindgen_export6(ptr17, len17); wasm.__wbindgen_export3(ptr17, len17 * 4, 4); }
            if (ptr16) { wasm.__wbindgen_export6(ptr16, len16); wasm.__wbindgen_export3(ptr16, len16 * 4, 4); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 8, 8); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 4, 4); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export6(ptr5, len5); wasm.__wbindgen_export3(ptr5, len5 * 4, 4); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderPdfConfiguredRunningImages(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(metadata_epoch_seconds), val22, val23, val24, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, !isLikeNone(base_font_size), val25, !isLikeNone(heading_scale), val26, !isLikeNone(table_font_size), val27, val28, !isLikeNone(font_scale), val29, ptr14, len14, val30, val31, val32, val33, ptr15, len15, ptr16, len16, val34, val35, val36, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render Markdown to PDF with browser package options, one optional image
 * asset, and caller-supplied font bytes.
 *
 * Empty image destination/bytes means "no image asset"; empty font byte arrays
 * mean "use bundled fallback" for that slot.
 *
 * # Errors
 * Returns a JavaScript error when options are invalid or rendering fails.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string} image_destination
 * @param {Uint8Array | number[]} image_bytes
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @returns {FmdRenderResult}
 */
export function renderPdfConfiguredWithAssets(markdown, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destination, image_bytes, body_regular, body_bold, body_italic, body_bold_italic, mono_regular) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val13 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val14 = +allow_raw_html;
        const val15 = +code_line_numbers;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passStringToWasm0(image_destination, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(image_bytes, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderPdfConfiguredWithAssets(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(metadata_epoch_seconds), val13, val14, val15, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render Markdown to PDF with one browser-supplied image asset.
 *
 * This dependency-free adapter is intentionally narrow: callers pass bytes
 * they already own (for example from a file picker or fetch handled outside
 * the core). The renderer never touches the browser filesystem or network.
 *
 * # Errors
 * Returns a JavaScript error when options are invalid or rendering fails.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string} image_destination
 * @param {Uint8Array | number[]} image_bytes
 * @returns {FmdRenderResult}
 */
export function renderPdfConfiguredWithImage(markdown, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destination, image_bytes) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val8 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val9 = +allow_raw_html;
        const val10 = +code_line_numbers;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passStringToWasm0(image_destination, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(image_bytes, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderPdfConfiguredWithImage(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(metadata_epoch_seconds), val8, val9, val10, ptr5, len5, ptr6, len6);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render a semantic AST diff as a self-contained visual HTML document.
 * @param {string} old_markdown
 * @param {string} new_markdown
 * @param {string | null} [old_name]
 * @param {string | null} [new_name]
 * @returns {FmdRenderResult}
 */
export function renderSemanticDiffHtml(old_markdown, new_markdown, old_name, new_name) {
    let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
    try {
        ptr0 = passStringToWasm0(old_markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(new_markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        len1 = WASM_VECTOR_LEN;
        ptr2 = isLikeNone(old_name) ? 0 : passStringToWasm0(old_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        len2 = WASM_VECTOR_LEN;
        ptr3 = isLikeNone(new_name) ? 0 : passStringToWasm0(new_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        len3 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
        if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.renderSemanticDiffHtml(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    return FmdRenderResult.__wrap(ret);
}

/**
 * Render a visual revision review with the same dialect as the publications.
 *
 * The selected grammar governs both revisions and the HTML emitter. Source
 * byte accounting, safe escaping, labels and the legacy omitted-profile
 * output remain unchanged.
 *
 * # Errors
 * Rejects an unknown authoring profile before parsing either revision.
 * @param {string} old_markdown
 * @param {string} new_markdown
 * @param {string | null} [old_name]
 * @param {string | null} [new_name]
 * @param {string | null} [authoring_profile]
 * @returns {FmdRenderResult}
 */
export function renderSemanticDiffHtmlProfiled(old_markdown, new_markdown, old_name, new_name, authoring_profile) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
        try {
            ptr0 = passStringToWasm0(old_markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(new_markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(old_name) ? 0 : passStringToWasm0(old_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(new_name) ? 0 : passStringToWasm0(new_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderSemanticDiffHtmlProfiled(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render a standalone vector poster with glyph outlines embedded as paths.
 * @param {string} markdown
 * @param {string | null} [font]
 * @param {string | null} [dark_mode]
 * @param {number | null} [font_scale]
 * @param {number | null} [max_width_pt]
 * @returns {FmdRenderResult}
 */
export function renderSvgConfigured(markdown, font, dark_mode, font_scale, max_width_pt) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val4 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val5 = +(isLikeNone(max_width_pt) ? 0 : max_width_pt);
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderSvgConfigured(retptr, ptr0, len0, ptr1, len1, ptr2, len2, !isLikeNone(font_scale), val4, !isLikeNone(max_width_pt), val5);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render a native linked table of contents with resources and an authoring
 * profile. Existing configured bindings retain their original signatures.
 * Explicit Markdown markers own placement; `toc` inserts an outline before
 * the first body heading when no body marker is present.
 *
 * # Errors
 * Rejects depths outside 1..=6 and the same invalid geometry, profiles,
 * resources and rendering failures as the existing configured binding.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {number | null | undefined} font_scale
 * @param {number | null | undefined} max_width_pt
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string | null | undefined} authoring_profile
 * @param {boolean} toc
 * @param {number | null} [toc_depth]
 * @returns {FmdRenderResult}
 */
export function renderSvgConfiguredNavigation(markdown, font, dark_mode, font_scale, max_width_pt, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, authoring_profile, toc, toc_depth) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val14 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val15 = +(isLikeNone(max_width_pt) ? 0 : max_width_pt);
        const val16 = +toc;
        const val17 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len3 = WASM_VECTOR_LEN;
            ptr4 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len12 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 4, 4); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 4, 4); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export6(ptr3, len3); wasm.__wbindgen_export3(ptr3, len3 * 4, 4); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderSvgConfiguredNavigation(retptr, ptr0, len0, ptr1, len1, ptr2, len2, !isLikeNone(font_scale), val14, !isLikeNone(max_width_pt), val15, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, val16, val17);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render with an explicit Markdown authoring profile and the complete
 * resource/format options. Existing bindings retain their original signatures.
 *
 * An absent profile keeps every supported construct; `commonmark-gfm` keeps
 * definition-list syntax as paragraphs and `gfm-plus` enables definition lists.
 * This selection does not change raw-HTML safety or PDF/A policy.
 *
 * # Errors
 * Rejects an unknown authoring profile and the same invalid options, resources
 * and rendering failures as the existing configured binding.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {number | null | undefined} font_scale
 * @param {number | null | undefined} max_width_pt
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {string | null} [authoring_profile]
 * @returns {FmdRenderResult}
 */
export function renderSvgConfiguredProfiled(markdown, font, dark_mode, font_scale, max_width_pt, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, authoring_profile) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val14 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val15 = +(isLikeNone(max_width_pt) ? 0 : max_width_pt);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len3 = WASM_VECTOR_LEN;
            ptr4 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len12 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 4, 4); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 4, 4); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export6(ptr3, len3); wasm.__wbindgen_export3(ptr3, len3 * 4, 4); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderSvgConfiguredProfiled(retptr, ptr0, len0, ptr1, len1, ptr2, len2, !isLikeNone(font_scale), val14, !isLikeNone(max_width_pt), val15, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Render an SVG poster with explicit image bytes and the shared five font slots.
 * Images arrive as parallel destinations, packed bytes and lengths. Empty font
 * slots select bundled faces. Nothing is fetched from a destination string.
 *
 * The result retains parser diagnostics AND recoverable image/math warnings.
 * The original five-argument `renderSvgConfigured` remains supported.
 *
 * # Errors
 * Rejects excessive source/assets, inconsistent packed arrays, duplicate image
 * keys, invalid fonts/weights and non-finite or out-of-range geometry. Input
 * admission precedes per-resource copies, font parsing and Markdown parsing.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {number | null | undefined} font_scale
 * @param {number | null | undefined} max_width_pt
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @returns {FmdRenderResult}
 */
export function renderSvgConfiguredResources(markdown, font, dark_mode, font_scale, max_width_pt, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val13 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val14 = +(isLikeNone(max_width_pt) ? 0 : max_width_pt);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len3 = WASM_VECTOR_LEN;
            ptr4 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 4, 4); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 1, 1); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export3(ptr5, len5 * 4, 4); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export6(ptr3, len3); wasm.__wbindgen_export3(ptr3, len3 * 4, 4); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.renderSvgConfiguredResources(retptr, ptr0, len0, ptr1, len1, ptr2, len2, !isLikeNone(font_scale), val13, !isLikeNone(max_width_pt), val14, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
            throw takeFromExternrefTable0(r1);
        }
        return FmdRenderResult.__wrap(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
 * Build the deterministic search index used by static-document experiences.
 * @param {string} markdown
 * @returns {string}
 */
export function searchIndex(markdown) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.searchIndex(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export3(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Build the heading/body-paragraph search index using the publication dialect.
 *
 * Omission preserves [`super::search_index`] byte for byte. Explicit profiles
 * select the grammar before parsing, so cross-line inline constructs and
 * definition-list-shaped paragraphs have the same ownership as publication.
 *
 * # Errors
 * Rejects an unknown authoring profile before parsing the source.
 * @param {string} markdown
 * @param {string | null} [authoring_profile]
 * @returns {string}
 */
export function searchIndexProfiled(markdown, authoring_profile) {
    let deferred4_0;
    let deferred4_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.searchIndexProfiled(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
        var ptr3 = r0;
        var len3 = r1;
        if (r3) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(r2);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export3(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Compute a semantic AST diff and return its stable JSON contract.
 * @param {string} old_markdown
 * @param {string} new_markdown
 * @param {string | null} [old_name]
 * @param {string | null} [new_name]
 * @returns {string}
 */
export function semanticDiff(old_markdown, new_markdown, old_name, new_name) {
    let deferred5_0;
    let deferred5_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
        try {
            ptr0 = passStringToWasm0(old_markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(new_markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(old_name) ? 0 : passStringToWasm0(old_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(new_name) ? 0 : passStringToWasm0(new_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.semanticDiff(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred5_0 = r0;
        deferred5_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export3(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Compare two revisions using one captured authoring dialect.
 *
 * Both originals use the selected grammar and publication transforms. The
 * JSON schema and optional revision labels are unchanged; an omitted profile
 * preserves [`super::semantic_diff`] exactly.
 *
 * # Errors
 * Rejects an unknown authoring profile before parsing either revision.
 * @param {string} old_markdown
 * @param {string} new_markdown
 * @param {string | null} [old_name]
 * @param {string | null} [new_name]
 * @param {string | null} [authoring_profile]
 * @returns {string}
 */
export function semanticDiffProfiled(old_markdown, new_markdown, old_name, new_name, authoring_profile) {
    let deferred7_0;
    let deferred7_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
        try {
            ptr0 = passStringToWasm0(old_markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(new_markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(old_name) ? 0 : passStringToWasm0(old_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(new_name) ? 0 : passStringToWasm0(new_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.semanticDiffProfiled(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
        var ptr6 = r0;
        var len6 = r1;
        if (r3) {
            ptr6 = 0; len6 = 0;
            throw takeFromExternrefTable0(r2);
        }
        deferred7_0 = ptr6;
        deferred7_1 = len6;
        return getStringFromWasm0(ptr6, len6);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export3(deferred7_0, deferred7_1, 1);
    }
}

/**
 * Source-owned defaults for the ergonomic browser facade. Existing render
 * bindings still accept resolved options, so explicit `toc: false` is never
 * mistaken for an omitted host setting.
 * @param {string} markdown
 * @returns {string}
 */
export function sourceMetadata(markdown) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.sourceMetadata(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export3(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Verify the same configured layout used by single-document PDF publication.
 *
 * The first 36 arguments match `renderPdfConfiguredProfiled`; the final two
 * select the body baseline grid and Markdown authoring profile. PDF/A options
 * are intentionally absent: this is a layout and authoring audit, not PDF/A or
 * PDF/UA conformance certification. No PDF bytes are emitted.
 *
 * Returns the complete native verification JSON, including page text runs,
 * anchors, render warnings, parser findings and a digest of the report. Page
 * fitting uses the publication solver and reports the resulting page count;
 * a requested fit target is not a separate hard-cap admission policy here.
 * The report contains body text runs; running bands are admitted by the same
 * layout checks as publication, but are not included among those text runs.
 *
 * # Errors
 * Rejects invalid options and source/resource budgets before parsing, retains
 * typed strict-pagination failures, and refuses reports larger than 8 MiB of
 * UTF-8 JSON. All images and fonts come from the supplied byte arrays.
 * @param {string} markdown
 * @param {string | null | undefined} font
 * @param {string | null | undefined} dark_mode
 * @param {string | null | undefined} title
 * @param {string | null | undefined} author
 * @param {number | null | undefined} metadata_epoch_seconds
 * @param {boolean} allow_raw_html
 * @param {boolean} code_line_numbers
 * @param {string[]} image_destinations
 * @param {Uint8Array | number[]} image_bytes_flat
 * @param {Uint32Array | number[]} image_bytes_lengths
 * @param {Uint8Array | number[]} body_regular
 * @param {Uint8Array | number[]} body_bold
 * @param {Uint8Array | number[]} body_italic
 * @param {Uint8Array | number[]} body_bold_italic
 * @param {Uint8Array | number[]} mono_regular
 * @param {Uint32Array | number[]} font_weights
 * @param {number | null | undefined} base_font_size
 * @param {number | null | undefined} heading_scale
 * @param {number | null | undefined} table_font_size
 * @param {boolean} page_numbers
 * @param {number | null | undefined} font_scale
 * @param {string | null | undefined} lang
 * @param {boolean} toc
 * @param {number | null | undefined} toc_depth
 * @param {number | null | undefined} fit_to_pages
 * @param {boolean} microtype_protrusion
 * @param {Float64Array | number[]} page_geometry
 * @param {string[]} running_slots
 * @param {boolean} header_rule
 * @param {boolean} footer_rule
 * @param {boolean} skip_first_page
 * @param {string[]} running_image_destinations
 * @param {Uint32Array | number[]} running_image_positions
 * @param {Uint32Array | number[]} running_image_heights
 * @param {string | null} [typography]
 * @param {number | null} [baseline_grid_pt]
 * @param {string | null} [authoring_profile]
 * @returns {string}
 */
export function verifyPdfConfigured(markdown, font, dark_mode, title, author, metadata_epoch_seconds, allow_raw_html, code_line_numbers, image_destinations, image_bytes_flat, image_bytes_lengths, body_regular, body_bold, body_italic, body_bold_italic, mono_regular, font_weights, base_font_size, heading_scale, table_font_size, page_numbers, font_scale, lang, toc, toc_depth, fit_to_pages, microtype_protrusion, page_geometry, running_slots, header_rule, footer_rule, skip_first_page, running_image_destinations, running_image_positions, running_image_heights, typography, baseline_grid_pt, authoring_profile) {
    let deferred40_0;
    let deferred40_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        const val23 = +(isLikeNone(metadata_epoch_seconds) ? 0 : metadata_epoch_seconds);
        const val24 = +allow_raw_html;
        const val25 = +code_line_numbers;
        const val26 = +(isLikeNone(base_font_size) ? 0 : base_font_size);
        const val27 = +(isLikeNone(heading_scale) ? 0 : heading_scale);
        const val28 = +(isLikeNone(table_font_size) ? 0 : table_font_size);
        const val29 = +page_numbers;
        const val30 = +(isLikeNone(font_scale) ? 0 : font_scale);
        const val31 = +toc;
        const val32 = +(isLikeNone(toc_depth) ? Number.MAX_SAFE_INTEGER : (toc_depth) >>> 0);
        const val33 = +(isLikeNone(fit_to_pages) ? Number.MAX_SAFE_INTEGER : (fit_to_pages) >>> 0);
        const val34 = +microtype_protrusion;
        const val35 = +header_rule;
        const val36 = +footer_rule;
        const val37 = +skip_first_page;
        const val38 = +(isLikeNone(baseline_grid_pt) ? 0 : baseline_grid_pt);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, ptr14, len14, ptr15, len15, ptr16, len16, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20, ptr21, len21;
        try {
            ptr0 = passStringToWasm0(markdown, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(dark_mode) ? 0 : passStringToWasm0(dark_mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(title) ? 0 : passStringToWasm0(title, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(author) ? 0 : passStringToWasm0(author, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len4 = WASM_VECTOR_LEN;
            ptr5 = passArrayJsValueToWasm0(image_destinations, wasm.__wbindgen_export);
            len5 = WASM_VECTOR_LEN;
            ptr6 = passArray8ToWasm0(image_bytes_flat, wasm.__wbindgen_export);
            len6 = WASM_VECTOR_LEN;
            ptr7 = passArray32ToWasm0(image_bytes_lengths, wasm.__wbindgen_export);
            len7 = WASM_VECTOR_LEN;
            ptr8 = passArray8ToWasm0(body_regular, wasm.__wbindgen_export);
            len8 = WASM_VECTOR_LEN;
            ptr9 = passArray8ToWasm0(body_bold, wasm.__wbindgen_export);
            len9 = WASM_VECTOR_LEN;
            ptr10 = passArray8ToWasm0(body_italic, wasm.__wbindgen_export);
            len10 = WASM_VECTOR_LEN;
            ptr11 = passArray8ToWasm0(body_bold_italic, wasm.__wbindgen_export);
            len11 = WASM_VECTOR_LEN;
            ptr12 = passArray8ToWasm0(mono_regular, wasm.__wbindgen_export);
            len12 = WASM_VECTOR_LEN;
            ptr13 = passArray32ToWasm0(font_weights, wasm.__wbindgen_export);
            len13 = WASM_VECTOR_LEN;
            ptr14 = isLikeNone(lang) ? 0 : passStringToWasm0(lang, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len14 = WASM_VECTOR_LEN;
            ptr15 = passArrayF64ToWasm0(page_geometry, wasm.__wbindgen_export);
            len15 = WASM_VECTOR_LEN;
            ptr16 = passArrayJsValueToWasm0(running_slots, wasm.__wbindgen_export);
            len16 = WASM_VECTOR_LEN;
            ptr17 = passArrayJsValueToWasm0(running_image_destinations, wasm.__wbindgen_export);
            len17 = WASM_VECTOR_LEN;
            ptr18 = passArray32ToWasm0(running_image_positions, wasm.__wbindgen_export);
            len18 = WASM_VECTOR_LEN;
            ptr19 = passArray32ToWasm0(running_image_heights, wasm.__wbindgen_export);
            len19 = WASM_VECTOR_LEN;
            ptr20 = isLikeNone(typography) ? 0 : passStringToWasm0(typography, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len20 = WASM_VECTOR_LEN;
            ptr21 = isLikeNone(authoring_profile) ? 0 : passStringToWasm0(authoring_profile, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len21 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr21) { wasm.__wbindgen_export3(ptr21, len21 * 1, 1); }
            if (ptr20) { wasm.__wbindgen_export3(ptr20, len20 * 1, 1); }
            if (ptr19) { wasm.__wbindgen_export3(ptr19, len19 * 4, 4); }
            if (ptr18) { wasm.__wbindgen_export3(ptr18, len18 * 4, 4); }
            if (ptr17) { wasm.__wbindgen_export6(ptr17, len17); wasm.__wbindgen_export3(ptr17, len17 * 4, 4); }
            if (ptr16) { wasm.__wbindgen_export6(ptr16, len16); wasm.__wbindgen_export3(ptr16, len16 * 4, 4); }
            if (ptr15) { wasm.__wbindgen_export3(ptr15, len15 * 8, 8); }
            if (ptr14) { wasm.__wbindgen_export3(ptr14, len14 * 1, 1); }
            if (ptr13) { wasm.__wbindgen_export3(ptr13, len13 * 4, 4); }
            if (ptr12) { wasm.__wbindgen_export3(ptr12, len12 * 1, 1); }
            if (ptr11) { wasm.__wbindgen_export3(ptr11, len11 * 1, 1); }
            if (ptr10) { wasm.__wbindgen_export3(ptr10, len10 * 1, 1); }
            if (ptr9) { wasm.__wbindgen_export3(ptr9, len9 * 1, 1); }
            if (ptr8) { wasm.__wbindgen_export3(ptr8, len8 * 1, 1); }
            if (ptr7) { wasm.__wbindgen_export3(ptr7, len7 * 4, 4); }
            if (ptr6) { wasm.__wbindgen_export3(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_export6(ptr5, len5); wasm.__wbindgen_export3(ptr5, len5 * 4, 4); }
            if (ptr4) { wasm.__wbindgen_export3(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_export3(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.verifyPdfConfigured(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, !isLikeNone(metadata_epoch_seconds), val23, val24, val25, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11, ptr12, len12, ptr13, len13, !isLikeNone(base_font_size), val26, !isLikeNone(heading_scale), val27, !isLikeNone(table_font_size), val28, val29, !isLikeNone(font_scale), val30, ptr14, len14, val31, val32, val33, val34, ptr15, len15, ptr16, len16, val35, val36, val37, ptr17, len17, ptr18, len18, ptr19, len19, ptr20, len20, !isLikeNone(baseline_grid_pt), val38, ptr21, len21);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
        var ptr39 = r0;
        var len39 = r1;
        if (r3) {
            ptr39 = 0; len39 = 0;
            throw takeFromExternrefTable0(r2);
        }
        deferred40_0 = ptr39;
        deferred40_1 = len39;
        return getStringFromWasm0(ptr39, len39);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export3(deferred40_0, deferred40_1, 1);
    }
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_string_get_7ce8eee7fd327545: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_4c88d8bf264fd984: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_generic_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            table.set(0, undefined);
            table.set(1024, undefined);
            table.set(1025, null);
            table.set(1026, true);
            table.set(1027, false);
        },
    };
    return {
        __proto__: null,
        "./franken_markdown_bg.js": import0,
    };
}

const FmdBookFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fmdbook_free(ptr, 1));
const FmdFlowSessionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fmdflowsession_free(ptr, 1));
const FmdRenderResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fmdrenderresult_free(ptr, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__wbindgen_export5();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let cachedUint16ArrayMemory0 = null;
function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray16ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 2, 2) >>> 0;
    getUint16ArrayMemory0().set(arg, ptr / 2);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getFloat64ArrayMemory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__wbindgen_export4(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(bytes) {
    numBytesDecoded += bytes.length;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
        cachedTextDecoder.decode();
        numBytesDecoded = bytes.length;
    }
    return cachedTextDecoder.decode(bytes);
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedUint16ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

let __wbg_init_promise;
async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;
    if (__wbg_init_promise === undefined) {
        __wbg_init_promise = __wbg_init_once(module_or_path);
        __wbg_init_promise.catch(() => { __wbg_init_promise = undefined; });
    }
    return __wbg_init_promise;
}

async function __wbg_init_once(module_or_path) {

    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('franken_markdown_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
