import { useI18n } from '../i18n/I18nProvider'
import { useAppStore } from '../store/useAppStore'
import { SEVERITY_LABELS, SEVERITY_COLORS, formatDate } from '../utils/helpers'
import type { AlertSeverity } from '../types'

export function AlertSettings() {
  const { t } = useI18n()
  const alerts = useAppStore((s) => s.alerts)
  const filterSeverity = useAppStore((s) => s.filterSeverity)
  const setFilterSeverity = useAppStore((s) => s.setFilterSeverity)
  const updateAlert = useAppStore((s) => s.updateAlert)
  const deleteAlert = useAppStore((s) => s.deleteAlert)

  const filtered = filterSeverity ? alerts.filter((a) => a.severity === filterSeverity) : alerts

  if (alerts.length === 0) return <p className="text-slate-500 text-sm">{t('noAlerts')}</p>

  return (
    <div className="space-y-3">
      <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value as AlertSeverity | '')}
        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white">
        <option value="">{t('all')} — {t('severity')}</option>
        {Object.entries(SEVERITY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
      <div className="space-y-2">
        {filtered.map((a) => (
          <div key={a.id} className={`bg-slate-800/50 rounded-lg p-3 ${!a.read ? 'border-l-2 border-violet-500' : ''}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs px-2 py-0.5 rounded ${SEVERITY_COLORS[a.severity]}`}>{SEVERITY_LABELS[a.severity]}</span>
              <span className="text-xs text-slate-500">{formatDate(a.timestamp)}</span>
            </div>
            <p className="text-sm">{a.message}</p>
            <p className="text-xs text-slate-500">{a.source}</p>
            <div className="flex gap-2 mt-2">
              {!a.read && <button onClick={() => updateAlert(a.id, { read: true })} className="text-xs text-violet-400 hover:text-violet-300">{t('markRead')}</button>}
              <button onClick={() => deleteAlert(a.id)} className="text-xs text-rose-400 hover:text-rose-300">{t('delete')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}