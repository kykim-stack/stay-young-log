'use client';

import MyTimeline from '@/components/about/MyCareer';

export default function About() {
  return (
    <div className="max-w-2xl mx-auto py-24 px-6 font-serif animate-fade-in">
      <div className="flex flex-col gap-40">
        <section className="space-y-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 opacity-20 text-[10px] tracking-[0.4em] font-sans">
            <span className="w-8 h-px bg-current" />
            INTRODUCTION
          </div>

          <h1 className="text-4xl md:text-5xl font-medium leading-[1.4] tracking-tight break-keep">
            기록을 통해 어제의 나보다 <br />
            <span className="text-(--accent)">단단해지는</span> 과정에 있습니다.
          </h1>

          <div className="space-y-6 text-base md:text-lg opacity-60 leading-[1.8] font-sans">
            <p>
              안녕하세요, 프론트엔드 개발자 가영입니다. <br />
              단순히 기능을 만드는 것을 넘어, 그 과정에서 얻은 배움을{' '}
              <br className="hidden md:block" />
              정갈하게 정리하여 이곳에 보관하고 있습니다.
            </p>
          </div>

          <div className="pt-6 flex justify-center md:justify-start gap-10 font-sans">
            <a
              href="https://github.com/kikayoung"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[11px] tracking-widest opacity-40 hover:opacity-100 transition-all uppercase"
            >
              Github
            </a>
            <a
              href="mailto:kayoung7189@naver.com"
              className="group flex items-center gap-2 text-[11px] tracking-widest opacity-40 hover:opacity-100 transition-all uppercase"
            >
              Email
            </a>
          </div>
        </section>

        <section className="space-y-16">
          <div className="flex flex-col items-center gap-4 mb-8">
            <h2 className="text-[10px] tracking-[0.5em] opacity-30 font-sans font-bold uppercase">
              Tools & Craft
            </h2>
            <div className="w-px h-12 bg-(--vsc-border)/20" />
          </div>

          <div className="space-y-20">
            <div className="text-center space-y-6">
              <h3 className="text-sm font-bold text-(--accent) opacity-80 tracking-widest uppercase">
                Frontend
              </h3>
              <ul className="text-sm space-y-4 opacity-50 font-sans leading-relaxed">
                <li>React / Next.js 15</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
              </ul>
            </div>

            <div className="text-center space-y-6">
              <h3 className="text-sm font-bold text-(--accent) opacity-80 tracking-widest uppercase">
                Core & Data
              </h3>
              <ul className="text-sm space-y-4 opacity-50 font-sans leading-relaxed">
                <li>Supabase / PostgreSQL</li>
                <li>Notion API (CMS)</li>
                <li>Vercel / GitHub</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-16">
          <div className="flex flex-col items-center gap-4 mb-8">
            <h2 className="text-[10px] tracking-[0.5em] opacity-30 font-sans font-bold uppercase">
              Timeline
            </h2>
            <div className="w-px h-12 bg-(--vsc-border)/20" />
          </div>

          <div className="opacity-80 font-sans max-w-lg mx-auto overflow-hidden">
            <MyTimeline />
          </div>
        </section>

        <footer className="pt-20 border-t border-(--vsc-border)/10 text-center">
          <p className="text-sm opacity-30 italic font-serif">
            "기록은 흐릿한 기억보다 선명합니다."
          </p>
          <div className="mt-12 w-1.5 h-1.5 bg-(--accent) opacity-20 rotate-45 mx-auto" />
        </footer>
      </div>
    </div>
  );
}
