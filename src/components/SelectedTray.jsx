import { brandColor } from '../brandColors'

export default function SelectedTray({ balls, onRemove, onClear }) {
  if (balls.length === 0) return null
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
        padding: '0 32px 16px',
      }}
    >
      {balls.map((b) => (
        <span
          key={b.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            padding: '5px 6px 5px 10px',
            borderRadius: 999,
            background: 'var(--maple-raised)',
            border: `1px solid ${brandColor(b.brand)}`,
            color: 'var(--chalk)',
          }}
        >
          {b.ball_name}
          <button
            onClick={() => onRemove(b.id)}
            aria-label={`Remove ${b.ball_name}`}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--taupe)',
              cursor: 'pointer',
              fontSize: 13,
              lineHeight: 1,
              padding: '2px 4px',
            }}
          >
            ×
          </button>
        </span>
      ))}
      {balls.length > 1 && (
        <button
          onClick={onClear}
          style={{
            fontSize: 12,
            color: 'var(--taupe)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          clear all
        </button>
      )}
    </div>
  )
}
