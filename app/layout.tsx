import './globals.css'
import { Inter } from 'next/font/google'
import { DarkModeToggle } from './components/DarkModeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Surveillance Application',
  description: 'Monitor live feeds and manage incidents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-black dark:text-white`}>
        <div className="flex h-screen">
          <main className="flex-1 overflow-y-auto p-4">
            <div className="container mx-auto">
              <div className="flex justify-end mb-4">
                <DarkModeToggle />
              </div>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}

