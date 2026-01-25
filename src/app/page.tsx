import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export const revalidate = 60;

export default async function Home() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="mx-auto py-12 animate-fade-in font-serif">
      <section className="py-20 mb-16 border-b border-(--vsc-border)/10">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
          가영의 기록보관소.
        </h1>
        <p className="text-base opacity-40 font-sans tracking-tight leading-relaxed">
          생각을 정리하고, 배운 것을 담담하게 적습니다.
        </p>
      </section>

      <section className="space-y-16">
        <div className="flex justify-between items-center border-b border-(--vsc-border)/10 pb-2">
          <span className="text-[10px] tracking-[0.3em] opacity-20 uppercase font-sans font-bold">
            Recent Records
          </span>
        </div>

        <div className="divide-y divide-(--vsc-border)/10">
          {recentPosts.map((post: any) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group block py-12"
            >
              <article className="flex flex-col md:flex-row gap-8 items-start justify-between">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 text-[10px] tracking-widest text-(--accent) opacity-60 font-sans uppercase font-bold">
                    <span>{post.date}</span>
                    <span>/</span>
                    <span>{post.category || 'Record'}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-medium group-hover:text-(--accent) transition-colors break-keep">
                    {post.title}
                  </h2>

                  <p className="text-sm opacity-40 font-sans line-clamp-2 max-w-xl leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="w-full md:w-56 aspect-[4/3] md:aspect-square shrink-0 overflow-hidden border border-(--vsc-border)/20 bg-(--vsc-tab)/10">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] opacity-10 font-sans">
                      NO IMAGE
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="pt-8 text-center md:text-left">
          <Link
            href="/blog"
            className="text-[11px] font-sans tracking-[0.3em] opacity-30 hover:opacity-100 hover:text-(--accent) transition-all border-b border-current pb-1 uppercase font-bold"
          >
            See all records
          </Link>
        </div>
      </section>
    </div>
  );
}
