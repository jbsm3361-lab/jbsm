// 정보창고 — 메인 앱 + 하단 네비

const { useState: useStateA } = React;

function BottomNav({ active, onChange, onAdd }) {
  const tabs = [
    { id: 'home', label: '홈',
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 22 22">
          <path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1h-4v-6h-6v6H4a1 1 0 01-1-1V9.5z"
            fill={a ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      )},
    { id: 'cats', label: '카테고리',
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 22 22">
          <rect x="3" y="3" width="7" height="7" rx="1.6" fill={a?'currentColor':'none'} stroke="currentColor" strokeWidth="1.6"/>
          <rect x="12" y="3" width="7" height="7" rx="1.6" fill={a?'currentColor':'none'} stroke="currentColor" strokeWidth="1.6"/>
          <rect x="3" y="12" width="7" height="7" rx="1.6" fill={a?'currentColor':'none'} stroke="currentColor" strokeWidth="1.6"/>
          <rect x="12" y="12" width="7" height="7" rx="1.6" fill={a?'currentColor':'none'} stroke="currentColor" strokeWidth="1.6"/>
        </svg>
      )},
    { id: 'add', label: '추가', isAdd: true,
      icon: () => (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 6v12M6 12h12" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
        </svg>
      )},
    { id: 'search', label: '검색',
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 22 22">
          <circle cx="10" cy="10" r="6" fill={a?'currentColor':'none'} stroke="currentColor" strokeWidth="1.6"/>
          <path d="M15 15l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      )},
    { id: 'me', label: '내 정보',
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 22 22">
          <circle cx="11" cy="8" r="3.5" fill={a?'currentColor':'none'} stroke="currentColor" strokeWidth="1.6"/>
          <path d="M4 19c1-3.5 4-5.5 7-5.5s6 2 7 5.5" fill={a?'currentColor':'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      )},
  ];

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
      paddingBottom: 28, paddingTop: 8,
      background: 'rgba(255,255,255,0.82)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderTop: '0.5px solid rgba(0,0,0,0.08)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 8px' }}>
        {tabs.map(t => {
          const a = active === t.id;
          if (t.isAdd) {
            return (
              <button key={t.id} onClick={onAdd} style={{
                border: 'none', cursor: 'pointer',
                width: 52, height: 52, borderRadius: 18,
                background: 'linear-gradient(135deg, #FF6B9D 0%, #A855F7 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 20px -6px rgba(168,85,247,0.55)',
                marginTop: -16,
              }}>
                {t.icon()}
              </button>
            );
          }
          return (
            <button key={t.id} onClick={() => onChange(t.id)} style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '4px 8px',
              color: a ? '#0A0A0A' : '#9CA3AF',
              fontFamily: 'inherit',
            }}>
              {t.icon(a)}
              <div style={{ fontSize: 10, fontWeight: a ? 700 : 500 }}>{t.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// "Me" placeholder screen
// ─────────────────────────────────────────────────────────────
function MeScreen() {
  const counts = CATEGORIES.map(c => ({ ...c, n: (ITEMS[c.id]||[]).length }));
  const total = allItems().length;
  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ height: 56 }} />
      <div style={{ padding: '8px 22px 0' }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em' }}>내 정보</h1>
      </div>

      {/* profile card */}
      <div style={{ padding: '20px 22px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #FF6B9D 0%, #A855F7 50%, #3B82F6 100%)',
          borderRadius: 22, padding: 22, color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 32,
              background: 'rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 800, backdropFilter: 'blur(10px)',
            }}>나</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.01em' }}>나의 창고</div>
              <div style={{ fontSize: 13, opacity: 0.9, marginTop: 2 }}>{total}개 항목 보관 중</div>
            </div>
          </div>
        </div>
      </div>

      {/* stat */}
      <div style={{ padding: '24px 22px 0' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: '#8E8E93', letterSpacing: 0.5 }}>
          카테고리별 통계
        </h3>
        <div style={{ background: '#fff', borderRadius: 16, padding: '8px 0' }}>
          {counts.map((c, i) => {
            const pct = total ? (c.n / Math.max(...counts.map(x=>x.n))) * 100 : 0;
            return (
              <div key={c.id} style={{ padding: '10px 16px',
                borderTop: i === 0 ? 'none' : '1px solid #F2F2F7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <GradientGlyph cat={c} size={32} radius={9} fontSize={14} />
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#3A3A3C' }}>{c.n}</div>
                </div>
                <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: '#F2F2F7', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: c.grad, borderRadius: 2 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings list */}
      <div style={{ padding: '24px 22px 0' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: '#8E8E93', letterSpacing: 0.5 }}>
          설정
        </h3>
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden' }}>
          {['카테고리 관리', '백업 및 동기화', '테마', '도움말'].map((label, i) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 16px',
              borderTop: i === 0 ? 'none' : '1px solid #F2F2F7',
            }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{label}</div>
              <ChevronRight />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// "Categories" tab — full list
// ─────────────────────────────────────────────────────────────
function CatsTabScreen({ go }) {
  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ height: 56 }} />
      <div style={{ padding: '8px 22px 0' }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em' }}>카테고리</h1>
        <div style={{ marginTop: 6, fontSize: 14, color: '#8E8E93', fontWeight: 500 }}>
          {CATEGORIES.length}개 · 총 {allItems().length}개 항목
        </div>
      </div>
      <div style={{ padding: '20px 22px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => go({ screen: 'category', cat: cat.id })} style={{
            border: 'none', padding: 16, borderRadius: 20, background: '#fff',
            textAlign: 'left', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <GradientGlyph cat={cat} size={52} radius={15} fontSize={24} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>{cat.name}</div>
              <div style={{ fontSize: 12, color: '#8E8E93', marginTop: 2, fontWeight: 500 }}>
                {(ITEMS[cat.id]||[]).length}개 · 즐겨찾기 {(ITEMS[cat.id]||[]).filter(i=>i.fav).length}
              </div>
            </div>
            <ChevronRight />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Add bottom sheet
// ─────────────────────────────────────────────────────────────
function AddSheet({ open, onClose, go }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      pointerEvents: open ? 'auto' : 'none',
    }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0,
        background: open ? 'rgba(0,0,0,0.4)' : 'transparent',
        transition: 'background 0.25s',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: '#fff',
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: '14px 22px 36px',
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
      }}>
        <div style={{ width: 36, height: 5, borderRadius: 3, background: '#E5E7EB', margin: '0 auto 14px' }} />
        <h3 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>새 항목 추가</h3>
        <div style={{ fontSize: 13, color: '#8E8E93', marginBottom: 18 }}>어떤 카테고리에 추가할까요?</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => { onClose(); go({ screen: 'category', cat: cat.id }); }} style={{
              border: 'none', padding: 12, borderRadius: 14, background: '#F9FAFB',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
              textAlign: 'left', fontFamily: 'inherit',
            }}>
              <GradientGlyph cat={cat} size={32} radius={9} fontSize={14} />
              <div style={{ fontSize: 14, fontWeight: 700 }}>{cat.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Root app
// ─────────────────────────────────────────────────────────────
function App() {
  const [route, setRoute] = useStateA({ screen: 'home' });
  const [tab, setTab] = useStateA('home');
  const [addOpen, setAddOpen] = useStateA(false);
  // remember scroll? skip for now

  const go = (next) => {
    setRoute(next);
    if (next.screen === 'home') setTab('home');
    if (next.screen === 'category' || next.screen === 'detail') setTab('cats');
    if (next.screen === 'search') setTab('search');
    if (next.screen === 'me') setTab('me');
  };

  const onTab = (id) => {
    if (id === 'home') go({ screen: 'home' });
    else if (id === 'cats') go({ screen: 'cats' });
    else if (id === 'search') go({ screen: 'search' });
    else if (id === 'me') go({ screen: 'me' });
  };

  let content;
  if (route.screen === 'home') content = <HomeScreen go={go} />;
  else if (route.screen === 'cats') content = <CatsTabScreen go={go} />;
  else if (route.screen === 'category') content = <CategoryScreen catId={route.cat} go={go} />;
  else if (route.screen === 'detail') content = <DetailScreen catId={route.cat} itemId={route.item} go={go} />;
  else if (route.screen === 'search') content = <SearchScreen go={go} />;
  else if (route.screen === 'me') content = <MeScreen />;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#F2F2F7' }}>
      {/* scrolling content */}
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {content}
      </div>
      {/* bottom nav */}
      <BottomNav active={tab} onChange={onTab} onAdd={() => setAddOpen(true)} />
      {/* add sheet */}
      <AddSheet open={addOpen} onClose={() => setAddOpen(false)} go={go} />
    </div>
  );
}

window.App = App;
