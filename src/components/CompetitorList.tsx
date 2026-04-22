import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { useAppStore } from '../store/useAppStore'
import { SOURCE_LABELS, SOURCE_COLORS, formatDate } from '../utils/helpers'
import type { SourceType } from '../types'

export function CompetitorList() {
  const { t } = useI18n()
  const competitors = useAppStore((s) => s.competitors)
  const sources = useAppStore((s) => s.sources)
  const selectedCompetitor = useAppStore((s) => s.selectedCompetitor)
  const setSelectedCompetitor = useAppStore((s) => s.setSelectedCompetitor)
  const deleteCompetitor = useAppStore((s) => s.deleteCompetitor)
  const addCompetitor = useAppStore((s) => s.addCompetitor)
  const addSource = useAppStore((s) => s.addSource)
  const deleteSource = useAppStore((s) => s.deleteSource)
  const updateSource = useAppStore((s) => s.updateSource)
  const [showAdd, setShowAdd] = useState(false)
  const [showAddSource, setShowAddSource] = useState(false)

  if (competitors.length === 0 && !showAdd) return (
    <div className="space-y-2">
      <p className="text-slate-500 text-sm">{t('noCompetitors')}</p>
      <button onClick={() => setShowAdd(true)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addCompetitor')}</button>
    </div>
  )

  const competitorSources = (cid: string) => sources.filter((s) => s.competitorId === cid)

  return (
    <div className="space-y-3">
      {competitors.map((c) => (
        <div key={c.id} onClick={() => setSelectedCompetitor(c.id === selectedCompetitor ? null : c.id)}
          className={`bg-slate-800/50 rounded-lg p-3 cursor-pointer hover:bg-slate-700/50 transition-colors border ${c.id === selectedCompetitor ? 'border-violet-500' : 'border-transparent'}`}>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium">{c.name}</p>
            <span className="text-xs text-slate-500">{formatDate(c.lastUpdated)}</span>
          </div>
          <p className="text-xs text-slate-500">{c.website}</p>
          {c.alertCount > 0 && <p className="text-xs text-rose-400 mt-1">{c.alertCount} {t('alerts')}</p>}
          {competitorSources(c.id).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {competitorSources(c.id).map((s) => (
                <span key={s.id} className={`text-xs px-2 py-0.5 rounded bg-slate-700 ${SOURCE_COLORS[s.type]} ${!s.active ? 'opacity-50' : ''}`}>
                  {SOURCE_LABELS[s.type]}
                </span>
              ))}
            </div>
          )}
          {c.id === selectedCompetitor && (
            <div className="flex gap-2 mt-2">
              {!showAddSource && <button onClick={(e) => { e.stopPropagation(); setShowAddSource(true) }} className="text-xs text-violet-400 hover:text-violet-300">{t('addSource')}</button>}
              <button onClick={(e) => { e.stopPropagation(); deleteCompetitor(c.id) }} className="text-xs text-rose-400 hover:text-rose-300">{t('delete')}</button>
            </div>
          )}
        </div>
      ))}
      {showAddSource && selectedCompetitor && (
        <div className="bg-slate-800/50 rounded-lg p-3 space-y-2">
          <select id="src-type" className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm">
            {Object.entries(SOURCE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <input id="src-label" placeholder={t('name')} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm" />
          <div className="flex gap-2">
            <button onClick={() => {
              const type = (document.getElementById('src-type') as HTMLSelectElement).value as SourceType
              const label = (document.getElementById('src-label') as HTMLInputElement).value
              if (!label) return
              addSource({ id: Math.random().toString(36).substring(2, 10) + Date.now().toString(36), competitorId: selectedCompetitor, type, label, active: true })
              setShowAddSource(false)
            }} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('save')}</button>
            <button onClick={() => setShowAddSource(false)} className="text-xs text-slate-400">{t('cancel')}</button>
          </div>
        </div>
      )}
      {showAdd ? (
        <div className="bg-slate-800/50 rounded-lg p-3 space-y-2">
          <input id="comp-name" placeholder={t('name')} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm" />
          <input id="comp-web" placeholder={t('website')} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm" />
          <div className="flex gap-2">
            <button onClick={() => {
              const name = (document.getElementById('comp-name') as HTMLInputElement).value
              const website = (document.getElementById('comp-web') as HTMLInputElement).value
              if (!name) return
              addCompetitor({ id: Math.random().toString(36).substring(2, 10) + Date.now().toString(36), name, website: website || '', lastUpdated: new Date().toISOString().split('T')[0], alertCount: 0 })
              setShowAdd(false)
            }} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('save')}</button>
            <button onClick={() => setShowAdd(false)} className="text-xs text-slate-400">{t('cancel')}</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowAdd(true)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addCompetitor')}</button>
      )}
    </div>
  )
}