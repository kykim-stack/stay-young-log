'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Comments({ slug }: { slug: string }) {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 댓글 불러오기 함수
  const fetchComments = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('slug', slug)
      .order('created_at', { ascending: false });

    if (!error && data) setComments(data);
    setIsLoading(false);
  };

  // 댓글 저장하기 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || !content) return;

    const { error } = await supabase
      .from('comments')
      .insert([{ slug, nickname, content }]);

    if (!error) {
      setNickname('');
      setContent('');
      fetchComments();
    }
  };

  useEffect(() => {
    // 초기 댓글 데이터 가져오기
    fetchComments();

    // 실시간 구독 설정 (comments 테이블에 변화가 생기면 감지!)
    const channel = supabase
      .channel('realtime-comments')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `slug=eq.${slug}`,
        },
        (payload) => {
          // 새로운 댓글이 INSERT 되면, 기존 리스트 맨 앞에 붙여주기!
          setComments((prev) => [payload.new as Comment, ...prev]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  return (
    <div className="mt-32 font-mono text-sm border-t border-(--vsc-border)">
      <div className="flex gap-6 border-b border-(--vsc-border) mb-8 text-[11px] font-bold">
        <div className="border-b border-(--accent) py-2 px-1 text-(--foreground) cursor-pointer">
          TERMINAL
        </div>
        <div className="py-2 opacity-40 cursor-pointer hover:opacity-100 transition-opacity">
          DEBUG CONSOLE
        </div>
        <div className="py-2 opacity-40 cursor-pointer hover:opacity-100 transition-opacity">
          OUTPUT
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6 opacity-60">
          <span className="text-[#4EC9B0]">➔</span>
          <span className="text-[#569CD6]">~/stay-young-log</span>
          <span className="text-[#CE9178]">git(main)</span>
          <span className="text-[#DCDCAA]">npm run comment:write</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-(--vsc-tab) p-6 rounded-lg border border-(--vsc-border)"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2 grow">
              <span className="text-[#008000] dark:text-[#6A9955] shrink-0">
                nickname:
              </span>
              <input
                type="text"
                placeholder="Enter_your_name..."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-(--foreground) placeholder:opacity-20"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#008000] dark:text-[#6A9955]">content:</span>
            <textarea
              placeholder="Type your message here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none text-(--foreground) resize-none h-20 placeholder:opacity-20"
            />
          </div>
          <div className="flex justify-end">
            <button className="text-[#4EC9B0] hover:bg-[#4EC9B0]/10 px-4 py-1 border border-[#4EC9B0] rounded-sm transition-all text-xs font-bold">
              Execute Command (Enter)
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-2">
        <div className="opacity-30 mb-4 text-[10px]">
          -- TOTAL COMMENTS: {comments.length} --
        </div>

        {isLoading ? (
          <div className="animate-pulse text-(--accent)">
            [LOADING...] fetching data from supabase...
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="group flex gap-3 p-2 hover:bg-(--vsc-tab) rounded-sm transition-all border-l-2 border-transparent hover:border-(--accent)"
            >
              <span className="opacity-20 shrink-0 select-none">
                [
                {new Date(comment.created_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                ]
              </span>
              <div className="flex flex-col md:flex-row gap-2">
                <span className="text-[#DCDCAA] font-bold shrink-0">
                  {comment.nickname}:
                </span>
                <span className="text-(--foreground) opacity-80 break-all">
                  {comment.content}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
