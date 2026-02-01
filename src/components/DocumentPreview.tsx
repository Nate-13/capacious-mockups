"use client";

interface DocumentPreviewProps {
  title: string;
  onDownload?: () => void;
}

export default function DocumentPreview({
  title,
  onDownload,
}: DocumentPreviewProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[14px] font-semibold text-gray-700">Document Preview</h2>
        <button
          onClick={onDownload}
          className="text-[12px] px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Download
        </button>
      </div>

      {/* Document container - fills available space */}
      <div className="bg-[#4a4a4a] rounded-lg p-6 sm:p-8 min-h-[800px] flex justify-center">
        <div
          className="bg-white w-full max-w-[700px] p-10 sm:p-12"
          style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.25)" }}
        >
          <h1 className="text-[20px] font-serif text-center mb-6 leading-tight">
            {title}
          </h1>

          <div className="text-[14px] font-serif leading-[1.8] text-gray-700">
            <p className="mb-4">
              <strong>Abstract:</strong> Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>

            <h2 className="text-[16px] font-serif font-semibold mt-6 mb-3">
              1. Introduction
            </h2>

            <p className="mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>

            <p className="mb-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis.
            </p>

            <h2 className="text-[16px] font-serif font-semibold mt-6 mb-3">
              2. Methods
            </h2>

            <p className="mb-4">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>

            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
