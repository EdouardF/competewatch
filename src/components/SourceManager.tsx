import { useAppStore } from '../store/useAppStore'
import { SOURCE_LABELS, SOURCE_COLORS } from '../utils/helpers'
import type { Source } from '../types'

export function SourceManager() {
  const sources = useAppStore((s) => s.sources)
  if (sources.length === 0) return <p className="text-slate-500 text-sm">No sources configured.</p>
  return <div className="space-y-2">{sources.map((s: Source) => (
    <div key={s.id} className="bg-slate-800/50 rounded-lg p-3 flex items-center justify-between">
      <div><span className={`text-sm ${SOURCE_COLORS[s.type]}`}>{SOURCE_LABELS[s.type]}</span><p className="text-xs text-slate-500">{s.label}</p></div>
      <span className={`text-xs ${s.active ? 'text-emerald-400' : 'text-slate-500'}`}>{s.active ? 'Active' : 'Inactive'}</span>
    </div>
  ))}</div>
}