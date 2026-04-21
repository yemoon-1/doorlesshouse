/* discography.js — renders album cards from roof_data.csv data */

(function () {

  /* Albums with matching images in roof_album_image/ */
  const KNOWN_IMAGES = new Set([
    '하라는 공부는 안하고',
    'Happyhappyhappylife',
    '문없는집',
    '터널',
    '밝은 미래',
  ]);

  /* Placeholder fill / stroke pairs, cycled for albums without art */
  const ART_COLORS = [
    ['#E0DCD4', '#C4BFB7'],
    ['#D8DDE8', '#B8BEC8'],
    ['#E8E2D8', '#C8C2B7'],
    ['#DDE8E0', '#B8C8BB'],
    ['#E8DDE2', '#C8B8BC'],
    ['#EAE0EC', '#C8B8CC'],
    ['#E8ECDC', '#C0C8B0'],
    ['#ECEAE0', '#C8C6B8'],
  ];

  /* ── Album data derived from roof_data.csv ── */
  const albums = [
    {
      name: '하라는 공부는 안하고',
      category: '옴니버스',
      date: '2018.12.07',
      tracks: [
        { title: '콘크리트연애', url: '' },
      ],
    },
    {
      name: '우리',
      category: '기타',
      date: '2019.05.22',
      tracks: [
        { title: '우리 (Feat. 손효진 of 문없는집)', url: '' },
      ],
    },
    {
      name: 'Happyhappyhappylife',
      category: '싱글',
      date: '2019.05.23',
      tracks: [
        { title: 'Happyhappyhappylife', url: 'https://youtu.be/tnIdqE4vBqg?si=jT-tF0EThihWcKAU' },
      ],
    },
    {
      name: '문없는집',
      category: 'EP',
      date: '2019.07.29',
      tracks: [
        { title: '새벽',                      url: 'https://youtu.be/inktgk4rITE?si=vZB8fh_XISTNFW6T' },
        { title: '디스코',                     url: 'https://youtu.be/L1VqFvV9o8o?si=RKQsvOrm0CDvlpfq' },
        { title: 'Happyhappyhappylife',        url: 'https://youtu.be/oZ48KXTeY1o?si=5om_kOzj3sr0QQOf' },
        { title: '말',                         url: 'https://youtu.be/65oY-2KqQ8I?si=SF24e-suEUSktyhx' },
        { title: '콘크리트연애 (Re-recorded)', url: 'https://youtu.be/jmurNmZJ_Ac?si=TOzo8uO3Hbw5Kw8d' },
        { title: '나는 너와',                  url: 'https://youtu.be/chtKd-BNHas?si=f93OmKBgjm2EWp1L' },
      ],
    },
    {
      name: '터널',
      category: '싱글',
      date: '2020.12.23',
      tracks: [
        { title: '터널', url: 'https://youtu.be/3-TZFQj51JQ?si=itzkZTJt439GhvXq' },
      ],
    },
    {
      name: '밝은 미래',
      category: 'EP',
      date: '2020.12.30',
      tracks: [
        { title: '터널 (Album Ver.)',        url: 'https://youtu.be/KjmE-A9U5NQ?si=JfSyDAd6on1EPz5c' },
        { title: '밝은 미래',               url: 'https://youtu.be/kaoaHsxkzaY?si=R4jIClKt9dmUNjaZ' },
        { title: '저묾',                    url: 'https://youtu.be/pLZZuHcVZJI?si=5RmAuU-zHsaAAw1i' },
        { title: '시간이 흐르지 않는 친구에게', url: 'https://youtu.be/2o939W0He5o?si=4Tz0Z1nz5jL0PWau' },
        { title: 'Exit',                    url: 'https://youtu.be/cSOJGpuYs_E?si=Qad03Ue2pnbhcs5H' },
      ],
    },
    {
      name: '스페이스센터',
      category: '싱글',
      date: '2021.09.04',
      tracks: [
        { title: '스페이스센터', url: 'https://youtu.be/oho1gUtBgj4?si=5TvON7R85_pFdYVr' },
      ],
    },
    {
      name: 'Behind Your Dream',
      category: '싱글',
      date: '2022.03.22',
      tracks: [
        { title: 'Behind Your Dream', url: 'https://youtu.be/GcZT97p1cDU?si=IKJ-c0gUujR7eAf5' },
      ],
    },
    {
      name: '검은 강을 건너',
      category: '싱글',
      date: '2022.04.19',
      tracks: [
        { title: '검은 강을 건너', url: 'https://youtu.be/fbll94pQz_g?si=GN71PM3u-ai6nr7_' },
      ],
    },
    {
      name: 'Colors of',
      category: '싱글',
      date: '2022.07.29',
      tracks: [
        { title: 'Colors of', url: 'https://youtu.be/ioWc13tra6k?si=gN02gfy0gSKh7yxE' },
      ],
    },
    {
      name: '한가로운 생각',
      category: 'EP',
      date: '2022.08.17',
      tracks: [
        { title: '방학을 기다리던 날들', url: 'https://youtu.be/1-hriDfIrZg?si=s01Kc07alLa8Stfu' },
        { title: '썸머무드',            url: 'https://youtu.be/rEKXoDrvKoo?si=LjTvyFXvbkfi9bLE' },
        { title: '굿모닝포토',          url: 'https://youtu.be/PMrruQ2BeNs?si=eZO4gv8no2LcizVl' },
        { title: 'Colors of',          url: 'https://youtu.be/koPfR_5gLUo?si=ssw-8qzwvp40WBmH' },
        { title: '자장자장',            url: 'https://youtu.be/BKpkm7LJ6Kw?si=mADaXmy9bucWAL-z' },
      ],
    },
    {
      name: '마음의 고향',
      category: '싱글',
      date: '2023.02.27',
      tracks: [
        { title: '마음의 고향', url: 'https://youtu.be/P3q1wIgrjWU?si=oFLUh3ELZ7-yOZT_' },
      ],
    },
    {
      name: 'Alchemist',
      category: '싱글',
      date: '2023.05.12',
      tracks: [
        { title: 'Alchemist',             url: 'https://youtu.be/4e6SNwkaYgs?si=OhkvAzP_7Z-K_166' },
        { title: 'Alchemist (Radio Edit)', url: 'https://youtu.be/4e6SNwkaYgs?si=qyuayRaq2LT3pv_x' },
      ],
    },
    {
      name: '아네모이아 풍경관광',
      category: '싱글',
      date: '2025.06.11',
      tracks: [
        { title: '아네모이아 풍경관광', url: 'https://youtu.be/aaX2_AvttNk?si=o0g5DXCIHtyl5kyk' },
      ],
    },
    {
      name: '우리들의 과거는 철거되었지만',
      category: '싱글',
      date: '2025.09.05',
      tracks: [
        { title: '우리들의 과거는 철거되었지만', url: 'https://youtu.be/Sskh2bVkq9Q?si=nDMwnjP2ANtChQTt' },
      ],
    },
    {
      name: 'MIRAE COMPLEX Pt. 1',
      category: '정규',
      date: '2025.09.26',
      tracks: [
        { title: 'ruqot',                      url: 'https://youtu.be/tYhhTGE4j_s?si=WCAR01PWDya2RjER' },
        { title: 'Party party party!',         url: 'https://youtu.be/OcWSKPLVhDE?si=CTIE_gJvZIkyf1t_' },
        { title: '질주',                        url: 'https://youtu.be/rgivMbwkVw0?si=NKSsCJxhOQAXRyXB' },
        { title: '2077',                        url: 'https://youtu.be/95MBFB1_Pw4?si=vMKz1qjJXFhI_S6f' },
        { title: '아네모이아 풍경관광',         url: 'https://youtu.be/aaX2_AvttNk?si=KKLiC5L5irTa1Oxa' },
        { title: '~Cicadas~',                  url: 'https://youtu.be/US2ylj6KwYk?si=vms6VmC3OMZSJfjL' },
        { title: '내가 태어난 해 여름',         url: 'https://youtu.be/hPWCeDjUgVM?si=PldvW6VNOTxHbXkj' },
        { title: '우리들의 과거는 철거되었지만', url: 'https://youtu.be/Sskh2bVkq9Q?si=Il4EmBzxYv8GgL1Q' },
        { title: 'Snowflakes of 2000',         url: 'https://youtu.be/ui4kzd15iCs?si=HmIygmR9JGT7v8zA' },
        { title: '미래에 Pt. 2',               url: 'https://youtu.be/ix4uvLNqOpA?si=O8W8h-1i-NqmEYxd' },
      ],
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
    const [fill, stroke] = ART_COLORS[idx % ART_COLORS.length];
    return `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="${fill}"/>
      <line x1="0" y1="0" x2="256" y2="256" stroke="${stroke}" stroke-width="1.5"/>
      <line x1="256" y1="0" x2="0" y2="256" stroke="${stroke}" stroke-width="1.5"/>
    </svg>`;
  }

  /* ── Render one album card ── */

  function renderAlbum(album, idx) {
    const artHtml = KNOWN_IMAGES.has(album.name)
      ? `<img src="roof_album_image/${encodeURIComponent(album.name)}.jpg" alt="${esc(album.name)}">`
      : svgPlaceholder(idx);

    const n = album.tracks.length;
    const tracksHtml = album.tracks.map((t, i) => {
      const nameInner = t.url
        ? `<a href="${esc(t.url)}" target="_blank" rel="noopener noreferrer">${esc(t.title)}</a>`
        : esc(t.title);
      return `<li class="track-item">
        <span class="track-n">${i + 1}</span>
        <div class="track-info">
          <span class="track-name">${nameInner}</span>
        </div>
      </li>`;
    }).join('');

    return `<div class="album-card">
      <div class="album-art">${artHtml}</div>
      <span class="cat-btn">${esc(album.category)}</span>
      <h2 class="album-title">${esc(album.name)}</h2>
      <p class="album-meta">${esc(album.date)} · ${n} Track${n === 1 ? '' : 's'}</p>
      <ul class="track-list">${tracksHtml}</ul>
    </div>`;
  }

  /* ── Mount ── */

  const grid = document.getElementById('discoGrid');
  if (grid) {
    grid.innerHTML = albums.map(renderAlbum).join('');
  }

}());
