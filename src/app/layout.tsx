// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
// import './globals.css'
// import Header from '@/components/Header'
// // import Footer from '../components/Footer'
// import { Toast } from '@/components/ui/toast'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Hackathon Project',
//   description: 'Sentiment Analysis and Chatbot Project',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <div className="flex flex-col min-h-screen">
//           <Header />
//           <main className="flex-grow">{children}</main>
//           {/* <Footer /> */}
//         </div>
//         <Toast toast={null} />
//       </body>
//     </html>
//   )
// }



import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
// import Footer from '@/components/Footer'
import { ToastProvider } from '@/components/ui/toast' // Assuming ToastContainer is defined to display toasts

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
          {/* Add ToastContainer here */}
        </body>
      </ToastProvider>
    </html>
  )
}
