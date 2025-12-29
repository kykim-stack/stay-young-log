export default function About() {
  return (
    <div className="py-12 animate-fade-in max-w-4xl mx-auto font-mono">
      <div className="px-4">
        <section className="mb-16">
          <div className="flex items-center gap-2 text-[#0000FF] dark:text-[#569CD6] mb-4 opacity-50">
            <span className="text-xl">#</span>
            <span className="text-xs font-bold tracking-widest">
              INTRODUCTION
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-8 tracking-tight leading-tight text-(--foreground)">
            안녕하세요, <br />
            <span className="text-(--accent)">가영(Young)</span>입니다.
            <span className="animate-pulse">_</span>
          </h1>

          <div className="space-y-6 text-base md:text-lg text-(--foreground) opacity-80 leading-relaxed max-w-2xl border-l-4 border-(--vsc-border) pl-6 py-2 italic">
            <p>“오늘의 나를 더 성장하게 만들어 나가는 과정을 좋아합니다.”</p>
            <p className="not-italic opacity-60 text-sm md:text-base">
              React와 TypeScript를 주로 사용하는 프론트엔드 개발자입니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            <a
              href="https://github.com/kikayoung"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-[#007ACC] text-white font-bold text-sm hover:brightness-110 transition-all rounded-sm flex items-center gap-2"
            >
              <span>$</span> git checkout github
            </a>
            {/* <a
          href="https://linkedin.com/..."// 링크드인 없음ㅜㅜ
          className="px-5 py-2 border border-gray-200 rounded-full text-sm hover:bg-gray-50 transition-all"
        >
          LinkedIn
        </a> */}
            <a
              href="mailto:kayoung7189@naver.com"
              className="px-6 py-2 border border-[#007ACC] text-[#007ACC] dark:border-[#3794FF] dark:text-[#3794FF] font-bold text-sm hover:bg-[#007ACC] hover:text-white transition-all rounded-sm"
            >
              mailto:kayoung7189@naver.com
            </a>
          </div>
        </section>
        <section className="mt-32">
          <div className="flex items-center gap-2 text-[#0000FF] dark:text-[#569CD6] mb-6 opacity-50">
            <span className="text-xl">##</span>
            <span className="text-xs font-bold tracking-widest">
              ABOUT_THIS_LOG.json
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 bg-(--vsc-tab) p-8 rounded-lg border border-(--vsc-border)">
            {[
              {
                label: 'Core',
                desc: 'Next.js 15와 TypeScript를 기반으로 제작되었으며, ISR 방식을 통해 60초마다 노션의 새로운 데이터를 동기화합니다.',
              },
              {
                label: 'Database',
                desc: 'Notion API를 CMS로 사용하여 효율적인 콘텐츠 관리가 가능하며, 노션의 자유로운 편집 기능을 담았습니다.',
              },
              {
                label: 'Comments',
                desc: 'Supabase Realtime을 활용하여 댓글 시스템을 직접 구축했습니다. 실시간 소통과 커스텀 UI를 제공합니다.',
              },
              {
                label: 'Deployment',
                desc: 'Vercel을 통해 자동 배포 환경을 구축하였으며, Env 관리를 통해 보안성을 높였습니다.',
              },
            ].map((item) => (
              <div key={item.label} className="space-y-3">
                <h3 className="font-bold text-[#DCDCAA] text-sm flex items-center gap-2">
                  <span className="text-[#CE9178]">"</span>
                  {item.label}
                  <span className="text-[#CE9178]">"</span>:
                </h3>
                <p className="text-sm opacity-70 leading-relaxed pl-4 border-l border-[#404040]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-32 opacity-20 text-center text-xs tracking-[0.5em]">
          EOF (End of File)
        </div>
      </div>
    </div>
  );
}
