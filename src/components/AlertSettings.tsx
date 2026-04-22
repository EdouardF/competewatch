import { useAppStore } from '../store/useAppStore'
import { SEVERITY_LABELS, SEVERITY_COLORS } from '../utils/helpers'
import type { Alert } from '../types'

export function AlertSettings() {
  const alerts = useAppStore((s) => s.alerts)
  const markRead = useAppStore((s) => s.updateAlert)
  if (alerts.length === 0) return <p className="text-slate-500 text-sm">No alerts.</p>
  return <div className="space-y-2">{alerts.map((a: Alert) => (
    <div key={a.id} className={`bg-slate-800/50 rounded-lg p-3 ${a.read ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs px-2 py-0.5 rounded ${SEVERITY_COLORS[a.severity]}`}>{SEVERITY_LABELS[a.severity]}</span>
        {!a.read && <button onClick={() => markRead(a.id, { read: true })} className="text-xs text-blue-400 hover:underline">Mark read</button>}
      </div>
      <p className="text-sm">{a.message}</p>
      <p className="text-xs text-slate-500 mt-1">via {a.source}</p>
    </div>
  ))}</div>
}