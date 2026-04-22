import { describe, it, expect } from 'vitest'
import { SOURCE_LABELS, SEVERITY_LABELS, BRIEFING_STATUS_LABELS, formatDate, generateId } from '../utils/helpers'

describe('helpers', () => {
  it('SOURCE_LABELS', () => { expect(SOURCE_LABELS.changelog).toBe('Changelog'); expect(SOURCE_LABELS.g2).toBe('G2 Reviews') })
  it('SEVERITY_LABELS', () => { expect(SEVERITY_LABELS.info).toBe('Info'); expect(SEVERITY_LABELS.critical).toBe('Critical') })
  it('BRIEFING_STATUS_LABELS', () => { expect(BRIEFING_STATUS_LABELS.draft).toBe('Draft'); expect(BRIEFING_STATUS_LABELS.sent).toBe('Sent') })
  it('formatDate valid', () => { expect(formatDate('2026-04-22')).toBeTruthy() })
  it('formatDate invalid', () => { expect(formatDate('bad')).toBe('bad') })
  it('generateId unique', () => { expect(new Set(Array.from({ length: 10 }, () => generateId())).size).toBe(10) })
})