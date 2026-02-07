"use client";

import { Submission, FileVersion } from "@/types";

interface DocumentViewerProps {
  submission: Submission;
  selectedFile: FileVersion | null;
}

export default function DocumentViewer({
  submission,
  selectedFile,
}: DocumentViewerProps) {
  return (
    <div className="bg-[#525252] rounded-lg p-6 flex justify-center h-full overflow-hidden">
      <div className="bg-white w-full max-w-[800px] shadow-xl overflow-y-auto">
        <div className="p-10">
          <h1 className="text-[16px] font-serif font-bold text-center mb-6 leading-tight">
            {submission.title}
          </h1>

          <div className="text-[14px] font-serif leading-[1.9] text-gray-700">
            <p className="mb-5">
              <strong>Abstract:</strong> Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>

            <h2 className="text-[16px] font-serif font-semibold mt-6 mb-3">
              1. Introduction
            </h2>

            <p className="mb-5">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>

            <p className="mb-5">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae.
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
    </div>
  );
}
