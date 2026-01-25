import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] font-serif text-center px-6">
      <div className="absolute -z-10 text-[15vw] font-bold opacity-[0.02] select-none tracking-tighter pointer-events-none">
        空
      </div>

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex justify-center mb-12">
          <div className="w-12 h-px bg-(--accent) opacity-30" />
        </div>

        <h2 className="text-3xl md:text-4xl font-medium tracking-tight break-keep leading-tight">
          잠시 비어있는 <br />
          <span className="text-(--accent) opacity-80">기록의 자리</span>입니다.
        </h2>

        <p className="max-w-xs mx-auto text-sm md:text-base opacity-40 font-sans leading-relaxed break-keep">
          찾으시는 이야기가 이곳에 없거나 <br className="hidden sm:block" />
          다른 서가로 옮겨졌을 수 있습니다.
        </p>

        <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-8 font-sans">
          <Link
            href="/"
            className="group flex items-center gap-3 text-sm tracking-widest opacity-40 hover:opacity-100 transition-all"
          >
            <span className="w-8 h-px bg-current opacity-20 group-hover:w-12 transition-all" />
            처음으로 돌아가기
          </Link>

          <Link
            href="/blog"
            className="group flex items-center gap-3 text-sm tracking-widest opacity-40 hover:opacity-100 transition-all"
          >
            <span className="w-8 h-px bg-current opacity-20 group-hover:w-12 transition-all" />
            기록물 목록 보기
          </Link>
        </div>
      </div>

      <div className="mt-24 opacity-10 text-[10px] tracking-[0.8em] uppercase font-sans">
        Stay Young Archive
      </div>
    </div>
  );
}
