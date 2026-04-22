import { create } from 'zustand'
import type { Competitor, Source, Briefing, Alert, AlertSeverity, BriefingStatus } from '../types'

type SortKey = 'date' | 'name'

interface AppState {
  competitors: Competitor[]; sources: Source[]; briefings: Briefing[]; alerts: Alert[]
  selectedCompetitor: string | null; searchQuery: string; filterSeverity: AlertSeverity | ''; filterStatus: BriefingStatus | ''; sortBy: SortKey
  error: string | null
  addCompetitor: (c: Competitor) => void; updateCompetitor: (id: string, u: Partial<Competitor>) => void; deleteCompetitor: (id: string) => void; setSelectedCompetitor: (id: string | null) => void
  addSource: (s: Source) => void; updateSource: (id: string, u: Partial<Source>) => void; deleteSource: (id: string) => void
  addBriefing: (b: Briefing) => void; updateBriefing: (id: string, u: Partial<Briefing>) => void; deleteBriefing: (id: string) => void
  addAlert: (a: Alert) => void; updateAlert: (id: string, u: Partial<Alert>) => void; deleteAlert: (id: string) => void
  setSearchQuery: (q: string) => void; setFilterSeverity: (s: AlertSeverity | '') => void; setFilterStatus: (s: BriefingStatus | '') => void; setSortBy: (s: SortKey) => void
  setError: (m: string | null) => void; reset: () => void
}

const init = { competitors: [], sources: [], briefings: [], alerts: [], selectedCompetitor: null, searchQuery: '', filterSeverity: '' as AlertSeverity | '', filterStatus: '' as BriefingStatus | '', sortBy: 'date' as SortKey, error: null }
export const useAppStore = create<AppState>((set) => ({
  ...init,
  addCompetitor: (c) => set((s) => ({ competitors: [...s.competitors, c] })),
  updateCompetitor: (id, u) => set((s) => ({ competitors: s.competitors.map((c) => c.id === id ? { ...c, ...u } : c) })),
  deleteCompetitor: (id) => set((s) => ({ competitors: s.competitors.filter((c) => c.id !== id) })),
  setSelectedCompetitor: (id) => set({ selectedCompetitor: id }),
  addSource: (s2) => set((s) => ({ sources: [...s.sources, s2] })),
  updateSource: (id, u) => set((s) => ({ sources: s.sources.map((src) => src.id === id ? { ...src, ...u } : src) })),
  deleteSource: (id) => set((s) => ({ sources: s.sources.filter((src) => src.id !== id) })),
  addBriefing: (b) => set((s) => ({ briefings: [...s.briefings, b] })),
  updateBriefing: (id, u) => set((s) => ({ briefings: s.briefings.map((b) => b.id === id ? { ...b, ...u } : b) })),
  deleteBriefing: (id) => set((s) => ({ briefings: s.briefings.filter((b) => b.id !== id) })),
  addAlert: (a) => set((s) => ({ alerts: [...s.alerts, a] })),
  updateAlert: (id, u) => set((s) => ({ alerts: s.alerts.map((a) => a.id === id ? { ...a, ...u } : a) })),
  deleteAlert: (id) => set((s) => ({ alerts: s.alerts.filter((a) => a.id !== id) })),
  setSearchQuery: (q) => set({ searchQuery: q }), setFilterSeverity: (s) => set({ filterSeverity: s }), setFilterStatus: (s) => set({ filterStatus: s }), setSortBy: (s) => set({ sortBy: s }),
  setError: (m) => set({ error: m }), reset: () => set(init),
}))

export const useCompetitorStats = () => useAppStore((s) => ({
  total: s.competitors.length,
  alerts: s.alerts.length,
  unread: s.alerts.filter((a) => !a.read).length,
}))