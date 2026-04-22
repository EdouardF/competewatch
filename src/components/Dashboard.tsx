import { CompetitorList } from './CompetitorList'
import { BriefingViewer } from './BriefingViewer'
import { SourceManager } from './SourceManager'
import { AlertSettings } from './AlertSettings'

export function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-xl font-bold">CompeteWatch</h1>
        <p className="text-sm text-slate-500">AI Competitor Intelligence Dashboard</p>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div><h2 className="text-sm font-medium text-slate-400 mb-3">Competitors</h2><CompetitorList /></div>
        <div><h2 className="text-sm font-medium text-slate-400 mb-3">Briefings</h2><BriefingViewer /></div>
        <div><h2 className="text-sm font-medium text-slate-400 mb-3">Sources</h2><SourceManager /></div>
        <div><h2 className="text-sm font-medium text-slate-400 mb-3">Alerts</h2><AlertSettings /></div>
      </main>
    </div>
  )
}