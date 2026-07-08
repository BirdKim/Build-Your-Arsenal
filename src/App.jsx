import { useMemo, useState } from 'react'
import BallBrowser from './components/BallBrowser.jsx'
import DotPlot from './components/DotPlot.jsx'
import SelectedTray from './components/SelectedTray.jsx'
import balls from './data/balls.json'

export default function App() {
  const [selectedIds, setSelectedIds] = useState(new Set())

  function toggle(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function remove(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function clear() {
    setSelectedIds(new Set())
  }

  const selectedBalls = useMemo(
    () => balls.filter((b) => selectedIds.has(b.id)),
    [selectedIds],
  )

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <BallBrowser balls={balls} selectedIds={selectedIds} onToggle={toggle} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <SelectedTray balls={selectedBalls} onRemove={remove} onClear={clear} />
        <DotPlot balls={selectedBalls} />
      </div>
    </div>
  )
}
