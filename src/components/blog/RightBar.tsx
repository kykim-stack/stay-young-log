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
        .replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣-]/g, '')
        .replace(/-+/g, '-')
    );
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    title: string,
  ) => {
    e.preventDefault();

    const cleanTitle = title.replace(/\*\*/g, '').trim();
    const headers = Array.from(
      document.querySelectorAll('article h2, article h3'),
    );
    const targetElement = headers.find(
      (h) => h.textContent?.replace(/\*\*/g, '').trim() === cleanTitle,
    ) as HTMLElement;

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      targetElement.classList.remove('highlight-active');
      setTimeout(() => targetElement.classList.add('highlight-active'), 300);
      window.history.pushState(null, '', `#${localSlugify(title)}`);
    }
  };

  return (
    <aside className="w-56 shrink-0 hidden xl:flex flex-col select-none py-12 sticky top-32 h-fit font-serif">
      <nav className="space-y-3 mb-20">
        <h2 className="text-[10px] tracking-[0.4em] opacity-20 uppercase font-sans mb-8">
          Outline
        </h2>
        {toc.length > 0 ? (
          toc.map((item, index) => (
            <a
              key={index}
              href={`#${localSlugify(item.title)}`}
              onClick={(e) => handleScroll(e, item.title)}
              className={`block transition-colors duration-500 break-keep leading-snug
                ${item.depth > 2 ? 'text-[11px] opacity-20 pl-4' : 'text-[12px] opacity-40'}
                hover:opacity-100 hover:text-(--accent)
              `}
            >
              {item.title.replace(/\*\*/g, '')}
            </a>
          ))
        ) : (
          <p className="text-[11px] opacity-10 italic">무제.</p>
        )}
      </nav>

      <div className="space-y-12">
        <div className="space-y-2">
          <span className="text-[10px] opacity-20 font-sans tracking-widest uppercase">
            Category
          </span>
          <p className="text-[12px] opacity-40 text-(--accent) cursor-pointer hover:opacity-100 transition-opacity">
            {category}
          </p>
        </div>

        <div className="space-y-4">
          <span className="text-[10px] opacity-20 font-sans tracking-widest uppercase">
            Keywords
          </span>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {tags?.map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/blog?tag=${tag}`)}
                className="text-[11px] opacity-30 hover:opacity-100 hover:text-(--accent) transition-all italic"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 pt-12 border-t border-(--vsc-border)/5">
        <div className="text-[9px] opacity-10 tracking-[0.5em] uppercase font-sans leading-loose">
          Young Log <br /> Archive
        </div>
      </div>
    </aside>
  );
}
