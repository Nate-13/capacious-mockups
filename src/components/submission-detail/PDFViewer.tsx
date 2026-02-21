"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Use unpkg CDN for the worker — avoids webpack config complexity
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return (
      <div className="bg-white w-full max-w-[800px] shadow-xl flex items-center justify-center p-10 text-gray-400 text-sm">
        Failed to load PDF.
      </div>
    );
  }

  return (
    <div className="overflow-y-auto w-full flex flex-col items-center gap-4 py-2">
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={() => setError("load error")}
        loading={
          <div className="bg-white w-[760px] h-[1000px] shadow-xl animate-pulse rounded" />
        }
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={i + 1}
            pageNumber={i + 1}
            width={760}
            className="shadow-xl mb-4 rounded"
            renderAnnotationLayer={true}
            renderTextLayer={true}
          />
        ))}
      </Document>
    </div>
  );
}
