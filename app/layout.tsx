import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import Sidebar from './components/sidebar/Sidebar'
import './globals.css'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daedalus',
  description: 'Collaborative markdown documentation as code platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={font .className}>
        <div className='flex flex-row gap-2 min-h-screen'>
          <ClientOnly>
            <LoginModal />
            <Sidebar />
          </ClientOnly>
          <div className='w-full min-h-screen'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
