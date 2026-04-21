/* wall.js — renders concert cards from wall_data.csv data */

(function () {

  /*
   * Maps CSV title → actual filename in wall_poster_image/
   * (Filenames differ slightly from titles: `:` → `-`)
   */
  const POSTER_MAP = new Map([
    ['AFT 012 : After Thoughts & Doorlesshouse',  'AFT 012 - After Thoughts & Doorlesshouse.png'],
    ['MRN Groove 문없는집 LIVE',                   'MRN Groove 문없는집 LIVE.jpeg'],
    ['RECAP 2025: 문없는집',                       'RECAP 2025- 문없는집.webp'],
    ['블루로 가는 문 [문없는집 X 병아리블루]',        '블루로 가는 문 [문없는집 X 병아리블루].jpeg'],
  ]);

  /* Placeholder fill / stroke pairs */
  const POSTER_COLORS = [
    ['#DDE4EC', '#B8C0CC'],
    ['#E8E0D8', '#C8C0B8'],
    ['#E0E8E0', '#B8C8B8'],
    ['#EAE0EC', '#C8B8CC'],
    ['#E8ECDC', '#C0C8B0'],
    ['#ECEAE0', '#C8C6B8'],
    ['#E8DDD8', '#C8C0B8'],
    ['#DCE4E8', '#B8C4C8'],
  ];

  /* ── Concert data from wall_data.csv ── */
  const concerts = [
    {
      title: '7월의 마지막 밤',
      category: '합동',
      date: '2019.07.31',
      venue: '사운드마인드',
      url: '',
    },
    {
      title: '나상현씨밴드 ep [1½] 발매 공연',
      category: '게스트',
      date: '2020.01.18',
      venue: '공상온도',
      url: '',
    },
    {
      title: '윤종현, 문없는집, 하다HADA',
      category: '합동',
      date: '2020.08.13',
      venue: '카페언플러그드',
      url: '',
    },
    {
      title: 'THE LIGHTS',
      category: '합동',
      date: '2020.08.16',
      venue: '에반스라운지',
      url: '',
    },
    {
      title: '문없는집, 수피',
      category: '합동',
      date: '2020.09.20',
      venue: '카페언플러그드',
      url: '',
    },
    {
      title: 'WEDNESDAY LIVE',
      category: '',
      date: '2020.09.30',
      venue: '에반스라운지',
      url: '',
    },
    {
      title: '밝은 미래, 그리고',
      category: '단독',
      date: '2021.02.07',
      venue: '카페언플러그드',
      url: '',
    },
    {
      title: '오디오 라이브스트림 콘서트',
      category: '',
      date: '2021.02.27',
      venue: '랏밴뮤',
      url: '',
    },
    {
      title: '나상현씨밴드-[2021< 2022]',
      category: '게스트',
      date: '2021.12.04',
      venue: '백암아트홀',
      url: '',
    },
    {
      title: '언플러그드 기획공연 문없는집, 소년달',
      category: '합동',
      date: '2022.02.20',
      venue: '홍대언플러그드',
      url: '',
    },
    {
      title: '브로콜리너마저-전국! 인디자랑',
      category: '합동',
      date: '2022.08.06',
      venue: '서울',
      url: '',
    },
    {
      title: '김두루미',
      category: '합동',
      date: '2022.09.17 17:00',
      venue: '스튜디오 까에',
      url: 'https://ticket.melon.com/performance/index.htm?prodId=207187',
    },
    {
      title: '늦여름의 기차여행： September Train 2DM',
      category: '합동',
      date: '2022.09.04 19:00',
      venue: '스페이스브릭',
      url: 'https://tickets.interpark.com/goods/22010439',
    },
    {
      title: '콜리플라워 특집',
      category: '합동',
      date: '2022.10.14',
      venue: '클럽FF',
      url: '',
    },
    {
      title: 'M.O.W.B X 문없는집',
      category: '합동',
      date: '2022.11.20',
      venue: '홍대 언플러그드',
      url: '',
    },
    {
      title: 'Landing Error',
      category: '합동',
      date: '2022.12.30',
      venue: '프리즘홀',
      url: '',
    },
    {
      title: 'SUGAR MAGNOLIA',
      category: '합동',
      date: '2023.01.15',
      venue: '스페이스 한강',
      url: '',
    },
    {
      title: 'HELLO THERE?',
      category: '',
      date: '2023.02.09',
      venue: '라이블리(비대면공연플랫폼)',
      url: '',
    },
    {
      title: 'COME WITHUS',
      category: '합동',
      date: '2023.03.31',
      venue: '카페 언플러그드',
      url: '',
    },
    {
      title: 'in mate stage',
      category: '합동',
      date: '2023.04.23',
      venue: '카페 언플러그드',
      url: '',
    },
    {
      title: '문없는집 단독공연 〈조각들〉',
      category: '단독',
      date: '2023.05.21 16:00',
      venue: '클럽 온에어',
      url: 'https://ticket.melon.com/performance/index.htm?prodId=2081477',
    },
    {
      title: '영차영차season01. step01.',
      category: '합동',
      date: '2023.06.24',
      venue: '공상온도',
      url: '',
    },
    {
      title: "SAY IT AIN'T SO",
      category: '합동',
      date: '2023.06.09',
      venue: '클럽FF',
      url: '',
    },
    {
      title: '파도를 닮은 노래',
      category: '합동',
      date: '2023.07.08',
      venue: '거제 언드',
      url: '',
    },
    {
      title: '김민식 미국진출기념 문없는집 콘서트 내 친구여',
      category: '단독',
      date: '2023.07.15',
      venue: '홍대언플러그드',
      url: '',
    },
    {
      title: '먼데이프로젝트 시즌6 OUR SUMMER［문없는집 단독 콘서트］',
      category: '단독',
      date: '2023.08.09 20:00',
      venue: '벨로주 홍대',
      url: 'https://ticket.melon.com/performance/index.htm?prodId=208486',
    },
    {
      title: '문없는집 단독공연 〈타임캡슐〉',
      category: '단독',
      date: '2024.05.26 17:00',
      venue: '벨로주 홍대',
      url: 'https://ticket.melon.com/performance/index.htm?prodId=209808',
    },
    {
      title: '문없는집 단독공연 〈타임캡슐〉',
      category: '단독',
      date: '2024.05.27 20:00',
      venue: '벨로주 홍대',
      url: '',
    },
    {
      title: '문없는집 단독공연 〈타임캡슐 vol. 2〉',
      category: '단독',
      date: '2025.6.21 19:00',
      venue: '벨로주 홍대',
      url: 'https://ticket.melon.com/performance/index.htm?prodId=211430',
    },
    {
      title: '78LIVE - 문없는집',
      category: '단독',
      date: '2025.8.28 19:30',
      venue: '엠피엠지 2층 LOUNGE M.',
      url: 'https://tickets.interpark.com/goods/25011269',
    },
    {
      title: "먼데이프로젝트 시즌 8 [문없는집 단독 콘서트 '시간여행자를 위한 가이드북']",
      category: '단독',
      date: '2025.10.09 18:00',
      venue: 'KT&G 상상마당 홍대 라이브홀',
      url: 'https://ticket.melon.com/performance/index.htm?prodId=211947',
    },
    {
      title: '[Attention #3] : 둥실둥실 – 문없는집, ddbb, 선 앤 메어',
      category: '합동',
      date: '2025.11.08 19:00',
      venue: '살롱 문보우',
      url: 'https://ticket.melon.com/performance/index.htm?prodId=212132',
    },
    {
      title: 'AFT 012 : After Thoughts & Doorlesshouse',
      category: '합동',
      date: '2025.11.16 17:00',
      venue: '공상온도',
      url: 'https://shopondo.cafe24.com/product/공연예매-012-after-thoughts-doorlesshouse-sun-16-nov-2025/2305/category/55/display/1/',
    },
    {
      title: '블루로 가는 문 [문없는집 X 병아리블루]',
      category: '합동',
      date: '2026.01.09 20:00',
      venue: '톤 스튜디오',
      url: 'https://ticket.melon.com/performance/index.htm?prodId=212478',
    },
    {
      title: 'RECAP 2025: 문없는집',
      category: '단독',
      date: '2026.01.10 18:00',
      venue: 'KT&G 상상마당 홍대 라이브홀',
      url: 'https://ticket.melon.com/performance/index.htm?prodId=212512',
    },
    {
      title: '석촌호수 아뜰리에 시그니처 기획공연 <밴드시그널>',
      category: '단독',
      date: '2026.03.15 19:00',
      venue: '석촌호수 아뜰리에',
      url: 'https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260211092438955213',
    },
    {
      title: 'MRN Groove 문없는집 LIVE',
      category: '단독',
      date: '2026.04.26 20:00',
      venue: '모래내 극락',
      url: 'https://booking.naver.com/booking/6/bizes/883104/items/7445030?area=ple&lang=ko&startDate=2026-04-26&startDateTime=2026-04-26T19%3A00%3A00%2B09%3A00&tab=book&theme=place',
    },
    {
      title: '홍대 인디 자선 행사 <볕 든 자리>',
      category: '페스티벌',
      date: '2026.05.02 19:50',
      venue: '우무지',
      url: 'https://www.instagram.com/sunnyspot.for.us/',
    },
    {
      title: 'MIRAE COMPLEX Pt. 2 Pre-Listening Session',
      category: '단독',
      date: '2026.05.03 15:00',
      venue: '고요의 방',
      url: 'https://www.unplugged-hongdae.com/concert-booking/2026-05-03-고요의-방-낮공연',
    },
  ];

  /* ── Helpers ── */

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function svgPlaceholder(idx) {
    const [fill, stroke] = POSTER_COLORS[idx % POSTER_COLORS.length];
    return `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="500" fill="${fill}"/>
      <line x1="0" y1="0" x2="400" y2="500" stroke="${stroke}" stroke-width="1.5"/>
      <line x1="400" y1="0" x2="0" y2="500" stroke="${stroke}" stroke-width="1.5"/>
    </svg>`;
  }

  /* ── Render one concert card ── */

  function renderConcert(concert, idx) {
    const filename = POSTER_MAP.get(concert.title);

    const imgContent = filename
      ? `<img src="wall_poster_image/${encodeURIComponent(filename)}" alt="${esc(concert.title)}">`
      : svgPlaceholder(idx);

    const catHtml = concert.category
      ? `<span class="cat-btn">${esc(concert.category)}</span>`
      : '';

    const titleHtml = concert.url
      ? `<a class="concert-title-link" href="${esc(concert.url)}" target="_blank" rel="noopener noreferrer">${esc(concert.title)}</a>`
      : esc(concert.title);

    return `<article class="concert-card" data-card-index="${idx}">
      <div class="concert-img">${imgContent}</div>
      <div class="concert-body">
        ${catHtml}
        <p class="concert-date-tag">${esc(concert.date)}</p>
        <h3 class="concert-name">${titleHtml}</h3>
        <p class="concert-location">${esc(concert.venue)}</p>
      </div>
    </article>`;
  }

  const grid = document.getElementById('concertsGrid');
  if (!grid) return;

  const sorted = [...concerts].reverse();
  grid.innerHTML = sorted.map((concert, i) => renderConcert(concert, i)).join('');

}());
