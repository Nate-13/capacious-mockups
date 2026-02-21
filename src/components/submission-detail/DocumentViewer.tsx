"use client";

import dynamic from "next/dynamic";
import { Submission, FileVersion } from "@/types";

const PDFViewer = dynamic(() => import("./PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="bg-white w-full max-w-[800px] shadow-xl animate-pulse rounded" />
  ),
});

const DocxViewer = dynamic(() => import("./DocxViewer"), {
  ssr: false,
  loading: () => (
    <div className="bg-white w-full max-w-[800px] shadow-xl animate-pulse rounded" />
  ),
});

interface DocumentViewerProps {
  submission: Submission;
  selectedFile: FileVersion | null;
}

function getExtension(url: string): string {
  return url.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
}

export default function DocumentViewer({
  submission,
  selectedFile,
}: DocumentViewerProps) {
  const url = selectedFile?.url;
  const ext = url ? getExtension(url) : null;

  return (
    <div className="bg-[#525252] rounded-lg p-6 flex justify-center h-full overflow-hidden relative">
      {url && ext === "pdf" && (
        <button
          onClick={() => window.open(url, "_blank")}
          title="Open in new tab"
          className="absolute top-3 right-3 z-10 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>
      )}

      {url && ext === "pdf" && <PDFViewer url={url} />}

      {url && ext === "docx" && <DocxViewer url={url} />}

      {url && ext !== "pdf" && ext !== "docx" && (
        <div className="bg-white w-full max-w-[800px] shadow-xl flex flex-col items-center justify-center gap-3 text-gray-500">
          <p className="text-sm">Preview not available for .{ext} files.</p>
          <a
            href={url}
            download={selectedFile?.filename}
            className="text-[13px] text-blue-600 underline"
          >
            Download {selectedFile?.filename}
          </a>
        </div>
      )}

      {!url && (
        <div className="bg-white w-full max-w-[800px] shadow-xl overflow-y-auto">
          <div className="p-10">
            <h1 className="text-[16px] font-serif font-bold text-center mb-6 leading-tight">
              {submission.title}
            </h1>

            <div className="text-[14px] font-serif leading-[1.9] text-gray-700">
              <p className="mb-5">
                <strong>Abstract:</strong> Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>

              <h2 className="text-[16px] font-serif font-semibold mt-6 mb-3">
                1. Introduction
              </h2>

              <p className="mb-5">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>

              <p className="mb-5">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae.
              </p>

              <h2 className="text-[16px] font-serif font-semibold mt-6 mb-3">
                2. Methods
              </h2>

              <p className="mb-5">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.
              </p>

              <h2 className="text-[16px] font-serif font-semibold mt-6 mb-3">
                3. Results
              </h2>

              <p className="mb-5">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
