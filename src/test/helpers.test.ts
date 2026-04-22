import { describe, it, expect } from 'vitest'
import { SOURCE_LABELS, SEVERITY_LABELS, BRIEFING_STATUS_LABELS, formatDate, filterCompetitors, sortCompetitors, filterAlerts } from '../utils/helpers'
import type { Competitor, Alert } from '../types'

const sampleCompetitors: Competitor[] = [
  { id: '1', name: 'Acme Corp', website: 'acme.com', lastUpdated: '2026-01-15', alertCount: 2 },
  { id: '2', name: 'Beta Inc', website: 'beta.io', lastUpdated: '2026-02-01', alertCount: 0 },
  { id: '3', name: 'Gamma LLC', website: 'gamma.dev', lastUpdated: '2026-03-10', alertCount: 5 },
]

const sampleAlerts: Alert[] = [
  { id: '1', competitorId: 'c1', severity: 'critical', message: 'Price drop', source: 'news', timestamp: '2026-04-01', read: false },
  { id: '2', competitorId: 'c2', severity: 'info', message: 'New feature', source: 'changelog', timestamp: '2026-04-02', read: true },
]

describe('helpers', () => {
  it('SOURCE_LABELS', () => { expect(SOURCE_LABELS.changelog).toBe('Changelog') })
  it('SEVERITY_LABELS', () => { expect(SEVERITY_LABELS.critical).toBe('Critical') })
  it('BRIEFING_STATUS_LABELS', () => { expect(BRIEFING_STATUS_LABELS.draft).toBe('Draft') })
  it('formatDate valid', () => { expect(formatDate('2026-04-22')).toBeTruthy() })
  it('formatDate invalid', () => { expect(formatDate('bad')).toBe('bad') })

  describe('filterCompetitors', () => {
    it('filter by query', () => { expect(filterCompetitors(sampleCompetitors, 'acme')).toHaveLength(1) })
    it('no filter returns all', () => { expect(filterCompetitors(sampleCompetitors)).toHaveLength(3) })
  })

  describe('sortCompetitors', () => {
    it('sort by date newest first', () => { expect(sortCompetitors(sampleCompetitors, 'date')[0].id).toBe('3') })
    it('sort by name', () => { expect(sortCompetitors(sampleCompetitors, 'name')[0].name).toBe('Acme Corp') })
  })

  describe('filterAlerts', () => {
    it('filter by severity', () => { expect(filterAlerts(sampleAlerts, 'critical')).toHaveLength(1) })
    it('no filter returns all', () => { expect(filterAlerts(sampleAlerts)).toHaveLength(2) })
  })
})