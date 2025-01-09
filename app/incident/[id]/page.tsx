'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Pause, RotateCcw, ChevronDown, Camera } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CommentSection } from '../../components/CommentSection'
import { Incident, IncidentStatus } from '../../types/incident'

const statusColors: Record<IncidentStatus, string> = {
  'pending review': 'bg-red-100 text-red-800',
  'under review': 'bg-yellow-100 text-yellow-800',
  'resolved': 'bg-green-100 text-green-800'
}

export default function IncidentDetail() {
  const router = useRouter()
  const { id } = useParams()
  const [incident, setIncident] = useState<Incident | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Simulating API call to fetch incident details
    setIncident({
      id: Number(id),
      title: 'Suspicious activity in Sector A',
      status: 'pending review',
      timestamp: '2023-06-10 14:30',
      description: 'Unidentified individual spotted near restricted area.',
      comments: [
        { id: 1, content: 'Initial report filed.', author: 'John Doe', timestamp: '2023-06-10 14:35' },
        { id: 2, content: 'Security team dispatched.', author: 'Jane Smith', timestamp: '2023-06-10 14:40' },
      ],
      liveFeed: { id: 1, name: 'Camera 1' }
    })
  }, [id])

  useEffect(() => {
    const darkModeObserver = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains('dark'))
    })
    darkModeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => darkModeObserver.disconnect()
  }, [])

  if (!incident) return <div>Loading...</div>

  const updateStatus = (newStatus: IncidentStatus) => {
    setIncident(prev => prev ? { ...prev, status: newStatus } : null)
  }

  const addComment = (content: string) => {
    if (incident) {
      const newComment = {
        id: incident.comments.length + 1,
        content,
        author: 'Current User', // In a real app, this would be the logged-in user
        timestamp: new Date().toLocaleString(),
      }
      setIncident({
        ...incident,
        comments: [...incident.comments, newComment],
      })
    }
  }

  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Incidents
      </Button>
      
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>{incident.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{incident.timestamp}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <Camera className="w-4 h-4 mr-1" />
                  {incident.liveFeed.name}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className={statusColors[incident.status]}>
                    {incident.status} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => updateStatus('pending review')}>
                    Pending Review
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => updateStatus('under review')}>
                    Under Review
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => updateStatus('resolved')}>
                    Resolved
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p>{incident.description}</p>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Replay</h3>
              <div className="relative">
                <img
                  src={`https://placehold.co/600x400/${darkMode ? '1F2937/FFFFFF' : '000000/FFFFFF'}/png?text=Incident+Replay+(${incident.liveFeed.name})`}
                  alt={`Incident Replay from ${incident.liveFeed.name}`}
                  className="w-full h-auto rounded-md"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex justify-center space-x-2">
                  <Button size="icon" variant="ghost" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button size="icon" variant="ghost">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <CommentSection comments={incident.comments} onAddComment={addComment} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

