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
    <div className="mt-20 pt-10 border-t border-(--accent)/10">
      <h3 className="text-xl font-black mb-8 text-(--foreground)">
        Comments ({comments.length})
      </h3>

      {/* 댓글 입력 폼 */}
      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-3 rounded-lg bg-(--background) border border-(--accent)/20 focus:outline-none focus:border-(--accent)"
        />
        <textarea
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 h-32 rounded-lg bg-(--background) border border-(--accent)/20 focus:outline-none focus:border-(--accent) resize-none"
        />
        <button className="px-6 py-2 bg-(--accent) text-(--background) font-bold rounded-lg hover:opacity-90 transition-all">
          Submit
        </button>
      </form>

      {/* 댓글 목록 */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="animate-pulse text-(--accent)">
            Loading comments...
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-xl bg-(--accent)/5 border border-(--accent)/5"
            >
              <div className="flex justify-between mb-2">
                <span className="font-bold text-(--accent)">
                  {comment.nickname}
                </span>
                <span className="text-xs opacity-50">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-(--foreground) leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
