import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { brandColor } from '../brandColors'

const HOOK_TICKS = [1, 2, 3, 4, 5, 6]
const HOOK_LABELS = ['Low', 'Low-Med', 'Medium', 'Med-High', 'Mid-High', 'High']
const LENGTH_TICKS = [1, 2, 3, 4, 5, 6]
const LENGTH_LABELS = ['Short', 'Early-Med', 'Medium', 'Late-Med', 'Med-Long', 'Long']

function buildScatterData(balls) {
  const groups = new Map()

  return balls.map((ball) => {
    const key = `${ball.hook_score}:${ball.length_score}`
    const group = groups.get(key) ?? []
    const groupIndex = group.length
    groups.set(key, [...group, ball])

    if (groupIndex === 0) {
      return {
        ...ball,
        hook_score_plot: ball.hook_score,
        length_score_plot: ball.length_score,
      }
    }

    const angle = (groupIndex % 8) * (Math.PI / 4)
    const magnitude = 0.06 + Math.min(groupIndex, 6) * 0.01
    const hookOffset = Math.cos(angle) * magnitude
    const lengthOffset = Math.sin(angle) * magnitude

    return {
      ...ball,
      hook_score_plot: Math.min(6.5, Math.max(0.5, ball.hook_score + hookOffset)),
      length_score_plot: Math.min(6.5, Math.max(0.5, ball.length_score + lengthOffset)),
    }
  })
}

function BallShape(props) {
  const { cx, cy, fill, r = 8 } = props
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke="var(--lane)" strokeWidth={1.5} />
      <circle cx={cx - r * 0.32} cy={cy - r * 0.42} r={r * 0.14} fill="var(--lane)" />
      <circle cx={cx + r * 0.1} cy={cy - r * 0.48} r={r * 0.14} fill="var(--lane)" />
      <circle cx={cx + r * 0.4} cy={cy - r * 0.1} r={r * 0.14} fill="var(--lane)" />
    </g>
  )
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null
  const b = payload[0].payload
  return (
    <div
      style={{
        background: 'var(--maple-raised)',
        border: `1px solid ${brandColor(b.brand)}`,
        borderRadius: 4,
        padding: '10px 14px',
        fontFamily: 'var(--font-body)',
        maxWidth: 240,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--chalk)' }}>
        {b.ball_name}
      </div>
      <div style={{ fontSize: 11.5, color: brandColor(b.brand), marginBottom: 6 }}>
        {b.brand}
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--taupe)', lineHeight: 1.6 }}>
        <div>Hook: {b.hook_potential} · Length: {b.length}</div>
        <div>Backend: {b.backend}</div>
        <div style={{ fontFamily: 'var(--font-mono)', marginTop: 4 }}>
          RG {b.rg} · Diff {b.differential_raw || b.differential}
        </div>
      </div>
    </div>
  )
}

export default function DotPlot({ balls }) {
  const scatterData = buildScatterData(balls)

  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        background:
          'repeating-linear-gradient(90deg, var(--lane) 0px, var(--lane) 38px, rgba(140,130,114,0.05) 39px, var(--lane) 40px)',
      }}
    >
      <div style={{ marginBottom: 18 }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: 0.4,
            margin: 0,
            color: 'var(--chalk)',
            textTransform: 'uppercase',
          }}
        >
          Length vs. hook potential
        </h2>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--taupe)' }}>
          Select balls from the arsenal to plot them here.
        </p>
      </div>

      {balls.length === 0 ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--taupe)',
            fontSize: 14,
            border: '1px dashed var(--taupe-dim)',
            borderRadius: 8,
          }}
        >
          No balls selected yet — pick some from the list on the left.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 30, bottom: 20, left: 10 }}>
            <XAxis
              type="number"
              dataKey="hook_score_plot"
              domain={[0.5, 6.5]}
              ticks={HOOK_TICKS}
              tickFormatter={(v) => HOOK_LABELS[v - 1] || ''}
              stroke="var(--taupe)"
              tick={{ fill: 'var(--taupe)', fontSize: 11 }}
              label={{
                value: 'Hook potential →',
                position: 'insideBottom',
                offset: -10,
                fill: 'var(--taupe)',
                fontSize: 12,
              }}
            />
            <YAxis
              type="number"
              dataKey="length_score_plot"
              domain={[0.5, 6.5]}
              ticks={LENGTH_TICKS}
              tickFormatter={(v) => LENGTH_LABELS[v - 1] || ''}
              stroke="var(--taupe)"
              tick={{ fill: 'var(--taupe)', fontSize: 11 }}
              label={{
                value: 'Length →',
                angle: -90,
                position: 'insideLeft',
                fill: 'var(--taupe)',
                fontSize: 12,
              }}
            />
            <ZAxis range={[64, 64]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter
              data={scatterData}
              shape={(props) => (
                <BallShape {...props} fill={brandColor(props.payload.brand)} />
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
