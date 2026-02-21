"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Submission, FileVersion } from "@/types";
import ViewerToolbar from "./ViewerToolbar";
import { useViewerKeyboard } from "./useViewerKeyboard";

const PDFViewer = dynamic(() => import("./PDFViewer"), {
  ssr: false,
  loading: () => null,
});

const DocxViewer = dynamic(() => import("./DocxViewer"), {
  ssr: false,
  loading: () => null,
});

interface DocumentViewerProps {
  submission: Submission;
  selectedFile: FileVersion | null;
}

function getExtension(url: string): string {
  return url.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
}

type LoadingState = "loading" | "ready" | "error";

export default function DocumentViewer({
  submission,
  selectedFile,
}: DocumentViewerProps) {
  const url = selectedFile?.url;
  const ext = url ? getExtension(url) : null;

  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [retryKey, setRetryKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset state on file change (synchronous in render to avoid cascading effects)
  const [prevFileId, setPrevFileId] = useState(selectedFile?.id);
  if (selectedFile?.id !== prevFileId) {
    setPrevFileId(selectedFile?.id);
    setZoomLevel(1.0);
    setCurrentPage(1);
    setTotalPages(0);
    setLoadingState("loading");
  }

  // Zoom helpers
  const zoomIn = useCallback(() => {
    setZoomLevel((z) => Math.min(2.0, Math.round((z + 0.1) * 10) / 10));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel((z) => Math.max(0.5, Math.round((z - 0.1) * 10) / 10));
  }, []);

  const fitToWidth = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    // Account for padding (48px = py-6 on each side roughly, plus some margin)
    const availableWidth = containerWidth - 48;
    const fitZoom = Math.min(2.0, Math.max(0.5, availableWidth / 760));
    setZoomLevel(Math.round(fitZoom * 10) / 10);
  }, []);

  // Page navigation for PDF
  const goToPage = useCallback((page: number) => {
    if (!scrollContainerRef.current) return;
    setCurrentPage(page);
    const target = scrollContainerRef.current.querySelector(
      `[data-page-number="${page}"]`,
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  }, [currentPage, totalPages, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  // Pinch-to-zoom (trackpad ctrl+wheel & touch pinch)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || !url) return;

    function handleWheel(e: WheelEvent) {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const delta = -e.deltaY;
      setZoomLevel((z) => {
        const next = z + delta * 0.005;
        return Math.min(2.0, Math.max(0.5, Math.round(next * 100) / 100));
      });
    }

    let startDistance = 0;
    let startZoom = 1;

    function getDistance(touches: TouchList) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.hypot(dx, dy);
    }

    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length === 2) {
        startDistance = getDistance(e.touches);
        startZoom = zoomLevel;
      }
    }

    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = getDistance(e.touches);
        const scale = dist / startDistance;
        const next = startZoom * scale;
        setZoomLevel(
          Math.min(2.0, Math.max(0.5, Math.round(next * 100) / 100)),
        );
      }
    }

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [url, zoomLevel]);

  // Keyboard shortcuts
  useViewerKeyboard({
    enabled: !!url,
    onZoomIn: zoomIn,
    onZoomOut: zoomOut,
    onNextPage: ext === "pdf" ? nextPage : undefined,
    onPrevPage: ext === "pdf" ? prevPage : undefined,
  });

  // Callbacks for child viewers
  const handlePdfLoadSuccess = useCallback(
    (numPages: number) => {
      setTotalPages(numPages);
      setLoadingState("ready");
      fitToWidth();
    },
    [fitToWidth],
  );

  const handleDocxLoadSuccess = useCallback(() => {
    setLoadingState("ready");
    fitToWidth();
  }, [fitToWidth]);

  const handleLoadError = useCallback(() => {
    setLoadingState("error");
  }, []);

  const handleCurrentPageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleRetry = () => {
    setLoadingState("loading");
    setRetryKey((k) => k + 1);
  };

  const showToolbar = url && (ext === "pdf" || ext === "docx");

  return (
    <div
      ref={containerRef}
      className="rounded-lg flex flex-col h-full overflow-hidden relative bg-[#5c5c5c]"
    >
      {/* Toolbar */}
      {showToolbar && (
        <ViewerToolbar
          filename={selectedFile!.filename}
          fileType={ext as "pdf" | "docx"}
          url={url!}
          zoomLevel={zoomLevel}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onFitToWidth={fitToWidth}
          currentPage={ext === "pdf" ? currentPage : undefined}
          totalPages={ext === "pdf" ? totalPages : undefined}
          onPageChange={ext === "pdf" ? goToPage : undefined}
        />
      )}

      {/* Scroll area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-auto flex justify-center"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <AnimatePresence mode="wait">
          {url && ext === "pdf" && (
            <motion.div
              key={`pdf-${url}-${retryKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center"
              style={{
                transform: zoomLevel !== 1 ? `scale(${zoomLevel})` : undefined,
                transformOrigin: "top center",
              }}
            >
              <PDFViewer
                url={url}
                onLoadSuccess={handlePdfLoadSuccess}
                onLoadError={handleLoadError}
                onCurrentPageChange={handleCurrentPageChange}
                scrollContainerRef={scrollContainerRef}
              />
            </motion.div>
          )}

          {url && ext === "docx" && (
            <motion.div
              key={`docx-${url}-${retryKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center"
            >
              <DocxViewer
                url={url}
                zoomLevel={zoomLevel}
                onLoadSuccess={handleDocxLoadSuccess}
                onLoadError={handleLoadError}
              />
            </motion.div>
          )}

          {url && ext !== "pdf" && ext !== "docx" && (
            <motion.div
              key={`unsupported-${url}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center h-full"
            >
              <div className="bg-white w-full max-w-[800px] shadow-xl flex flex-col items-center justify-center gap-3 text-gray-500 p-10 rounded">
                <p className="text-sm">
                  Preview not available for .{ext} files.
                </p>
                <a
                  href={url}
                  download={selectedFile?.filename}
                  className="text-[13px] text-blue-600 underline"
                >
                  Download {selectedFile?.filename}
                </a>
              </div>
            </motion.div>
          )}

          {!url && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center"
            >
              <div className="bg-white w-full max-w-[800px] shadow-xl overflow-y-auto">
                <div className="p-10">
                  <h1 className="text-[16px] font-serif font-bold text-center mb-6 leading-tight">
                    {submission.title}
                  </h1>
                  <div className="text-[14px] font-serif leading-[1.9] text-gray-700">
                    <p className="mb-5">
                      <strong>Abstract:</strong> Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h2 className="text-[16px] font-serif font-semibold mt-6 mb-3">
                      1. Introduction
                    </h2>
                    <p className="mb-5">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="mb-5">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae.
                    </p>
                    <h2 className="text-[16px] font-serif font-semibold mt-6 mb-3">
                      2. Methods
                    </h2>
                    <p className="mb-5">
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                      aut odit aut fugit, sed quia consequuntur magni dolores
                      eos qui ratione voluptatem sequi nesciunt.
                    </p>
                    <h2 className="text-[16px] font-serif font-semibold mt-6 mb-3">
                      3. Results
                    </h2>
                    <p className="mb-5">
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti atque
                      corrupti quos dolores et quas molestias excepturi sint
                      occaecati cupiditate.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error overlay */}
      {loadingState === "error" && url && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/30 rounded-lg gap-3">
          <p className="text-white/70 text-sm">Failed to load document.</p>
          <button
            onClick={handleRetry}
            className="px-4 py-1.5 text-sm bg-white/20 hover:bg-white/30 text-white rounded-md transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
