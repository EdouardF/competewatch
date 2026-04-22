import { useI18n } from '../i18n/I18nProvider'
import { useAppStore } from '../store/useAppStore'
import { SOURCE_LABELS, SOURCE_COLORS } from '../utils/helpers'
import type { SourceType } from '../types'

export function SourceManager() {
  const { t } = useI18n()
  const sources = useAppStore((s) => s.sources)
  const updateSource = useAppStore((s) => s.updateSource)
  const deleteSource = useAppStore((s) => s.deleteSource)

  if (sources.length === 0) return <p className="text-slate-500 text-sm">{t('noSources')}</p>

  return (
    <div className="space-y-2">
      {sources.map((s) => (
        <div key={s.id} className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm ${SOURCE_COLORS[s.type]}`}>{SOURCE_LABELS[s.type]}</span>
            <span className={`text-xs px-2 py-0.5 rounded ${s.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}`}>
              {s.active ? t('active') : t('inactive')}
            </span>
          </div>
          <p className="text-xs text-slate-500">{s.label}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => updateSource(s.id, { active: !s.active })} className="text-xs text-violet-400 hover:text-violet-300">{t('toggleActive')}</button>
            <button onClick={() => deleteSource(s.id)} className="text-xs text-rose-400 hover:text-rose-300">{t('delete')}</button>
          </div>
        </div>
      ))}
    </div>
  )
}