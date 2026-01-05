'use client';

import { useRouter } from 'next/navigation';

const PostButtons = ({ title }: { title: string }) => {
  const router = useRouter();

  const handleShare = async () => {
    // Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Young_Log: ${title}`,
          text: '가영님의 개발 블로그 글을 확인해보세요! 🚀',
          url: window.location.href,
        });
      } catch (err) {
        console.log('공유 취소 또는 에러:', err);
      }
    } else {
      // 지원하지 않는 브라우저는 URL 복사로 대체
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 복사되었습니다! 원하는 곳에 붙여넣어 공유해주세요. 🔗');
      } catch (err) {
        alert('복사에 실패했습니다.');
      }
    }
  };

  return (
    <div className="flex gap-3 pt-2">
      <button
        onClick={handleShare}
        className="px-6 py-1.5 bg-[#007ACC] text-white text-xs font-bold rounded-sm hover:brightness-110 active:scale-95 transition-all"
      >
        Share
      </button>

      <button
        onClick={() => router.back()}
        className="px-6 py-1.5 border border-(--vsc-border) text-xs font-bold rounded-sm hover:bg-(--vsc-tab) active:scale-95 transition-all text-(--foreground)"
      >
        Back
      </button>

      <a
        href="mailto:kayoung7189@naver.com"
        className="px-4 py-1.5 border border-(--vsc-border) text-xs font-bold rounded-sm hover:bg-(--vsc-tab) flex items-center justify-center text-(--foreground)"
      >
        @
      </a>
    </div>
  );
};

export default PostButtons;
