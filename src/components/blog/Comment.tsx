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
          setComments((prev) => [payload.new as any, ...prev]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  return (
    <div className="font-serif">
      <div className="flex items-center gap-4 mb-12">
        <h3 className="text-sm font-sans tracking-[0.3em] opacity-30 uppercase font-bold">
          Conversation
        </h3>
        <div className="flex-1 h-px bg-(--vsc-border)/10" />
        <span className="text-[10px] opacity-20 font-sans tracking-tighter">
          {comments.length} Thoughts
        </span>
      </div>

      <div className="mb-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-6">
            <div className="relative group max-w-50">
              <input
                type="text"
                placeholder="이름"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-transparent border-b border-(--vsc-border)/20 py-2 outline-none text-sm placeholder:opacity-20 focus:border-(--accent)/50 transition-colors"
              />
            </div>
            <div className="relative group">
              <textarea
                placeholder="따뜻한 한마디를 남겨주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-transparent border-b border-(--vsc-border)/20 py-2 outline-none text-sm placeholder:opacity-20 focus:border-(--accent)/50 transition-colors resize-none h-24 leading-relaxed"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="text-[11px] font-sans tracking-widest opacity-40 hover:opacity-100 hover:text-(--accent) transition-all border border-current px-6 py-2 uppercase">
              남기기
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-12">
        {isLoading ? (
          <div className="text-center py-10 opacity-20 text-xs tracking-widest animate-pulse">
            기록을 불러오는 중입니다...
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="group animate-fade-in">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold opacity-80">
                    {comment.nickname}
                  </span>
                  <span className="text-[10px] opacity-20 font-sans tracking-tighter">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-[15px] opacity-60 leading-relaxed break-all font-sans">
                  {comment.content}
                </div>
              </div>
            </div>
          ))
        )}

        {!isLoading && comments.length === 0 && (
          <div className="text-center py-20 opacity-10 text-sm italic">
            아직 전해진 마음이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
