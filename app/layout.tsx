
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import { ToastProvider } from '@radix-ui/react-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hackathon Project',
  description: 'Sentiment Analysis and Chatbot Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ToastProvider>
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            {/* <Footer /> */}
          </div>
          {/* Toasts will automatically work via the ToastProvider */}
        </body>
      </ToastProvider>
    </html>
  )
}
