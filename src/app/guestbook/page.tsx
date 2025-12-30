import { supabase } from '@/lib/supabase';
import GuestbookInput from '@/components/GuestbookInput';

export const revalidate = 0; // 방명록이니까 항상 최신 데이터

async function getGuestbookLogs() {
  const { data } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

export default async function GuestbookPage() {
  const logs = await getGuestbookLogs();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-mono p-6 bg-(--background)">
      <div className="w-full max-w-3xl bg-(--vsc-tab) border border-(--vsc-border) shadow-2xl rounded-lg overflow-hidden relative z-10">
        <div className="px-4 py-2 bg-(--background) border-b border-(--vsc-border) flex items-center gap-2">
          <div className="flex gap-1.5 group">
            {' '}
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center text-[10px] text-black/70 transition-all">
              <span className="opacity-0 group-hover:opacity-100">✕</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center text-[10px] text-black/70 transition-all">
              <span className="opacity-0 group-hover:opacity-100">−</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center text-[10px] text-black/70 transition-all">
              <span className="opacity-0 group-hover:opacity-100">+</span>
            </div>
          </div>
          <span className="text-[11px] opacity-40 ml-2 italic">
            tail -f guestbook.log — 80x24
          </span>
        </div>

        <div className="p-8 text-left space-y-6">
          {/* 환경 정보 */}
          <div className="flex flex-wrap gap-2 text-[13px]">
            <span className="text-[#4EC9B0]">➔</span>
            <span className="text-[#569CD6]">~/stay-young-log</span>
            <span className="text-[#CE9178]">git:(main)</span>
            <span className="text-[#6A9955] animate-pulse ml-2">[ONLINE]</span>
          </div>

          {/* 시스템 로그 */}
          <div className="space-y-1 text-[13px] border-b border-(--vsc-border)/30 pb-4">
            <p className="text-(--foreground) opacity-90">
              $ cat guestbook.log
            </p>
            <p className="text-[#DCDCAA]">
              [INFO] Total {logs.length} records found in database.
            </p>
            <p className="text-[#6A9955]">
              [SUCCESS] Listing all terminal entries...
            </p>
          </div>

          <div className="space-y-3 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2 py-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className="text-[13px] leading-relaxed flex gap-3 group"
              >
                <span className="opacity-30 shrink-0 text-[11px]">
                  {new Date(log.created_at).toLocaleDateString()}
                </span>
                <span className="text-[#4EC9B0] font-bold shrink-0">
                  @guest_{String(log.id % 100).padStart(2, '0')}:
                </span>
                <span className="text-(--foreground) opacity-90 break-all leading-relaxed">
                  "{log.content}"
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-(--vsc-border)/50">
            <GuestbookInput />
          </div>

          <div className="pt-4 flex justify-between items-center">
            <span className="text-[10px] opacity-20 italic">
              Press Enter to commit log
            </span>
          </div>
        </div>
      </div>

      <h1 className="absolute -z-10 text-[12vw] font-black opacity-[0.03] select-none tracking-tighter whitespace-nowrap uppercase">
        Visitor Records
      </h1>
    </div>
  );
}
