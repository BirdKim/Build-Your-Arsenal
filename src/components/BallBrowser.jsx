import { useMemo, useState } from 'react'
import { BRANDS, brandColor } from '../brandColors'

export default function BallBrowser({ balls, selectedIds, onToggle }) {
  const [query, setQuery] = useState('')
  const [activeBrands, setActiveBrands] = useState(new Set(BRANDS))

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return balls.filter((b) => {
      if (!activeBrands.has(b.brand)) return false
      if (!q) return true
      return (
        b.ball_name.toLowerCase().includes(q) ||
        b.brand.toLowerCase().includes(q) ||
        (b.core_name || '').toLowerCase().includes(q)
      )
    })
  }, [balls, query, activeBrands])

  function toggleBrand(brand) {
    setActiveBrands((prev) => {
      const next = new Set(prev)
      if (next.has(brand)) next.delete(brand)
      else next.add(brand)
      return next
    })
  }

  return (
    <div
      style={{
        width: 320,
        flexShrink: 0,
        background: 'var(--maple)',
        borderRight: '1px solid var(--taupe-dim)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ padding: '20px 20px 12px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: 0.5,
            margin: '0 0 4px',
            color: 'var(--chalk)',
            textTransform: 'uppercase',
          }}
        >
          Arsenal
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--taupe)' }}>
          {selectedIds.size} of {balls.length} balls on the board
        </p>
      </div>

      <div style={{ padding: '0 20px 12px' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ball or core name..."
          style={{
            width: '100%',
            padding: '9px 12px',
            background: 'var(--lane)',
            border: '1px solid var(--taupe-dim)',
            borderRadius: 4,
            color: 'var(--chalk)',
            fontSize: 14,
            outline: 'none',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          padding: '0 20px 16px',
        }}
      >
        {BRANDS.map((brand) => {
          const active = activeBrands.has(brand)
          return (
            <button
              key={brand}
              onClick={() => toggleBrand(brand)}
              style={{
                fontSize: 11,
                padding: '4px 9px',
                borderRadius: 999,
                border: `1px solid ${active ? brandColor(brand) : 'var(--taupe-dim)'}`,
                background: active ? `${brandColor(brand)}22` : 'transparent',
                color: active ? 'var(--chalk)' : 'var(--taupe)',
                cursor: 'pointer',
                letterSpacing: 0.3,
              }}
            >
              {brand}
            </button>
          )
        })}
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          borderTop: '1px solid var(--taupe-dim)',
        }}
      >
        {filtered.length === 0 && (
          <p style={{ padding: 20, color: 'var(--taupe)', fontSize: 13 }}>
            No balls match that search.
          </p>
        )}
        {filtered.map((b) => {
          const selected = selectedIds.has(b.id)
          return (
            <button
              key={b.id}
              onClick={() => onToggle(b.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                textAlign: 'left',
                padding: '10px 20px',
                background: selected ? 'var(--maple-raised)' : 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(140,130,114,0.15)',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: brandColor(b.brand),
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: 13.5,
                    color: 'var(--chalk)',
                    fontWeight: selected ? 600 : 400,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {b.ball_name}
                </span>
                <span style={{ fontSize: 11.5, color: 'var(--taupe)' }}>
                  {b.brand}
                </span>
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--taupe)',
                }}
              >
                {selected ? '−' : '+'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
