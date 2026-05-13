// 정보창고 — 화면 컴포넌트

const { useState, useEffect, useMemo, useRef } = React;

// ─────────────────────────────────────────────────────────────
// Atoms
// ─────────────────────────────────────────────────────────────
function GradientGlyph({ cat, size = 56, radius = 18, fontSize }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: cat.grad,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 800, fontSize: fontSize || size * 0.5,
      letterSpacing: '-0.02em',
      boxShadow: `0 6px 16px -4px ${cat.accent}55, inset 0 1px 0 rgba(255,255,255,0.25)`,
      flexShrink: 0,
    }}>{cat.glyph}</div>
  );
}

function ImageSlot({ cat, height = 120, label }) {
  // colorful placeholder: soft gradient bg + diagonal stripes + label
  return (
    <div style={{
      height, borderRadius: 18, overflow: 'hidden',
      background: cat.soft, position: 'relative',
      border: '1px solid rgba(0,0,0,0.04)',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(135deg, transparent 0 12px, ${cat.accent}10 12px 13px)`,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 10, color: cat.accent, opacity: 0.7, letterSpacing: 0.5,
      }}>{label || '이미지 자리'}</div>
      <div style={{
        position: 'absolute', top: 10, left: 12,
        fontSize: 11, fontWeight: 600, color: cat.accent, opacity: 0.55,
      }}>{cat.name}</div>
    </div>
  );
}

function Star({ filled, size = 16, color = '#FBBF24' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16">
      <path d="M8 1.5l1.9 4.1 4.5.4-3.4 3 1 4.4L8 11.2 3.9 13.4l1-4.4-3.4-3 4.5-.4z"
        fill={filled ? color : 'none'} stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ size = 14, color = '#9CA3AF' }) {
  return <svg width={size} height={size} viewBox="0 0 14 14"><path d="M5 3l4 4-4 4" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function SearchIcon({ size = 18, color = '#6B7280' }) {
  return <svg width={size} height={size} viewBox="0 0 18 18"><circle cx="8" cy="8" r="5.5" fill="none" stroke={color} strokeWidth="1.8"/><path d="M12.5 12.5l3 3" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>;
}

// ─────────────────────────────────────────────────────────────
// Home
// ─────────────────────────────────────────────────────────────
function HomeScreen({ go }) {
  const recent = recentItems(6);
  const favs = favItems().slice(0, 3);
  const total = allItems().length;
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일`;

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* spacer for status bar */}
      <div style={{ height: 56 }} />

      {/* Greeting */}
      <div style={{ padding: '8px 22px 0' }}>
        <div style={{ fontSize: 13, color: '#8E8E93', fontWeight: 500 }}>{dateStr}</div>
        <h1 style={{
          margin: '6px 0 0', fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em',
          lineHeight: 1.1, color: '#0A0A0A',
        }}>
          <span style={{
            background: 'linear-gradient(120deg, #FF6B9D 0%, #A855F7 50%, #3B82F6 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>정보창고</span>
        </h1>
        <div style={{ marginTop: 8, fontSize: 15, color: '#3A3A3C', fontWeight: 500 }}>
          오늘까지 <b style={{ color: '#0A0A0A' }}>{total}개</b>의 항목이 모였어요
        </div>
      </div>

      {/* Search */}
      <button onClick={() => go({ screen: 'search' })} style={{
        margin: '20px 22px 0', width: 'calc(100% - 44px)',
        background: '#fff', border: 'none',
        borderRadius: 14, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px -8px rgba(0,0,0,0.08)',
        cursor: 'pointer', textAlign: 'left',
      }}>
        <SearchIcon />
        <span style={{ color: '#9CA3AF', fontSize: 15, fontWeight: 500 }}>제목, 태그, 메모 검색…</span>
      </button>

      {/* Featured card — first recent item */}
      {recent[0] && (
        <button onClick={() => go({ screen: 'detail', cat: recent[0].cat.id, item: recent[0].id })} style={{
          display: 'block', width: 'calc(100% - 44px)', margin: '22px 22px 0',
          border: 'none', padding: 0, background: 'transparent',
          textAlign: 'left', cursor: 'pointer',
        }}>
          <div style={{
            borderRadius: 26, padding: 22, position: 'relative', overflow: 'hidden',
            background: recent[0].cat.grad, color: '#fff', minHeight: 168,
            boxShadow: `0 16px 40px -16px ${recent[0].cat.accent}88`,
          }}>
            <div style={{
              position: 'absolute', right: -40, top: -40, width: 180, height: 180,
              borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
            }} />
            <div style={{ position: 'absolute', right: 20, bottom: 20, fontSize: 92, fontWeight: 900, opacity: 0.18, lineHeight: 1 }}>
              {recent[0].cat.glyph}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, opacity: 0.85 }}>방금 추가됨</div>
            <div style={{ marginTop: 12, fontSize: 13, opacity: 0.9 }}>{recent[0].cat.name}</div>
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {recent[0].title}
            </div>
            <div style={{ fontSize: 13, opacity: 0.9, marginTop: 6 }}>{recent[0].sub}</div>
          </div>
        </button>
      )}

      {/* Categories grid */}
      <div style={{ marginTop: 32, padding: '0 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>카테고리</h2>
          <div style={{ fontSize: 12, color: '#8E8E93', fontWeight: 600 }}>{CATEGORIES.length}개</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => go({ screen: 'category', cat: cat.id })} style={{
              border: 'none', padding: 16, borderRadius: 20, background: '#fff',
              textAlign: 'left', cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 14px -6px rgba(0,0,0,0.06)',
              display: 'flex', flexDirection: 'column', gap: 14, minHeight: 124,
            }}>
              <GradientGlyph cat={cat} size={48} radius={14} fontSize={22} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>{cat.name}</div>
                <div style={{ fontSize: 12, color: '#8E8E93', marginTop: 2, fontWeight: 500 }}>{cat.count}개 항목</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent list */}
      <div style={{ marginTop: 32, padding: '0 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>최근 추가</h2>
          <div style={{ fontSize: 12, color: '#0A84FF', fontWeight: 600 }}>모두 보기</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden' }}>
          {recent.slice(0, 5).map((it, i) => (
            <button key={it.id} onClick={() => go({ screen: 'detail', cat: it.cat.id, item: it.id })} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', border: 'none', background: 'transparent',
              borderTop: i === 0 ? 'none' : '1px solid #F2F2F7',
              cursor: 'pointer', textAlign: 'left',
            }}>
              <GradientGlyph cat={it.cat} size={40} radius={12} fontSize={18} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.title}</div>
                <div style={{ fontSize: 12, color: '#8E8E93', marginTop: 2,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.sub}</div>
              </div>
              {it.fav && <Star filled size={14} />}
              <ChevronRight />
            </button>
          ))}
        </div>
      </div>

      {/* Favorites */}
      {favs.length > 0 && (
        <div style={{ marginTop: 32, padding: '0 22px' }}>
          <h2 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>
            ⭐ 즐겨찾기
          </h2>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', margin: '0 -22px', padding: '0 22px',
            scrollbarWidth: 'none' }}>
            {favs.map(it => (
              <button key={it.id} onClick={() => go({ screen: 'detail', cat: it.cat.id, item: it.id })} style={{
                flexShrink: 0, width: 168, border: 'none', padding: 0, background: 'transparent',
                cursor: 'pointer', textAlign: 'left',
              }}>
                <ImageSlot cat={it.cat} height={108} label="사진" />
                <div style={{ marginTop: 10, fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.title}</div>
                <div style={{ fontSize: 11, color: '#8E8E93', marginTop: 2, fontWeight: 500 }}>{it.cat.name} · {it.tag}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

window.HomeScreen = HomeScreen;
window.GradientGlyph = GradientGlyph;
window.ImageSlot = ImageSlot;
window.Star = Star;
window.ChevronRight = ChevronRight;
window.SearchIcon = SearchIcon;
