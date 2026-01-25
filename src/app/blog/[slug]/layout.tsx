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
    <div className="flex w-full min-h-screen justify-center bg-(--background) px-4">
      <div className="flex w-full max-w-7xl justify-center gap-10">
        <main className="w-full max-w-4xl min-w-0 py-10 md:py-20">
          <div className="pb-40">{children}</div>
        </main>

        <aside className="hidden xl:block w-72 shrink-0">
          <div className="sticky top-32 pt-4">
            <div className="border-l border-(--vsc-border)/5">
              <RightBar
                slug={slug}
                toc={toc}
                category={postData.category}
                tags={postData.tags}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
