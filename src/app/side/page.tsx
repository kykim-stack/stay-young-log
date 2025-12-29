import Link from 'next/link';

export default function Side() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] font-mono p-6">
      <div className="w-full max-w-2xl bg-(--vsc-tab) border border-(--vsc-border) shadow-2xl rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-(--background) border-b border-(--vsc-border) flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[11px] opacity-40 ml-2">
            zsh — side-project
          </span>
        </div>

        <div className="p-8 text-left space-y-4">
          <div className="flex gap-2">
            <span className="text-[#4EC9B0]">➔</span>
            <span className="text-[#569CD6]">~/stay-young-log</span>
            <span className="text-[#CE9178]">git(side-project)</span>
          </div>

          <div className="space-y-2">
            <p className="text-(--foreground) opacity-90 animate-pulse">
              $ npm run build:ideas
            </p>
            <p className="text-[#6A9955]">
              [WAIT] Compiling new side projects...
            </p>
            <p className="text-[#6A9955]">
              [INFO] Current status:{' '}
              <span className="text-[#DCDCAA]">"Still Dreaming"</span>
            </p>
            <p className="text-[#6A9955]">
              [WARN] No project metadata found. Ideas are still loading in the
              brain.
            </p>
          </div>

          <div className="pt-8 border-t border-(--vsc-border) mt-8">
            <p className="text-sm opacity-60 mb-6 leading-relaxed">
              이 브랜치에는 아직 공개된 작업물이 없습니다. <br />
              멋진 프로젝트를 들고 조만간 커밋하러 올게요! 😊
            </p>

            <Link
              href="/"
              className="inline-block px-6 py-2 bg-[#007ACC] hover:bg-[#005A9E] text-white text-xs font-bold transition-all rounded-sm shadow-md"
            >
              git checkout main (홈으로 이동)
            </Link>
          </div>
        </div>
      </div>

      <h1 className="absolute -z-10 text-[15vw] font-black opacity-[0.02] select-none tracking-tighter whitespace-nowrap">
        LOADING IDEAS
      </h1>
    </div>
  );
}
