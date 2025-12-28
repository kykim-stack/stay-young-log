import { getPostData, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

// params 앞에 await를 쓰는 것이 최신 Next.js의 규칙
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-300">
        <h1 className="text-xl font-black uppercase tracking-widest">
          Post Not Found
        </h1>
        <p className="mt-2 text-sm">Slug: {slug}</p>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto py-32 px-6">
      <header className="mb-24 text-center">
        <div className="mb-8 flex items-center justify-center space-x-4 text-[11px] font-black tracking-[0.3em] text-(--accent) uppercase">
          <span>{post.category}</span>
          <span className="w-1.5 h-px bg-slate-200 dark:bg-slate-800" />
          <time className="text-slate-400 dark:text-slate-500 font-bold">
            {post.date}
          </time>
        </div>

        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter text-(--foreground) truncate w-full px-4">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-8 text-lg md:text-xl text-slate-400 dark:text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
            {post.description}
          </p>
        )}
      </header>
      <section
        className="prose prose-slate dark:prose-invert max-w-none
          text-(--foreground) 

          prose-p:text-(--foreground) prose-p:opacity-90 prose-p:leading-[1.8] prose-p:text-lg
          
          prose-headings:text-(--foreground) prose-headings:font-black prose-headings:tracking-tighter
          
          prose-a:text-(--accent) prose-a:no-underline hover:prose-a:underline
          prose-strong:text-(--foreground) prose-strong:font-bold
          
          prose-li:text-(--foreground) prose-li:opacity-90
          prose-blockquote:border-l-2 prose-blockquote:border-(--accent) prose-blockquote:text-(--foreground) prose-blockquote:italic"
      >
        <MDXRemote source={post.content} />
      </section>
    </article>
  );
}
