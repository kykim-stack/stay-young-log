'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BlogList({ allPosts = [] }: { allPosts: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 카테고리 목록
  const categories = [
    '전체',
    ...Array.from(
      new Set(allPosts.map((post) => post.category).filter(Boolean)),
    ),
  ];

  const filteredPosts =
    selectedCategory === '전체'
      ? allPosts
      : allPosts.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto py-10 font-serif min-h-screen">
      <header className="mb-20 space-y-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-medium tracking-tight">기록물 목록</h1>
          <p className="text-sm opacity-40 font-sans italic">
            시절의 배움과 생각을 차곡차곡 모아두었습니다.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-4 border-b border-(--vsc-border)/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm font-sans tracking-widest transition-all relative pb-1
                ${
                  selectedCategory === cat
                    ? 'text-(--accent) opacity-100 font-bold'
                    : 'opacity-30 hover:opacity-60'
                }
              `}
            >
              {cat}
              {selectedCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-(--accent)" />
              )}
            </button>
          ))}
        </nav>
      </header>

      <div className="space-y-24">
        {filteredPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="group block"
          >
            <article className="flex flex-col md:flex-row gap-10 items-start md:items-center">
              <div className="w-full md:w-56 aspect-[4/3] shrink-0 overflow-hidden border border-(--vsc-border)/20 bg-(--vsc-tab)/10">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] opacity-10 font-sans tracking-widest">
                    NO IMAGE
                  </div>
                )}
              </div>

              <div className="grow space-y-4">
                <div className="flex items-center gap-3 text-[10px] tracking-widest text-(--accent) opacity-60 font-sans font-bold uppercase">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-current rounded-full opacity-30" />
                  <span>{post.category}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-medium group-hover:text-(--accent) transition-colors break-keep leading-snug">
                  {post.title}
                </h2>

                <p className="text-sm opacity-40 font-sans line-clamp-2 leading-relaxed max-w-xl">
                  {post.description}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-sans tracking-widest opacity-20 group-hover:opacity-100 group-hover:text-(--accent) transition-all border-b border-transparent group-hover:border-current pb-0.5">
                    READ RECORD —
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}

        {filteredPosts.length === 0 && (
          <div className="py-40 text-center opacity-20 font-serif italic text-lg">
            해당 분류에는 아직 남겨진 기록이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
