import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] font-mono">
      <div className="w-full max-w-md bg-(--vsc-tab) border border-(--vsc-border) shadow-xl rounded-lg overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="px-4 py-2 bg-(--background) border-b border-(--vsc-border) flex justify-between items-center">
          <span className="text-xs font-bold text-[#CD3131]">Error: 404</span>
          <span className="opacity-40 text-xs">NotFound.js</span>
        </div>

        <div className="p-8 text-left">
          <h2 className="text-[#0000FF] dark:text-[#569CD6] font-bold text-lg mb-4">
            throw new Error("PageNotFound");
          </h2>

          <div className="space-y-2 opacity-70 text-sm leading-relaxed">
            <p className="text-[#008000] dark:text-[#6A9955]">
              // 찾으시는 페이지가 존재하지 않거나
            </p>
            <p className="text-[#008000] dark:text-[#6A9955]">
              // 이동되었을 수 있습니다.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-(--vsc-border) flex flex-col gap-3">
            <Link
              href="/"
              className="w-full text-center py-2 bg-[#007ACC] hover:bg-[#005A9E] text-white font-bold text-xs transition-colors rounded-sm"
            >
              cd .. && npm start (홈으로 이동)
            </Link>
            <Link
              href="/blog"
              className="w-full text-center py-2 border border-[#007ACC] text-[#007ACC] dark:border-[#3794FF] dark:text-[#3794FF] font-bold text-xs hover:bg-[#007ACC] hover:text-white dark:hover:bg-[#3794FF] transition-all rounded-sm"
            >
              ls ./src/blog (글 목록 보기)
            </Link>
          </div>
        </div>
      </div>

      <h1 className="absolute -z-10 text-[20vw] font-black opacity-[0.03] select-none tracking-tighter">
        NOT FOUND
      </h1>
    </div>
  );
}
