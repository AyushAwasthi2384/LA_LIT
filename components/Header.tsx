'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Menu, X, Sparkles, Bot, BarChart3, Info } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navItems = [
    { href: '/', label: 'Home', icon: Sparkles },
    { href: '/sentiment-analysis', label: 'Sentiment Analysis', icon: BarChart3 },
    { href: '/chatbot', label: 'Chatbot', icon: Bot },
    { href: '/about', label: 'About', icon: Info },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-indigo-900/80 backdrop-blur-lg border-b border-indigo-700/50 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <nav className="mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-3xl font-bold gradient-text hover:scale-105 transition-transform duration-300 flex items-center space-x-2"
        >
          <Sparkles className="w-8 h-8" />
          <span>LA_LIT</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Button 
                key={item.href}
                variant="ghost" 
                asChild
                className="text-white hover:text-blue-300 hover:bg-indigo-800/70 transition-all duration-300 rounded-xl px-4 py-2 font-medium"
              >
                <Link href={item.href} className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-xl bg-indigo-900/70 backdrop-blur-sm border border-indigo-700/50 text-white hover:bg-indigo-800/80 transition-all duration-300 shadow-md"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6 text-blue-300" /> : <Menu className="w-6 h-6 text-blue-300" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="bg-indigo-900/90 backdrop-blur-lg border-t border-indigo-700/50 mx-4 rounded-b-2xl shadow-2xl overflow-hidden">
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white font-semibold hover:bg-slate-700/70 transition-all duration-300 hover:scale-105"
                >
                  <Icon className="w-5 h-5 text-blue-300" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}

