import { useI18n } from '../i18n/I18nProvider'
import { useAppStore } from '../store/useAppStore'
import { BRIEFING_STATUS_LABELS, BRIEFING_STATUS_COLORS, formatDate } from '../utils/helpers'
import type { BriefingStatus } from '../types'

export function BriefingViewer() {
  const { t } = useI18n()
  const briefings = useAppStore((s) => s.briefings)
  const filterStatus = useAppStore((s) => s.filterStatus)
  const setFilterStatus = useAppStore((s) => s.setFilterStatus)
  const updateBriefing = useAppStore((s) => s.updateBriefing)
  const deleteBriefing = useAppStore((s) => s.deleteBriefing)

  const filtered = filterStatus ? briefings.filter((b) => b.status === filterStatus) : briefings

  if (briefings.length === 0) return <p className="text-slate-500 text-sm">{t('noBriefings')}</p>

  return (
    <div className="space-y-3">
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as BriefingStatus | '')}
        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white">
        <option value="">{t('all')} — {t('filterStatus')}</option>
        {Object.entries(BRIEFING_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
      <div className="space-y-2">
        {filtered.map((b) => (
          <div key={b.id} className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs px-2 py-0.5 rounded ${BRIEFING_STATUS_COLORS[b.status]}`}>{BRIEFING_STATUS_LABELS[b.status]}</span>
              <span className="text-xs text-slate-500">{formatDate(b.generatedAt)}</span>
            </div>
            <p className="text-sm font-medium">{b.title}</p>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{b.summary}</p>
            <div className="flex gap-2 mt-2">
              {b.status === 'draft' && <button onClick={() => updateBriefing(b.id, { status: 'ready' })} className="text-xs text-emerald-400 hover:text-emerald-300">{BRIEFING_STATUS_LABELS.ready}</button>}
              {b.status === 'ready' && <button onClick={() => updateBriefing(b.id, { status: 'sent' })} className="text-xs text-blue-400 hover:text-blue-300">{BRIEFING_STATUS_LABELS.sent}</button>}
              <button onClick={() => deleteBriefing(b.id)} className="text-xs text-rose-400 hover:text-rose-300">{t('delete')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}