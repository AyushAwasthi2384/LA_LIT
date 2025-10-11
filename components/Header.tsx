"use client";

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { FcGoogle } from "react-icons/fc";

export default function Header() {
  const { isAuthenticated, isLoading, user, signIn, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          LA_LIT
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/sentiment-analysis">Sentiment Analysis</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/chatbot">Chatbot</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
          {/* <Button variant="ghost" asChild>
            <Link href="/contact">Contact</Link>
          </Button> */}
          
          {isLoading ? (
            <Button disabled variant="outline">Loading...</Button>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                {user?.name || user?.email}
              </span>
              <Button onClick={() => signOut()} variant="outline">
                Sign Out
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => signIn()} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <FcGoogle className="h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}

