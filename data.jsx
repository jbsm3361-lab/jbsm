// 정보창고 — 샘플 데이터 + 카테고리 정의

const CATEGORIES = [
  { id: 'movie',    name: '영화',     glyph: '영', count: 24, hue: 'rose',   grad: 'linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%)', soft: 'linear-gradient(135deg, #FFE4ED 0%, #FFEFE0 100%)', accent: '#FF6B9D' },
  { id: 'music',    name: '음악',     glyph: '음', count: 58, hue: 'violet', grad: 'linear-gradient(135deg, #A855F7 0%, #6366F1 100%)', soft: 'linear-gradient(135deg, #F3E8FF 0%, #E0E7FF 100%)', accent: '#8B5CF6' },
  { id: 'book',     name: '책',       glyph: '책', count: 12, hue: 'amber',  grad: 'linear-gradient(135deg, #FBBF24 0%, #EF4444 100%)', soft: 'linear-gradient(135deg, #FEF3C7 0%, #FEE2E2 100%)', accent: '#F59E0B' },
  { id: 'travel',   name: '여행',     glyph: '여', count: 9,  hue: 'cyan',   grad: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)', soft: 'linear-gradient(135deg, #CFFAFE 0%, #DBEAFE 100%)', accent: '#06B6D4' },
  { id: 'food',     name: '맛집',     glyph: '맛', count: 31, hue: 'lime',   grad: 'linear-gradient(135deg, #84CC16 0%, #10B981 100%)', soft: 'linear-gradient(135deg, #ECFCCB 0%, #D1FAE5 100%)', accent: '#10B981' },
  { id: 'game',     name: '게임',     glyph: '게', count: 7,  hue: 'fuchsia',grad: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)', soft: 'linear-gradient(135deg, #FCE7F3 0%, #EDE9FE 100%)', accent: '#D946EF' },
];

const ITEMS = {
  movie: [
    { id: 'm1', title: '인사이드 아웃 2',  sub: '2024 · 픽사 · 96분',           tag: '★ 9.0', fav: true,  date: '2025.04.12', fields: [['감독','켈시 맨'],['장르','애니메이션'],['평점','9.0 / 10'],['관람장소','메가박스 코엑스']], note: '감정이라는 게 결국 같이 사는 거라는 걸 새삼 느꼈다. 라일리가 자라는 만큼 우리도 어른이 되는 듯.' },
    { id: 'm2', title: '듄: 파트 2',     sub: '2024 · SF · 166분',           tag: '★ 8.7', fav: true,  date: '2025.03.28', fields: [['감독','드니 빌뇌브'],['장르','SF / 드라마'],['평점','8.7 / 10']], note: '사막의 스케일이 압도적. IMAX로 한 번 더 보고 싶다.' },
    { id: 'm3', title: '서울의 봄',       sub: '2023 · 드라마 · 141분',        tag: '★ 9.3', fav: false, date: '2025.03.15', fields: [['감독','김성수'],['장르','드라마 / 정치'],['평점','9.3 / 10']], note: '' },
    { id: 'm4', title: '오펜하이머',     sub: '2023 · 전기 · 180분',          tag: '★ 8.9', fav: true,  date: '2025.02.20', fields: [['감독','크리스토퍼 놀란'],['장르','전기 / 스릴러']], note: '' },
    { id: 'm5', title: '바비',           sub: '2023 · 코미디 · 114분',        tag: '★ 8.2', fav: false, date: '2025.02.02', fields: [['감독','그레타 거윅']], note: '' },
    { id: 'm6', title: '파묘',           sub: '2024 · 미스터리 · 134분',      tag: '★ 8.4', fav: false, date: '2025.01.18', fields: [['감독','장재현']], note: '' },
  ],
  music: [
    { id: 'mu1', title: 'Supernova',    sub: 'aespa · 2024',                 tag: 'K-pop', fav: true,  date: '2025.05.01', fields: [['아티스트','aespa'],['앨범','Armageddon'],['장르','K-pop / 댄스']], note: '베이스 라인이 미쳤음. 운동할 때 필수.' },
    { id: 'mu2', title: 'APT.',         sub: 'Rosé, Bruno Mars · 2024',      tag: 'Pop',   fav: true,  date: '2025.04.28', fields: [['아티스트','Rosé, Bruno Mars'],['장르','Pop']], note: '' },
    { id: 'mu3', title: 'Magnetic',     sub: 'ILLIT · 2024',                 tag: 'K-pop', fav: false, date: '2025.04.20', fields: [['아티스트','ILLIT'],['앨범','SUPER REAL ME']], note: '' },
    { id: 'mu4', title: 'Espresso',     sub: 'Sabrina Carpenter · 2024',     tag: 'Pop',   fav: true,  date: '2025.04.10', fields: [['아티스트','Sabrina Carpenter']], note: '여름에 듣기 딱 좋다.' },
  ],
  book: [
    { id: 'b1', title: '불변의 법칙',     sub: '모건 하우절',                  tag: '독서중',  fav: true,  date: '2025.04.30', fields: [['저자','모건 하우절'],['출판사','서삼독'],['진도','62% (231/372p)']], note: '돈에 대한 새 관점. 인플레이션 챕터 다시 읽기.' },
    { id: 'b2', title: '도둑맞은 집중력', sub: '요한 하리',                    tag: '완독',   fav: true,  date: '2025.03.10', fields: [['저자','요한 하리'],['진도','100%']], note: '핸드폰 줄이는 데 큰 동기.' },
    { id: 'b3', title: '아주 작은 습관의 힘', sub: '제임스 클리어',             tag: '재독',   fav: false, date: '2025.02.18', fields: [['저자','제임스 클리어']], note: '' },
  ],
  travel: [
    { id: 't1', title: '제주 4박 5일',   sub: '2025.03 · 서귀포',             tag: '여행기', fav: true,  date: '2025.03.22', fields: [['기간','03.18 - 03.22'],['숙소','서귀포 오션뷰'],['교통','대한항공 / 렌터카']], note: '비자림 산책로가 인생 코스. 다음엔 추자도까지.' },
    { id: 't2', title: '도쿄 위시리스트', sub: '2025년 가을 예정',             tag: '계획중', fav: true,  date: '2025.05.01', fields: [['예정','2025.10']], note: '시부야 스카이 + 야네센 골목 + 츠지한.' },
    { id: 't3', title: '부산 2박 3일',   sub: '2024.12 · 광안리',             tag: '여행기', fav: false, date: '2024.12.28', fields: [['기간','12.26 - 12.28']], note: '' },
  ],
  food: [
    { id: 'f1', title: '소금집 델리',    sub: '성수동 · 샌드위치',            tag: '★ 9.2', fav: true,  date: '2025.05.05', fields: [['위치','성수동'],['카테고리','샌드위치 / 델리'],['가격대','1.5만원대']], note: '파스트라미 따뜻하게 먹는 게 정답. 평일 점심 추천.' },
    { id: 'f2', title: '온지음',         sub: '북촌 · 한식',                  tag: '★ 9.8', fav: true,  date: '2025.04.20', fields: [['위치','북촌'],['카테고리','한식 / 파인다이닝']], note: '특별한 날 예약. 6개월 전부터.' },
    { id: 'f3', title: '베이커리 르 셀레스트', sub: '한남동 · 디저트',          tag: '★ 8.5', fav: false, date: '2025.04.02', fields: [['위치','한남동']], note: '' },
    { id: 'f4', title: '뜨락',           sub: '망원 · 카페',                   tag: '★ 8.8', fav: true,  date: '2025.03.15', fields: [['위치','망원동']], note: '' },
  ],
  game: [
    { id: 'g1', title: '발더스 게이트 3', sub: 'PC · RPG',                     tag: '플레이중', fav: true,  date: '2025.05.02', fields: [['플랫폼','PC (Steam)'],['진도','Act 2'],['플레이타임','62시간']], note: '아스타리온 루트 끝내고 셰도우하트 루트 시작.' },
    { id: 'g2', title: '엘든 링: SOTE',  sub: 'PS5 · 소울라이크',             tag: '클리어', fav: true,  date: '2025.02.10', fields: [['플랫폼','PS5']], note: '' },
  ],
};

function allItems() {
  const list = [];
  for (const cat of CATEGORIES) {
    (ITEMS[cat.id] || []).forEach(it => list.push({ ...it, cat }));
  }
  return list;
}

function recentItems(n = 6) {
  return allItems().sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);
}

function favItems() {
  return allItems().filter(it => it.fav);
}

window.CATEGORIES = CATEGORIES;
window.ITEMS = ITEMS;
window.allItems = allItems;
window.recentItems = recentItems;
window.favItems = favItems;
