import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import Sidebar from './components/sidebar/Sidebar'
import './globals.css'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToastProvider'
import getCurrentUser from './actions/getCurrentUser'
import ProjectModal from './components/modals/ProjectModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daedalus',
  description: 'Collaborative markdown documentation as code platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={font .className}>
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <ProjectModal />
          </ClientOnly>
          {children}
      </body>
    </html>
  )
}
