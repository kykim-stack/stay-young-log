import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <h1 className="text-9xl font-black text-(--accent) opacity-20 tracking-tighter">
        404
      </h1>
      <div className="-mt-8">
        <p className="mt-4 text-slate-500 font-medium">
          찾으시는 페이지가 존재하지 않거나 <br />
          이동되었을 수 있습니다.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="px-8 py-3 bg-(--accent) text-(--background) rounded-full font-black hover:scale-105 transition-all inline-block"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
