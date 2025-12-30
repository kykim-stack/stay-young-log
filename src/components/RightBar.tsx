'use client';

import { useRouter } from 'next/navigation';

export default function RightBar({
  slug,
  toc,
  category,
  tags,
}: {
  slug: string;
  toc: any[];
  category: string;
  tags: string[];
}) {
  const router = useRouter();

  const localSlugify = (text: string) => {
    return (
      text
        .toLowerCase()
        .trim()
        .replace(/\*\*/g, '')
        .replace(/\s+/g, '-')
        // 한글, 영문, 숫자, 하이픈만 남기고 싹 제거 (정규식 순서 중요!)
        .replace(/[^a-z0-9ㄱ-ㅎㅏ-ㅣ가-힣-]/g, '')
        .replace(/-+/g, '-')
    );
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    title: string,
  ) => {
    e.preventDefault();

    const cleanTitle = title.replace(/\*\*/g, '').trim();
    const targetId = localSlugify(title);

    const headers = Array.from(
      document.querySelectorAll('article h2, article h3'),
    );
    const targetElement = headers.find(
      (h) => h.textContent?.replace(/\*\*/g, '').trim() === cleanTitle,
    ) as HTMLElement;

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // 하이라이트 효과 적용
      // 기존에 붙어있던 클래스가 있다면 제거 (중복 방지)
      targetElement.classList.remove('highlight-active');

      setTimeout(() => {
        targetElement.classList.add('highlight-active');
      }, 300);

      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <aside className="w-80 shrink-0 border-l border-(--vsc-border) bg-(--background) hidden xl:flex flex-col h-screen sticky top-0 select-none overflow-y-auto custom-scrollbar tracking-tight">
      <section className="p-6 space-y-4">
        <h2 className="text-[14px] text-(--foreground) opacity-40 font-bold font-sans uppercase tracking-widest">
          Outline
        </h2>
        <div className="space-y-2.5 text-[13px] font-sans">
          {toc.length > 0 ? (
            toc.map((item, index) => {
              const cleanTitle = item.title.replace(/\*\*/g, '');

              return (
                <a
                  key={index}
                  href={`#${localSlugify(item.title)}`}
                  onClick={(e) => handleScroll(e, item.title)}
                  className="block text-(--foreground) opacity-60 hover:opacity-100 hover:text-(--accent) transition-all truncate leading-snug"
                  style={{ paddingLeft: `${(item.depth - 1) * 12}px` }}
                >
                  {cleanTitle}
                </a>
              );
            })
          ) : (
            <p className="opacity-30 italic font-mono text-[12px]">
              No headers found
            </p>
          )}
        </div>
      </section>

      <hr className="border-(--vsc-border)/30 w-full shrink-0" />

      <section className="p-6 space-y-4 shrink-0">
        <h2 className="text-[14px] text-(--foreground) opacity-40 font-bold font-sans uppercase tracking-widest">
          Metadata
        </h2>
        <div className="space-y-3.5 text-[13px]">
          <div className="grid grid-cols-[100px_1fr] gap-3 items-center text-[12px]">
            <span className="text-(--foreground) font-semibold font-sans opacity-80">
              Identifier
            </span>
            <span className="text-(--foreground) opacity-50 font-mono text-[11px] truncate">
              young.{slug}
            </span>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-3 items-center text-[12px]">
            <span className="text-(--foreground) font-semibold font-sans opacity-80">
              Category
            </span>
            <span className="text-[#3794FF] font-sans hover:underline cursor-pointer">
              {category}
            </span>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-3 items-center text-[12px]">
            <span className="text-(--foreground) font-semibold font-sans opacity-80">
              Version
            </span>
            <span className="text-(--foreground) opacity-50 font-mono text-[11px]">
              1.0.4
            </span>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-3 items-center text-[12px]">
            <span className="text-(--foreground) font-semibold font-sans opacity-80">
              Size
            </span>
            <span className="text-[#3794FF] font-mono text-[11px] hover:underline cursor-pointer">
              128.45KB
            </span>
          </div>
        </div>
      </section>

      <hr className="border-(--vsc-border)/30 w-full shrink-0" />
      <section className="p-6 space-y-4 pb-12 shrink-0">
        <h2 className="text-[14px] text-(--foreground) opacity-40 font-bold font-sans uppercase tracking-widest">
          Keywords
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {tags && tags.length > 0 ? (
            tags.map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/blog?tag=${tag}`)}
                className="px-2 py-0.5 bg-(--vsc-border)/40 text-(--foreground) opacity-70 text-[10px] rounded-sm border border-(--vsc-border) hover:border-(--accent) hover:text-(--accent) transition-all"
              >
                tag:{tag}
              </button>
            ))
          ) : (
            <span className="text-[10px] opacity-30 italic px-2">
              No keywords.
            </span>
          )}
        </div>
      </section>
    </aside>
  );
}
