import React from 'react';
import { notFound } from 'next/navigation';
import RightBar from '@/components/blog/RightBar';
import { getPostData } from '@/lib/posts';
import { getToc } from '@/lib/toc';

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}
export default async function BlogDetailLayout({
  children,
  params,
}: BlogLayoutProps) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  if (!postData) return notFound();
  const toc = getToc(postData.content);

  return (
    <div className="flex w-full min-h-screen bg-(--background)">
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-(--background)">
        <div className="max-w-5xl mx-auto p-6 md:p-16 pb-32 w-full">
          {children}
        </div>
      </main>
      <div className="hidden xl:block shrink-0 h-full sticky top-0 border-l border-(--vsc-border)/30">
        <RightBar
          slug={slug}
          toc={toc}
          category={postData.category}
          tags={postData.tags}
        />
      </div>
    </div>
  );
}
