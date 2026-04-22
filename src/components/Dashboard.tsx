import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { useAppStore, useCompetitorStats } from '../store/useAppStore'
import { BRIEFING_STATUS_LABELS, generateId } from '../utils/helpers'
import type { BriefingStatus } from '../types'
import { CompetitorList } from './CompetitorList'
import { BriefingViewer } from './BriefingViewer'
import { AlertSettings } from './AlertSettings'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSelector } from './LanguageSelector'

export function Dashboard() {
  const { t } = useI18n()
  const stats = useCompetitorStats()
  const addBriefing = useAppStore((s) => s.addBriefing)
  const [showAdd, setShowAdd] = useState(false)
  const [bfTitle, setBfTitle] = useState('')
  const [bfSummary, setBfSummary] = useState('')
  const [bfStatus, setBfStatus] = useState<BriefingStatus>('draft')

  const resetForm = () => { setBfTitle(''); setBfSummary(''); setBfStatus('draft') }
  const handleSave = () => {
    if (!bfTitle) return
    addBriefing({ id: generateId(), title: bfTitle, competitorId: '', status: bfStatus, generatedAt: new Date().toISOString(), summary: bfSummary || '' })
    resetForm(); setShowAdd(false)
  }
  const handleCancel = () => { resetForm(); setShowAdd(false) }

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white transition-colors">
      <header className="border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{t('appTitle')}</h1>
            <p className="text-sm text-slate-500">{t('appSubtitle')}</p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
        {stats.total > 0 && (
          <div className="flex gap-4 mt-3 text-xs">
            <span className="text-slate-400">{t('totalCompetitors')}: {stats.total}</span>
            {stats.alerts > 0 && <span className="text-amber-400">{t('totalAlerts')}: {stats.alerts}</span>}
            {stats.unread > 0 && <span className="text-rose-400">{t('unreadAlerts')}: {stats.unread}</span>}
          </div>
        )}
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">{t('competitors')}</h2>
          <CompetitorList />
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-slate-400">{t('briefings')}</h2>
            <button onClick={() => setShowAdd(!showAdd)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addBriefing')}</button>
          </div>
          {showAdd && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 mb-3 space-y-2">
              <input value={bfTitle} onChange={(e) => setBfTitle(e.target.value)} placeholder={t('title')} className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 text-sm" />
              <textarea value={bfSummary} onChange={(e) => setBfSummary(e.target.value)} placeholder={t('summary')} rows={2} className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 text-sm resize-none" />
              <select value={bfStatus} onChange={(e) => setBfStatus(e.target.value as BriefingStatus)} className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-2 py-1.5 text-sm">
                {Object.entries(BRIEFING_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <div className="flex gap-2">
                <button onClick={handleSave} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('save')}</button>
                <button onClick={handleCancel} className="text-xs text-slate-400">{t('cancel')}</button>
              </div>
            </div>
          )}
          <BriefingViewer />
        </div>
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">{t('alerts')}</h2>
          <AlertSettings />
        </div>
      </main>
    </div>
  )
}