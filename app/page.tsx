import LiveFeed from './components/LiveFeed'
import IncidentsList from './components/IncidentsList'

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-2rem)]">
      <LiveFeed />
      <IncidentsList />
    </div>
  )
}

