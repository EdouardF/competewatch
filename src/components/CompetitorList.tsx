import { useAppStore } from '../store/useAppStore'
import { formatDate } from '../utils/helpers'
import type { Competitor } from '../types'

export function CompetitorList() {
  const competitors = useAppStore((s) => s.competitors)
  if (competitors.length === 0) return <p className="text-slate-500 text-sm">No competitors tracked.</p>
  return <div className="space-y-2">{competitors.map((c: Competitor) => (
    <div key={c.id} className="bg-slate-800/50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">{c.name}</span>
        <span className="text-xs text-slate-500">{c.alertCount} alerts</span>
      </div>
      <div className="text-xs text-slate-500 flex justify-between">
        <span>{c.website}</span><span>{formatDate(c.lastUpdated)}</span>
      </div>
    </div>
  ))}</div>
}