import { useAppStore } from '../store/useAppStore'
import { BRIEFING_STATUS_LABELS, BRIEFING_STATUS_COLORS } from '../utils/helpers'
import type { Briefing } from '../types'

export function BriefingViewer() {
  const briefings = useAppStore((s) => s.briefings)
  if (briefings.length === 0) return <p className="text-slate-500 text-sm">No briefings generated yet.</p>
  return <div className="space-y-2">{briefings.map((b: Briefing) => (
    <div key={b.id} className="bg-slate-800/50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">{b.title}</span>
        <span className={`text-xs px-2 py-0.5 rounded ${BRIEFING_STATUS_COLORS[b.status]}`}>{BRIEFING_STATUS_LABELS[b.status]}</span>
      </div>
      <p className="text-xs text-slate-400 line-clamp-2">{b.summary}</p>
    </div>
  ))}</div>
}