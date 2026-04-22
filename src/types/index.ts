export type SourceType = 'changelog' | 'g2' | 'social' | 'news' | 'manual'
export type AlertSeverity = 'info' | 'warning' | 'critical'
export type BriefingStatus = 'draft' | 'ready' | 'sent'

export interface Competitor {
  id: string
  name: string
  website: string
  lastUpdated: string
  alertCount: number
}

export interface Source {
  id: string
  competitorId: string
  type: SourceType
  label: string
  active: boolean
}

export interface Briefing {
  id: string
  title: string
  competitorId: string
  status: BriefingStatus
  generatedAt: string
  summary: string
}

export interface Alert {
  id: string
  competitorId: string
  severity: AlertSeverity
  message: string
  source: string
  timestamp: string
  read: boolean
}