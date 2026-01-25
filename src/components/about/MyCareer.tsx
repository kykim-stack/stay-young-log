'use client';

const history = [
  {
    date: '2025.04',
    title: 'KOSA MSA React 과정',
    type: '修學 (수학)',
    desc: 'React 19 + Next.js 프론트엔드 개발 역량 강화',
  },
  {
    date: '2024.09',
    title: '알서포트 (RSUPPORT) 입사',
    type: '仕宦 (사환)',
    desc: 'React 기반 실무 프로젝트 및 코드 고도화',
  },
  {
    date: '2024.07',
    title: 'AI 온라인 인턴십 4기',
    type: '習讀 (습독)',
    desc: '인공지능 기술과 인터페이스의 조화를 탐구함',
  },
  {
    date: '2024.02 - 2024.08',
    title: '따뜻한동행 디지털아카데미',
    type: '修學 (수학)',
    desc: 'JAVA 기반 풀스택 개발자 과정 수료',
  },
  {
    date: '2024.01.22',
    title: '한양대학교 정보시스템학과 졸업',
    type: '成業 (성업)',
    desc: '경영 지식과 IT 기술을 융합한 비즈니스 시스템 전공',
  },
  {
    date: '2023.06 - 2023.10',
    title: '구름 쿠버네티스 13회차',
    type: '修學 (수학)',
    desc: '클라우드 인프라 및 메타버스 길찾기 지도 프로젝트',
  },
  {
    date: '2022.12 - 2023.06',
    title: '한국마사회 체험형 인턴',
    type: '習讀 (습독)',
    desc: '불법단속부 데이터 관리 및 행정 지원',
  },
  {
    date: '2021.12 - 2023.03',
    title: '사랑의달팽이(카페소리숲)',
    type: '勞動 (노동)',
    desc: '바리스타 아르바이트',
  },
  {
    date: '2020.10 - 2021.10',
    title: '아비드이앤에프(브랜디) 계약직',
    type: '仕宦 (사환)',
    desc: '고객감동팀 - 엑셀을 활용한 사무 지원',
  },
  {
    date: '2020.03',
    title: '한양대학교 정보시스템학과 입학',
    type: '入學 (입학)',
    desc: '신입생 입학',
  },
  {
    date: '2019.01 - 2019.04',
    title: '토스스터디카페 총무',
    type: '勞動 (노동)',
    desc: '매장 관리 및 총무 아르바이트',
  },
  {
    date: '2019.01.07',
    title: '건국대학교 사대부고 졸업',
    type: '成業 (성업)',
    desc: '이공계 졸업',
  },
];

const MyTimeline = () => {
  return (
    <div className="font-serif py-12 px-4 transition-colors duration-500 bg-(--background) max-w-2xl mx-auto relative">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="w-10 h-10 border border-(--accent) flex items-center justify-center text-(--accent) text-[10px] font-bold mb-4 rotate-45">
          <span className="-rotate-45">年表</span>
        </div>
        <h2 className="text-xl font-bold tracking-[0.4em] text-(--foreground) opacity-80 uppercase">
          가영 행장 (行狀)
        </h2>
        <div className="w-24 h-px bg-(--accent)/30 mt-4" />
      </div>

      <div className="relative">
        <div className="absolute left-1.75 top-0 bottom-0 w-px bg-(--vsc-border) opacity-40" />

        <div className="space-y-12">
          {history.map((item, index) => (
            <div key={index} className="relative pl-10 group">
              <div className="absolute left-0 top-1 w-4 h-4 bg-(--background) border border-(--accent) flex items-center justify-center transition-all group-hover:rotate-90">
                <div className="w-1.5 h-1.5 bg-(--accent) opacity-60" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-(--accent) tracking-widest">
                    {item.date}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 border border-(--vsc-border) text-(--foreground) opacity-40 rounded-full font-sans">
                    {item.type}
                  </span>
                </div>
                <h3 className="text-(--foreground) font-bold text-base leading-tight">
                  {item.title}
                </h3>
                {item.desc && (
                  <p className="text-(--foreground) text-sm leading-relaxed opacity-60 break-keep font-sans italic">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div className="relative pl-10 opacity-30 mt-16">
            <div className="absolute left-0.75 top-1/2 -translate-y-1/2 w-2 h-2 bg-(--vsc-border) rotate-45" />
            <div className="text-[10px] tracking-[0.3em] font-sans uppercase">
              始 (기록의 시작)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTimeline;
