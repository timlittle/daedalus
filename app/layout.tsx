import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import DocumentModal from './components/modals/DocumentModal'
import LoginModal from './components/modals/LoginModal'
import ProjectModal from './components/modals/ProjectModal'
import RegisterModal from './components/modals/RegisterModal'
import './globals.css'
import ToasterProvider from './providers/ToastProvider'
import ShareModal from './components/modals/ShareModal'

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
            <DocumentModal />
            <ShareModal />
          </ClientOnly>
          {children}
      </body>
    </html>
  )
}
