import Link from 'next/link';

export default function Side() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-black text-(--accent) opacity-20 tracking-tighter">
        Still Dreaming
      </h1>

      <div>
        <p className="mt-4 text-(--foreground) opacity-60 font-medium text-lg md:text-xl">
          해당 페이지는 무엇을 나타낼지 고민 중입니다!
          <br />
          조금만 기다려 주세요! 😊
        </p>

        <div className="mt-12">
          <Link
            href="/"
            className="px-8 py-4 bg-(--accent) text-(--background) rounded-full font-black text-lg hover:scale-105 transition-all inline-block shadow-lg shadow-(--accent)/20"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
