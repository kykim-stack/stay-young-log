'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import GuestbookInput from '@/components/gusetbook/GuestbookInput';

export default function GuestBook() {
  const [logs, setLogs] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    setMounted(true);
    fetchLogs(10);
  }, []);

  useEffect(() => {
    if (scrollRef.current && isFirstLoad.current && logs.length > 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      isFirstLoad.current = false;
    }
  }, [logs]);

  const fetchLogs = async (currentLimit: number) => {
    const { data, count, error } = await supabase
      .from('guestbook')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(currentLimit);

    if (error) {
      console.error('Error fetching logs:', error);
      return;
    }

    if (data) {
      // 시간순(과거->최신)
      const sortedLogs = [...data].reverse();
      setLogs(sortedLogs);
      if (count !== null) setTotalCount(count);
    }
  };

  const handleLoadMore = () => {
    const nextLimit = limit + 5;
    setLimit(nextLimit);
    fetchLogs(nextLimit);
  };

  const hasMore = totalCount > logs.length;
  return (
    <div className="w-full min-h-screen bg-(--background) font-serif flex flex-col transition-colors duration-300">
      <div className="flex items-center border-b border-(--vsc-border)/40 bg-(--vsc-tab) shrink-0 h-12">
        <div className="flex items-center gap-3 px-6 h-full bg-(--background) border-t-2 border-(--accent) text-xs text-(--foreground)">
          <span className="text-(--accent) font-bold">記</span>
          <span className="opacity-90 font-medium tracking-tight">
            방명록.두루마리
          </span>
          <span className="ml-1 opacity-30 text-[10px] hidden sm:inline">
            관람객의 기록
          </span>
        </div>

        <div className="flex-1 flex items-center justify-end px-6 gap-4 text-[10px] text-(--foreground) opacity-50">
          <span className="flex items-center gap-1.5">
            현재 시각:{' '}
            {mounted
              ? new Date().toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : ''}
          </span>
          <span className="font-bold text-(--accent)">총 {totalCount}수</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-6 sm:px-12 py-12">
        <div className="mb-10 text-center space-y-2">
          <h2 className="text-(--accent) text-xl font-bold tracking-[0.2em] mb-4">
            留芳百世
          </h2>
          <p className="text-(--foreground) opacity-60 text-sm italic">
            "아름다운 이름은 백 세에 걸쳐 흐른다" — 남기신 한 마디가 소중한
            기록이 됩니다.
          </p>
          <div className="w-16 h-[1px] bg-(--accent)/30 mx-auto mt-4" />
        </div>

        {/* 더보기 버튼 */}
        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="text-[11px] opacity-40 hover:opacity-100 hover:text-(--accent) transition-all mb-8 border border-(--vsc-border)/30 py-1 px-4 self-center rounded-full"
          >
            이전 기록 더보기 ▽
          </button>
        )}

        <div className="space-y-6">
          {logs.map((log, idx) => (
            <div
              key={log.id}
              className="group relative flex flex-col gap-2 py-4 px-6 border-l-4 border-(--vsc-border)/20 hover:border-(--accent)/40 bg-(--vsc-tab)/10 transition-all rounded-r-lg"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-(--accent) text-[11px] font-bold">
                  제 {totalCount - (logs.length - 1 - idx)} 수
                </span>
                <span className="text-(--foreground) opacity-30 text-[10px]">
                  {new Date(log.created_at).toLocaleString('ko-KR', {
                    hour12: false,
                  })}
                </span>
              </div>
              <div className="text-base leading-relaxed">
                <span className="text-(--foreground) opacity-90 leading-7">
                  {log.content}
                </span>
              </div>
              {/* 낙관(Stamp) 같은 느낌의 작성자 ID */}
              <div className="flex justify-end mt-2">
                <span className="text-[10px] border border-(--accent)/30 px-1 text-(--accent) opacity-60 rounded-sm">
                  익명_{String(log.id % 1000).padStart(3, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 mb-20">
          <div className="flex items-center gap-3 mb-4 opacity-60 text-xs ml-1">
            <span className="text-(--accent)">✒</span>
            <span className="font-bold tracking-widest uppercase">
              기록하기
            </span>
          </div>

          <div className="bg-(--background) border-2 border-(--vsc-border)/40 p-1 shadow-[4px_4px_0px_rgba(0,0,0,0.05)] focus-within:border-(--accent)/60 transition-all">
            <GuestbookInput onCreated={() => fetchLogs(limit)} />
          </div>

          <div className="mt-4 flex justify-between items-center opacity-30 text-[10px] italic">
            <span>정갈한 마음으로 남기는 한 문장</span>
            <span className="tracking-tighter">Stay Young Archive</span>
          </div>
        </div>
      </div>
    </div>
  );
}
