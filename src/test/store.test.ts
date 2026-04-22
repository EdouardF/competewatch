import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from '../store/useAppStore'
import type { Competitor, Source, Briefing, Alert } from '../types'

describe('useAppStore', () => {
  beforeEach(() => useAppStore.getState().reset())

  it('add/update/delete competitor', () => {
    const c: Competitor = { id: '1', name: 'Acme Corp', website: 'acme.com', lastUpdated: '2026-01-01', alertCount: 0 }
    useAppStore.getState().addCompetitor(c)
    expect(useAppStore.getState().competitors).toHaveLength(1)
    useAppStore.getState().updateCompetitor('1', { alertCount: 5 })
    expect(useAppStore.getState().competitors[0].alertCount).toBe(5)
    useAppStore.getState().deleteCompetitor('1')
    expect(useAppStore.getState().competitors).toHaveLength(0)
  })

  it('add/update/delete source', () => {
    const s: Source = { id: '1', competitorId: 'c1', type: 'changelog', label: 'Blog', active: true }
    useAppStore.getState().addSource(s)
    useAppStore.getState().updateSource('1', { active: false })
    expect(useAppStore.getState().sources[0].active).toBe(false)
    useAppStore.getState().deleteSource('1')
    expect(useAppStore.getState().sources).toHaveLength(0)
  })

  it('add/update/delete briefing', () => {
    const b: Briefing = { id: '1', title: 'Q1 Report', competitorId: 'c1', status: 'draft', generatedAt: '2026-01-01', summary: 'Summary' }
    useAppStore.getState().addBriefing(b)
    useAppStore.getState().updateBriefing('1', { status: 'ready' })
    expect(useAppStore.getState().briefings[0].status).toBe('ready')
    useAppStore.getState().deleteBriefing('1')
    expect(useAppStore.getState().briefings).toHaveLength(0)
  })

  it('add/update/delete alert', () => {
    const a: Alert = { id: '1', competitorId: 'c1', severity: 'warning', message: 'Price change', source: 'news', timestamp: '2026-01-01', read: false }
    useAppStore.getState().addAlert(a)
    useAppStore.getState().updateAlert('1', { read: true })
    expect(useAppStore.getState().alerts[0].read).toBe(true)
    useAppStore.getState().deleteAlert('1')
    expect(useAppStore.getState().alerts).toHaveLength(0)
  })

  it('search/filter state', () => {
    useAppStore.getState().setSearchQuery('acme')
    useAppStore.getState().setFilterSeverity('critical')
    useAppStore.getState().setFilterStatus('ready')
    expect(useAppStore.getState().searchQuery).toBe('acme')
    expect(useAppStore.getState().filterSeverity).toBe('critical')
    expect(useAppStore.getState().filterStatus).toBe('ready')
  })

  it('reset clears everything', () => {
    useAppStore.getState().setError('fail')
    useAppStore.getState().reset()
    expect(useAppStore.getState().error).toBeNull()
    expect(useAppStore.getState().competitors).toHaveLength(0)
  })
})