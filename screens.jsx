// 정보창고 — 카테고리 / 상세 / 검색 화면

const { useState: useState2, useMemo: useMemo2, useRef: useRef2, useEffect: useEffect2 } = React;

// ─────────────────────────────────────────────────────────────
// Category screen
// ─────────────────────────────────────────────────────────────
function CategoryScreen({ catId, go }) {
  const cat = CATEGORIES.find(c => c.id === catId);
  const items = ITEMS[catId] || [];
  const [filter, setFilter] = useState2('all');
  const [q, setQ] = useState2('');

  const filtered = useMemo2(() => {
    let list = items;
    if (filter === 'fav') list = list.filter(i => i.fav);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(i =>
        i.title.toLowerCase().includes(s) ||
        i.sub.toLowerCase().includes(s) ||
        (i.note || '').toLowerCase().includes(s)
      );
    }
    return list;
  }, [items, filter, q]);

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* gradient header */}
      <div style={{
        background: cat.grad, padding: '64px 22px 90px',
        color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        {/* decorative blobs */}
        <div style={{ position: 'absolute', right: -60, top: -40, width: 220, height: 220, borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)' }} />
        <div style={{ position: 'absolute', left: -40, bottom: -80, width: 180, height: 180, borderRadius: '50%',
          background: 'rgba(255,255,255,0.10)' }} />
        <div style={{
          position: 'absolute', right: 22, bottom: 22, fontSize: 140, fontWeight: 900, opacity: 0.18, lineHeight: 1,
        }}>{cat.glyph}</div>

        {/* back */}
        <button onClick={() => go({ screen: 'home' })} style={{
          background: 'rgba(255,255,255,0.22)', border: 'none', color: '#fff',
          width: 36, height: 36, borderRadius: 18, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(10px)',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 3L5 7l4 4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div style={{ marginTop: 22, position: 'relative' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, opacity: 0.85 }}>CATEGORY</div>
          <h1 style={{ margin: '6px 0 0', fontSize: 38, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
            {cat.name}
          </h1>
          <div style={{ marginTop: 10, fontSize: 14, opacity: 0.9, fontWeight: 500 }}>
            총 {items.length}개 · 즐겨찾기 {items.filter(i => i.fav).length}개
          </div>
        </div>
      </div>

      {/* search + filters — overlapping */}
      <div style={{ padding: '0 22px', marginTop: -28, position: 'relative', zIndex: 5 }}>
        <div style={{
          background: '#fff', borderRadius: 14, padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 8px 24px -10px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.04)',
        }}>
          <SearchIcon />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={`${cat.name}에서 검색…`}
            style={{
              flex: 1, border: 'none', outline: 'none', fontSize: 15,
              fontFamily: 'inherit', background: 'transparent',
            }}
          />
          {q && (
            <button onClick={() => setQ('')} style={{
              border: 'none', background: '#E5E7EB', borderRadius: 999,
              width: 20, height: 20, fontSize: 12, cursor: 'pointer', color: '#6B7280',
            }}>×</button>
          )}
        </div>

        {/* filter pills */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { id: 'all', label: `전체 ${items.length}` },
            { id: 'fav', label: `★ 즐겨찾기 ${items.filter(i=>i.fav).length}` },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              flexShrink: 0, border: 'none', cursor: 'pointer',
              padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600,
              fontFamily: 'inherit',
              background: filter === f.id ? cat.accent : '#fff',
              color: filter === f.id ? '#fff' : '#3A3A3C',
              boxShadow: filter === f.id ? `0 4px 12px -4px ${cat.accent}66` : 'none',
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      {/* results */}
      <div style={{ padding: '20px 22px 0' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: '#8E8E93', fontSize: 14 }}>
            검색 결과가 없어요
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {filtered.map(it => (
              <button key={it.id} onClick={() => go({ screen: 'detail', cat: cat.id, item: it.id })} style={{
                border: 'none', padding: 0, background: '#fff', borderRadius: 18,
                overflow: 'hidden', cursor: 'pointer', textAlign: 'left',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -6px rgba(0,0,0,0.06)',
              }}>
                <div style={{ position: 'relative' }}>
                  <ImageSlot cat={cat} height={104} label="이미지" />
                  {it.fav && (
                    <div style={{
                      position: 'absolute', top: 8, right: 8,
                      background: 'rgba(255,255,255,0.95)', borderRadius: 999,
                      width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    }}>
                      <Star filled size={14} />
                    </div>
                  )}
                </div>
                <div style={{ padding: '12px 14px 14px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {it.title}
                  </div>
                  <div style={{ fontSize: 11, color: '#8E8E93', marginTop: 4, fontWeight: 500,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.sub}</div>
                  <div style={{ marginTop: 8, display: 'inline-block',
                    background: cat.soft, color: cat.accent,
                    padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                  }}>{it.tag}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Detail screen
// ─────────────────────────────────────────────────────────────
function DetailScreen({ catId, itemId, go }) {
  const cat = CATEGORIES.find(c => c.id === catId);
  const item = (ITEMS[catId] || []).find(i => i.id === itemId);
  const [fav, setFav] = useState2(item?.fav || false);

  if (!item) return <div style={{ padding: 40 }}>항목을 찾을 수 없어요.</div>;

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* gradient hero */}
      <div style={{
        background: cat.grad, padding: '64px 22px 32px',
        color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -80, top: -60, width: 260, height: 260, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ position: 'absolute', right: 30, bottom: -30, fontSize: 200, fontWeight: 900, opacity: 0.13, lineHeight: 1 }}>
          {cat.glyph}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <button onClick={() => go({ screen: 'category', cat: catId })} style={{
            background: 'rgba(255,255,255,0.22)', border: 'none', color: '#fff',
            width: 36, height: 36, borderRadius: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 3L5 7l4 4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => setFav(!fav)} style={{
            background: 'rgba(255,255,255,0.22)', border: 'none',
            width: 36, height: 36, borderRadius: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <Star filled={fav} size={16} color="#fff" />
          </button>
        </div>

        <div style={{ marginTop: 28, position: 'relative' }}>
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: 1,
            background: 'rgba(255,255,255,0.25)', padding: '4px 10px', borderRadius: 999,
            backdropFilter: 'blur(10px)',
          }}>{cat.name}</div>
          <h1 style={{ margin: '14px 0 0', fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            {item.title}
          </h1>
          <div style={{ marginTop: 8, fontSize: 14, opacity: 0.9, fontWeight: 500 }}>{item.sub}</div>
          <div style={{ marginTop: 14, display: 'inline-flex', gap: 8, alignItems: 'center',
            background: 'rgba(255,255,255,0.22)', padding: '6px 12px', borderRadius: 10,
            fontSize: 12, fontWeight: 700, backdropFilter: 'blur(10px)',
          }}>{item.tag}</div>
        </div>
      </div>

      {/* image slot */}
      <div style={{ padding: '20px 22px 0' }}>
        <ImageSlot cat={cat} height={180} label="대표 이미지 자리" />
      </div>

      {/* fields */}
      {item.fields && item.fields.length > 0 && (
        <div style={{ padding: '24px 22px 0' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: '#8E8E93', letterSpacing: 0.5 }}>
            정보
          </h3>
          <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden' }}>
            {item.fields.map(([k, v], i) => (
              <div key={k} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 16px',
                borderTop: i === 0 ? 'none' : '1px solid #F2F2F7',
              }}>
                <div style={{ fontSize: 14, color: '#6B7280', fontWeight: 500 }}>{k}</div>
                <div style={{ fontSize: 14, color: '#0A0A0A', fontWeight: 600, textAlign: 'right' }}>{v}</div>
              </div>
            ))}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 16px', borderTop: '1px solid #F2F2F7',
            }}>
              <div style={{ fontSize: 14, color: '#6B7280', fontWeight: 500 }}>추가일</div>
              <div style={{ fontSize: 14, color: '#0A0A0A', fontWeight: 600 }}>{item.date}</div>
            </div>
          </div>
        </div>
      )}

      {/* note */}
      {item.note && (
        <div style={{ padding: '24px 22px 0' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: '#8E8E93', letterSpacing: 0.5 }}>
            메모
          </h3>
          <div style={{
            background: cat.soft, borderRadius: 16, padding: 18,
            fontSize: 14, lineHeight: 1.6, color: '#1F2937', fontWeight: 500,
            borderLeft: `3px solid ${cat.accent}`,
          }}>{item.note}</div>
        </div>
      )}

      {/* actions */}
      <div style={{ padding: '24px 22px 0', display: 'flex', gap: 10 }}>
        <button style={{
          flex: 1, border: 'none', cursor: 'pointer',
          background: cat.grad, color: '#fff',
          padding: '14px', borderRadius: 14, fontSize: 15, fontWeight: 700,
          fontFamily: 'inherit',
          boxShadow: `0 8px 20px -8px ${cat.accent}88`,
        }}>편집하기</button>
        <button style={{
          border: 'none', cursor: 'pointer', background: '#fff',
          padding: '14px 18px', borderRadius: 14, fontSize: 15, fontWeight: 700,
          color: '#0A0A0A', fontFamily: 'inherit',
        }}>공유</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Search overlay screen
// ─────────────────────────────────────────────────────────────
function SearchScreen({ go }) {
  const [q, setQ] = useState2('');
  const inputRef = useRef2(null);
  useEffect2(() => { inputRef.current?.focus(); }, []);

  const results = useMemo2(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return allItems().filter(it =>
      it.title.toLowerCase().includes(s) ||
      it.sub.toLowerCase().includes(s) ||
      (it.note || '').toLowerCase().includes(s) ||
      it.cat.name.includes(s)
    ).slice(0, 20);
  }, [q]);

  const suggestions = ['영화', '커피', '제주', '책', '5월'];

  return (
    <div style={{ paddingBottom: 100, background: '#F2F2F7', minHeight: '100%' }}>
      <div style={{ height: 56 }} />
      <div style={{ padding: '4px 22px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => go({ screen: 'home' })} style={{
          border: 'none', background: 'transparent', cursor: 'pointer',
          fontSize: 15, color: '#0A84FF', fontWeight: 600, padding: 0,
        }}>취소</button>
        <div style={{
          flex: 1, background: '#fff', borderRadius: 12, padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <SearchIcon />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="제목, 태그, 메모 검색…"
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15,
              fontFamily: 'inherit', background: 'transparent' }}
          />
          {q && (
            <button onClick={() => setQ('')} style={{
              border: 'none', background: '#E5E7EB', borderRadius: 999,
              width: 20, height: 20, fontSize: 12, cursor: 'pointer', color: '#6B7280',
            }}>×</button>
          )}
        </div>
      </div>

      {!q.trim() ? (
        <div style={{ padding: '24px 22px 0' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: '#8E8E93', letterSpacing: 0.5 }}>
            추천 검색어
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => setQ(s)} style={{
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                background: '#fff', padding: '8px 14px', borderRadius: 999,
                fontSize: 13, fontWeight: 600, color: '#3A3A3C',
              }}>{s}</button>
            ))}
          </div>

          <h3 style={{ margin: '28px 0 12px', fontSize: 13, fontWeight: 700, color: '#8E8E93', letterSpacing: 0.5 }}>
            카테고리로 찾기
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => go({ screen: 'category', cat: cat.id })} style={{
                border: 'none', padding: '12px', borderRadius: 14, background: '#fff',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
              }}>
                <GradientGlyph cat={cat} size={36} radius={10} fontSize={16} />
                <div style={{ fontSize: 14, fontWeight: 700 }}>{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: '20px 22px 0' }}>
          <div style={{ fontSize: 13, color: '#8E8E93', marginBottom: 12, fontWeight: 600 }}>
            {results.length}개 결과
          </div>
          {results.length === 0 ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: '#8E8E93', fontSize: 14 }}>
              "{q}"에 대한 결과가 없어요
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden' }}>
              {results.map((it, i) => (
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
                    <div style={{ fontSize: 12, color: '#8E8E93', marginTop: 2 }}>{it.cat.name} · {it.sub}</div>
                  </div>
                  <ChevronRight />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

window.CategoryScreen = CategoryScreen;
window.DetailScreen = DetailScreen;
window.SearchScreen = SearchScreen;
