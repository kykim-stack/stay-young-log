'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function GuestbookInput() {
  const [newMsg, setNewMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newMsg.trim()) {
      const { error } = await supabase
        .from('guestbook')
        .insert([{ content: newMsg, username: 'guest' }]);

      if (!error) {
        setNewMsg('');
        router.refresh(); // 서버 컴포넌트 데이터를 다시 불러오게 함!
      }
    }
  };

  return (
    <div className="flex gap-2 text-[13px] items-center text-(--accent)">
      <span className="text-[#4EC9B0]">➜</span>
      <span className="text-[#569CD6]">append</span>
      <input
        type="text"
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        onKeyDown={handleSubmit}
        placeholder="로그를 추가하세요..."
        className="bg-transparent outline-none grow text-(--foreground) placeholder:opacity-20 border-b border-transparent focus:border-(--accent)/30 transition-all"
        autoFocus
      />
    </div>
  );
}
