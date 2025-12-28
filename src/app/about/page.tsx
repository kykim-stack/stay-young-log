export default function About() {
  return (
    <div className="py-24 animate-fade-in max-w-2xl">
      <h1 className="text-3xl md:text-5xl font-black mb-10 tracking-tight leading-tight text-(--foreground)">
        안녕하세요, <br />
        <span className="text-(--accent)">가영(Young)</span>입니다.
      </h1>

      <div className="space-y-6 text-base md:text-lg text-(--foreground) opacity-80 leading-relaxed font-medium mb-12">
        <p>오늘의 나를 더 성장하게 만들어 나가는 과정을 좋아합니다.</p>
        <p className="opacity-60 text-sm md:text-base">
          React와 TypeScript를 주로 사용하는 프론트엔드 개발자입니다.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <a
          href="https://github.com/kikayoung"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-(--accent) text-(--background) rounded-full font-black hover:scale-105 transition-all shadow-lg shadow-(--accent)/20"
        >
          GITHUB
        </a>
        {/* <a
          href="https://linkedin.com/..."// 링크드인 없음ㅜㅜ
          className="px-5 py-2 border border-gray-200 rounded-full text-sm hover:bg-gray-50 transition-all"
        >
          LinkedIn
        </a> */}
        <a
          href="mailto:kayoung7189@naver.com"
          className="px-8 py-3 border-2 border-(--accent) text-(--accent) rounded-full font-black hover:bg-(--accent) hover:text-(--background) transition-all"
        >
          EMAIL
        </a>
      </div>
      <div className="mt-32 border-t border-(--accent)/10 dark:border-white/10" />
    </div>
  );
}
