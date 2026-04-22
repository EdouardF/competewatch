import type { SourceType, AlertSeverity, BriefingStatus } from '../types'

export const SOURCE_LABELS: Record<SourceType, string> = { changelog: 'Changelog', g2: 'G2 Reviews', social: 'Social Media', news: 'News', manual: 'Manual' }
export const SOURCE_COLORS: Record<SourceType, string> = { changelog: 'text-blue-400', g2: 'text-emerald-400', social: 'text-purple-400', news: 'text-amber-400', manual: 'text-slate-400' }

export const SEVERITY_LABELS: Record<AlertSeverity, string> = { info: 'Info', warning: 'Warning', critical: 'Critical' }
export const SEVERITY_COLORS: Record<AlertSeverity, string> = { info: 'bg-blue-500/20 text-blue-400', warning: 'bg-amber-500/20 text-amber-400', critical: 'bg-rose-500/20 text-rose-400' }

export const BRIEFING_STATUS_LABELS: Record<BriefingStatus, string> = { draft: 'Draft', ready: 'Ready', sent: 'Sent' }
export const BRIEFING_STATUS_COLORS: Record<BriefingStatus, string> = { draft: 'bg-slate-500/20 text-slate-400', ready: 'bg-emerald-500/20 text-emerald-400', sent: 'bg-blue-500/20 text-blue-400' }

export function formatDate(dateStr: string): string { const d = new Date(dateStr); return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
export function generateId(): string { return Math.random().toString(36).substring(2, 10) + Date.now().toString(36) }