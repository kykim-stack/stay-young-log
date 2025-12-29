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
    <div className="flex flex-col lg:flex-row min-h-175 font-mono border border-(--vsc-border) rounded-sm overflow-hidden bg-(--background)">
      <aside className="lg:w-72 shrink-0 bg-(--vsc-tab) border-r border-(--vsc-border) flex flex-col">
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-bold opacity-60 uppercase tracking-widest">
            <span>Extensions: Categories</span>
            <span className="text-[14px] cursor-pointer">...</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Categories"
              className="w-full bg-(--background) border border-(--vsc-border) px-2 py-1 text-[12px] focus:outline-none focus:border-(--accent)"
              readOnly
            />
          </div>
        </div>

        <div className="grow overflow-y-auto">
          <div className="px-4 py-1 bg-(--vsc-border)/30 text-[11px] font-bold opacity-50 flex justify-between items-center">
            <span className="flex items-center gap-1">
              <span className="text-[10px]">⌄</span> INSTALLED
            </span>
            <span>{categories.length}</span>
          </div>

          <nav className="divide-y divide-(--vsc-border)/20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  w-full flex items-start gap-3 px-4 py-3 transition-all text-left group relative
                  ${
                    selectedCategory === cat
                      ? 'bg-(--background)'
                      : 'hover:bg-(--background)/40'
                  }
                `}
              >
                <div
                  className={`
                  w-10 h-10 shrink-0 rounded-sm border border-(--vsc-border) flex items-center justify-center text-lg
                  ${
                    selectedCategory === cat
                      ? 'bg-(--accent-soft)'
                      : 'bg-(--vsc-tab)'
                  }
                `}
                >
                  {cat === '전체' ? '📦' : '📁'}
                </div>

                <div className="min-w-0 py-0.5">
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[13px] font-bold truncate ${
                        selectedCategory === cat
                          ? 'text-(--accent)'
                          : 'text-(--foreground) opacity-80'
                      }`}
                    >
                      {cat}
                    </span>
                    {selectedCategory === cat && (
                      <span className="text-[#3794FF] text-[10px]">✔</span>
                    )}
                  </div>
                  <p className="text-[11px] opacity-40 line-clamp-1 italic">
                    category.{cat.toLowerCase()}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] opacity-30 font-medium">
                    <span>Young_Log</span>
                    <span className="flex items-center gap-0.5">★ 5.0</span>
                  </div>
                </div>

                {selectedCategory === cat && (
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-[#3794FF]" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <div className="grow flex flex-col">
        <div className="px-6 py-4 border-b border-(--vsc-border) bg-(--background) flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <span className="text-(--accent)">{selectedCategory}</span>
              <span className="opacity-20 text-sm font-normal">v1.0.0</span>
            </h1>
            <span className="px-2 py-0.5 bg-(--accent) text-white text-[10px] rounded-sm font-bold">
              Category
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs opacity-40 italic">
            <span>{filteredPosts.length} posts published</span>
          </div>
        </div>

        {/* 글 리스트 */}
        <div className="grow overflow-y-auto p-6 space-y-6">
          {filteredPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="flex items-start gap-6 group border-b border-(--vsc-border)/30 pb-6 last:border-0"
            >
              <div className="w-40 h-24 rounded-md border border-(--vsc-border) bg-(--vsc-tab) shrink-0 overflow-hidden relative">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] opacity-10 uppercase tracking-tighter italic">
                    {'<YOUNG_LOG />'}
                  </div>
                )}
                <div className="absolute bottom-1 right-1 px-1 bg-black/50 text-white text-[8px] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  PREVIEW
                </div>
              </div>

              <div className="grow py-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-black text-(--foreground) group-hover:text-(--accent) transition-colors">
                    {post.title}
                  </h2>
                  <span className="text-[11px] opacity-30 font-mono tracking-tighter">
                    {post.date}
                  </span>
                </div>

                <p className="text-sm text-(--foreground) opacity-50 line-clamp-2 leading-relaxed mb-3">
                  {post.description}
                </p>

                <div className="flex items-center gap-4 text-[11px]">
                  <button className="px-3 py-0.5 bg-[#007ACC] hover:bg-[#005fb8] text-white rounded-sm font-bold transition-colors">
                    Read Post
                  </button>
                  <span className="opacity-30 italic">published by @young</span>
                </div>
              </div>
            </Link>
          ))}

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center opacity-20 italic">
              // No posts installed in this category...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
