"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PAGE_WIDTH = 760;

interface PDFViewerProps {
  url: string;
  onLoadSuccess: (numPages: number) => void;
  onLoadError: () => void;
  onCurrentPageChange: (page: number) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function PDFViewer({
  url,
  onLoadSuccess,
  onLoadError,
  onCurrentPageChange,
  scrollContainerRef,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  function handleDocLoadSuccess({ numPages: n }: { numPages: number }) {
    setNumPages(n);
    onLoadSuccess(n);
  }

  // IntersectionObserver to track the most-visible page
  useEffect(() => {
    if (numPages === 0 || !scrollContainerRef.current) return;

    const visibilityMap = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const pageNum = Number(
            (entry.target as HTMLElement).dataset.pageNumber,
          );
          visibilityMap.set(pageNum, entry.intersectionRatio);
        }

        let maxRatio = 0;
        let mostVisible = 1;
        for (const [page, ratio] of visibilityMap) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = page;
          }
        }
        onCurrentPageChange(mostVisible);
      },
      {
        root: scrollContainerRef.current,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const [, el] of pageRefs.current) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [numPages, scrollContainerRef, onCurrentPageChange]);

  const setPageRef = useCallback(
    (pageNum: number, el: HTMLDivElement | null) => {
      if (el) {
        pageRefs.current.set(pageNum, el);
      } else {
        pageRefs.current.delete(pageNum);
      }
    },
    [],
  );

  return (
    <div className="w-full flex flex-col items-center gap-4 py-6">
      <Document
        file={url}
        onLoadSuccess={handleDocLoadSuccess}
        onLoadError={onLoadError}
        loading={
          <div
            className="bg-white rounded shadow-xl animate-pulse"
            style={{ width: PAGE_WIDTH, aspectRatio: "8.5/11" }}
          />
        }
      >
        {Array.from({ length: numPages }, (_, i) => {
          const pageNum = i + 1;
          return (
            <div
              key={pageNum}
              ref={(el) => setPageRef(pageNum, el)}
              data-page-number={pageNum}
              className="mb-4"
            >
              <Page
                pageNumber={pageNum}
                width={PAGE_WIDTH}
                className="shadow-xl rounded"
                renderAnnotationLayer={true}
                renderTextLayer={true}
                loading={
                  <div
                    className="bg-white rounded shadow-xl animate-pulse"
                    style={{ width: PAGE_WIDTH, aspectRatio: "8.5/11" }}
                  />
                }
              />
            </div>
          );
        })}
      </Document>
    </div>
  );
}
