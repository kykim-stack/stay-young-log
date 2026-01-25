import { getPostData, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Comments from '../../../components/blog/Comment';
import Link from 'next/link';
import remarkBreaks from 'remark-breaks';
import rehypePrettyCode from 'rehype-pretty-code';
import PostButtons from '@/components/blog/PostButtons';

export const revalidate = 60;

const proseStyles = `
  prose max-w-none font-serif text-(--foreground)
  prose-headings:text-(--foreground) prose-headings:font-medium
  prose-h2:text-2xl prose-h2:mt-24 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-(--vsc-border)/10
  prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-4
  prose-p:text-(--foreground)/70 prose-p:leading-[1.8] prose-p:my-6 prose-p:text-[17px] prose-p:font-sans
  prose-blockquote:border-l-2 prose-blockquote:border-(--accent)/30 prose-blockquote:bg-(--vsc-tab)/10 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:italic
  prose-code:text-(--accent) prose-code:bg-(--vsc-tab)/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm
  prose-pre:bg-(--vsc-tab)/30 prose-pre:border prose-pre:border-(--vsc-border)/10 prose-pre:p-6 prose-pre:rounded-sm
  prose-img:rounded-sm prose-img:shadow-sm
`;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: any) => ({ slug: post.slug }));
}
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣-]/g, '');
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post)
    return (
      <div className="py-40 text-center font-serif opacity-30">
        비어있는 공간입니다.
      </div>
    );

  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((p: any) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  return (
    <article className="max-w-4xl mx-auto py-16 px-6 font-serif">
      <nav className="flex items-center gap-3 text-[10px] opacity-30 font-sans tracking-[0.2em] uppercase mb-16">
        <Link href="/blog" className="hover:text-(--accent) transition-colors">
          Records
        </Link>
        <span className="w-4 h-px bg-current opacity-20" />
        <span className="text-(--accent)">{post.category}</span>
      </nav>

      <header className="mb-24 space-y-10">
        <h1 className="text-4xl md:text-5xl font-medium leading-[1.3] tracking-tight break-keep text-(--foreground)">
          {post.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-(--vsc-border)/10 text-xs opacity-40 font-sans">
          <div className="flex items-center gap-4">
            <span className="font-bold tracking-widest uppercase">
              Written by Young
            </span>
            <span className="w-1 h-1 bg-current rounded-full" />
            <span>{post.date}</span>
          </div>
          <PostButtons title={post.title} />
        </div>

        {post.description && (
          <p className="text-lg opacity-50 leading-relaxed italic border-l-2 border-(--vsc-border)/30 pl-6 py-1 max-w-3xl">
            {post.description}
          </p>
        )}
      </header>

      <section className={proseStyles}>
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkBreaks],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  { theme: 'one-dark-pro', keepBackground: true },
                ],
              ],
            },
          }}
          components={{
            h2: (props) => (
              <h2
                {...props}
                id={slugify(String(props.children))}
                className="scroll-mt-24"
              />
            ),
            h3: (props) => (
              <h3
                {...props}
                id={slugify(String(props.children))}
                className="scroll-mt-24"
              />
            ),
          }}
        />
      </section>

      <footer className="mt-48 pt-16 border-t border-(--vsc-border)/10">
        <div className="mb-32">
          <div className="text-center mb-16 opacity-20 text-[10px] tracking-[0.4em] uppercase font-sans">
            Conversation
          </div>
          <div className="max-w-3xl mx-auto">
            <Comments slug={slug} />
          </div>
        </div>

        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-12 font-sans border-t border-(--vsc-border)/10 pt-12">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group flex flex-col gap-2"
            >
              <span className="text-[10px] opacity-20 tracking-widest uppercase">
                이전 기록
              </span>
              <span className="text-sm opacity-60 group-hover:text-(--accent) transition-all font-serif truncate">
                ← {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex flex-col gap-2 text-right"
            >
              <span className="text-[10px] opacity-20 tracking-widest uppercase">
                다음 기록
              </span>
              <span className="text-sm opacity-60 group-hover:text-(--accent) transition-all font-serif truncate">
                {nextPost.title} →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </footer>
    </article>
  );
}
