import { getAllPosts } from '@/lib/posts';
import BlogList from './BlogList';

export const revalidate = 60;

export default async function BlogPage() {
  const allPosts = await getAllPosts();

  return (
    <main className="w-full py-12 animate-fade-in font-serif">
      <header className="px-6 md:px-0 mb-20 space-y-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 opacity-30 text-[10px] tracking-[0.4em] font-sans">
            <span className="w-8 h-px bg-current" />
            COLLECTED RECORDS
          </div>

          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-(--foreground)">
            기록의 <span className="text-(--accent) opacity-80">숲</span>
          </h1>

          <p className="max-w-2xl text-base opacity-40 font-sans leading-relaxed pt-2">
            배움의 흔적과 일상의 사유를 차곡차곡 쌓아두었습니다. <br />
            천천히 서가를 거닐며 필요한 문장을 찾아보세요.
          </p>
        </div>

        <div className="flex items-center gap-6 pt-6 border-t border-(--vsc-border)/10 text-[11px] font-sans tracking-widest opacity-30">
          <div className="flex items-center gap-2">
            <span className="font-bold">총 기록</span>
            <span className="text-(--accent)">{allPosts.length}수</span>
          </div>
          <div className="w-px h-3 bg-current opacity-20" />
          <div className="flex items-center gap-2 uppercase">
            <span>Last Updated</span>
            <span>2026 / 01</span>
          </div>
        </div>
      </header>

      <section className="mt-12">
        <BlogList allPosts={allPosts} />
      </section>

      <footer className="mt-32 py-10 text-center">
        <div className="w-1.5 h-1.5 bg-(--accent) opacity-20 rotate-45 mx-auto" />
      </footer>
    </main>
  );
}
