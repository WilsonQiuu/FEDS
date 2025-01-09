'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

type Feed = {
  id: number
  name: string
  status: 'active' | 'inactive'
}

export default function LiveFeed() {
  const [feeds, setFeeds] = useState<Feed[]>([
    { id: 1, name: 'Camera 1', status: 'active' },
    { id: 2, name: 'Camera 2', status: 'active' },
    { id: 3, name: 'Camera 3', status: 'inactive' },
    { id: 4, name: 'Camera 4', status: 'active' },
  ])
  const [currentFeed, setCurrentFeed] = useState<Feed>(feeds[0])
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFeeds(prevFeeds => prevFeeds.map(feed => ({
        ...feed,
        status: Math.random() > 0.1 ? 'active' : 'inactive'
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setCurrentFeed(feeds.find(feed => feed.id === currentFeed.id) || feeds[0])
  }, [feeds])

  useEffect(() => {
    const darkModeObserver = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains('dark'))
    })
    darkModeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => darkModeObserver.disconnect()
  }, [])

  return (
    <Card className="h-full flex flex-col bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Live Feed: {currentFeed.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="relative flex-grow">
          <img
            src={`https://placehold.co/600x400/${darkMode ? '1F2937/FFFFFF' : '000000/FFFFFF'}/png?text=${currentFeed.name}`}
            alt={currentFeed.name}
            className="w-full h-full object-cover rounded-md"
          />
          {currentFeed.status === 'inactive' && (
            <Alert variant="destructive" className="absolute top-0 left-0 right-0 m-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Camera offline
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {feeds.map(feed => (
            <Button
              key={feed.id}
              variant={currentFeed.id === feed.id ? "default" : "outline"}
              onClick={() => setCurrentFeed(feed)}
            >
              {feed.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

