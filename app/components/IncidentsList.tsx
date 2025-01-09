'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { ChevronDown, Camera } from 'lucide-react'
import { Incident, IncidentStatus } from '../types/incident'

const statusColors: Record<IncidentStatus, string> = {
  'pending review': 'bg-red-100 text-red-800',
  'under review': 'bg-yellow-100 text-yellow-800',
  'resolved': 'bg-green-100 text-green-800'
}

export default function IncidentsList() {
  const [incidents, setIncidents] = useState<Incident[]>([
    { 
      id: 1, 
      title: 'Suspicious activity in Sector A', 
      status: 'pending review', 
      timestamp: '2023-06-10 14:30',
      description: 'Unidentified individual spotted near restricted area.',
      comments: [],
      liveFeed: { id: 1, name: 'Camera 1' }
    },
    { 
      id: 2, 
      title: 'Unauthorized access attempt', 
      status: 'under review', 
      timestamp: '2023-06-10 15:45',
      description: 'Multiple failed login attempts detected.',
      comments: [],
      liveFeed: { id: 2, name: 'Camera 2' }
    },
    { 
      id: 3, 
      title: 'Equipment malfunction in Sector C', 
      status: 'resolved', 
      timestamp: '2023-06-09 09:15',
      description: 'Faulty sensor causing false alarms.',
      comments: [],
      liveFeed: { id: 3, name: 'Camera 3' }
    },
  ])

  const updateStatus = (incidentId: number, newStatus: IncidentStatus) => {
    setIncidents(prevIncidents =>
      prevIncidents.map(inc =>
        inc.id === incidentId ? { ...inc, status: newStatus } : inc
      )
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Incidents</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {incidents.map(incident => (
            <li key={incident.id} className="flex flex-col space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{incident.title}</h3>
                  <p className="text-sm text-gray-500">{incident.timestamp}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Camera className="w-4 h-4 mr-1" />
                    {incident.liveFeed.name}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className={statusColors[incident.status]}>
                        {incident.status} <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => updateStatus(incident.id, 'pending review')}>
                        Pending Review
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(incident.id, 'under review')}>
                        Under Review
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(incident.id, 'resolved')}>
                        Resolved
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/incident/${incident.id}`}>
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

