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
    <section className="xl:sticky xl:top-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-serif font-semibold">Document Preview</h2>
        <button
          onClick={onDownload}
          className="text-[13px] px-3 py-1.5 border border-[#333] rounded-[4px] bg-white hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Download
        </button>
      </div>

      <div className="bg-[#666] p-4 sm:p-6 rounded-lg">
        <div
          className="bg-white mx-auto min-h-[600px] p-6 sm:p-8 md:p-10"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        >
          <h1 className="text-[18px] sm:text-[20px] font-serif text-center mb-6 leading-tight">
            {title}
          </h1>

          <div className="text-[13px] sm:text-[14px] font-serif leading-[1.8] text-gray-700">
            <p className="mb-4">
              <strong>Abstract:</strong> Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>

            <p className="mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>

            <p className="mb-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>

            <p className="mb-4">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet.
            </p>

            <p className="mb-4">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur.
            </p>

            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
