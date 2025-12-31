const MyTimeline = () => {
  const history = [
    {
      date: '2025.04',
      title: 'KOSA MSA React 과정',
      type: 'EDU',
      color: '#CE9178',
      desc: 'React 19 + Next.js 프론트엔드 개발 역량 강화',
    },
    {
      date: '2024.09',
      title: '알서포트 입사',
      type: 'WORK',
      color: '#4EC9B0',
      desc: 'React 기반 실무 프로젝트 및 코드 고도화',
    },
    {
      date: '2024.07',
      title: 'AI 온라인 인턴십 4기',
      type: 'INTERN',
      color: '#DCDCAA',
      desc: 'React 활용한 AI 학습 결과물 도출 및 AI 기초 학습',
    },
    {
      date: '2024.02 - 2024.08',
      title: '따뜻한동행 디지털아카데미',
      type: 'EDU',
      color: '#CE9178',
      desc: 'JAVA 기반 풀스택 개발자 과정 수료',
    },
    {
      date: '2024.01.22',
      title: '한양대학교 정보시스템학과 졸업',
      type: 'UNIV',
      color: '#007ACC',
      desc: '경영 지식과 IT 기술을 융합한 비즈니스 시스템 전공',
    },
    {
      date: '2023.06 - 2023.10',
      title: '구름 쿠버네티스 13회차',
      type: 'EDU',
      color: '#CE9178',
      desc: '클라우드 인프라 및 메타버스 길찾기 지도 프로젝트',
    },
    {
      date: '2022.12 - 2023.06',
      title: '한국마사회 체험형 인턴',
      type: 'INTERN',
      color: '#DCDCAA',
      desc: '불법단속부 데이터 관리 및 행정 지원',
    },
    {
      date: '2021.12 - 2023.03',
      title: '사랑의달팽이(카페소리숲)',
      type: 'WORK',
      color: '#C586C0',
      desc: '바리스타 아르바이트',
    },
    {
      date: '2020.10 - 2021.10',
      title: '아비드이앤에프(브랜디) 계약직',
      type: 'WORK',
      color: '#C586C0',
      desc: '고객감동팀 - 엑셀을 활용한 사무 지원',
    },
    {
      date: '2020.03',
      title: '한양대학교 정보시스템학과 입학',
      type: 'UNIV',
      color: '#007ACC',
      desc: '신입생 입학',
    },
    {
      date: '2019.01 - 2019.04',
      title: '토스스터디카페 총무',
      type: 'WORK',
      color: '#858585',
      desc: '매장 관리 및 총무 아르바이트',
    },
    {
      date: '2019.01.07',
      title: '건국대학교 사대부고 졸업',
      type: 'EDU',
      color: '#007ACC',
      desc: '이공계 졸업',
    },
  ];

  return (
    <div className="font-mono text-[13px] p-8 transition-colors duration-300 bg-(--background) rounded-lg border border-(--vsc-border) max-w-2xl mx-auto shadow-lg">
      <div className="flex items-center gap-2 mb-10 border-b border-(--vsc-border) pb-2 text-[10px] opacity-40 uppercase tracking-[0.2em] text-(--foreground)">
        <span className="text-[#4EC9B0]">●</span>
        <span>kayoung-git-log.json</span>
      </div>

      <div className="relative">
        <div className="absolute left-2.75 top-0 bottom-0 w-0.5 bg-(--vsc-border)" />

        <div className="space-y-8">
          {history.map((item, index) => (
            <div key={index} className="relative flex gap-8 group">
              <div
                className="z-10 w-6 h-6 rounded-full border-4 border-(--background) transition-all group-hover:scale-125 shrink-0 shadow-sm"
                style={{ backgroundColor: item.color }}
              />

              <div className="flex flex-col gap-1 -mt-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] opacity-50 font-bold text-(--foreground)">
                    {item.date}
                  </span>
                  <span
                    className="px-1.5 py-0.5 rounded text-[9px] font-black tracking-tighter"
                    style={{
                      backgroundColor: item.color + '22',
                      color: item.color,
                      border: `1px solid ${item.color}44`,
                    }}
                  >
                    {item.type}
                  </span>
                </div>
                <h3 className="text-(--foreground) font-bold text-[14px] leading-tight opacity-90">
                  {item.title}
                </h3>
                {item.desc && (
                  <p className="text-(--foreground) text-[11px] leading-relaxed italic opacity-50">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* 초기 커밋 */}
          <div className="relative flex gap-8 opacity-20">
            <div className="w-6 h-6 rounded-full bg-gray-400 border-4 border-(--background)" />
            <div className="text-[11px] self-center italic text-(--foreground)">
              init: start of journey
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTimeline;
