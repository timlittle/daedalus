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

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font .className}>
        <div className='flex flex-row gap-2'>
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <ProjectModal />
            <Sidebar currentUser={currentUser}/>
          </ClientOnly>
          <div className='w-full'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
