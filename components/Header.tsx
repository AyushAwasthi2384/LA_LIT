// Make this a client component to use hooks
"use client";

import { useState, useEffect } from 'react'; // <-- Import useEffect
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // --- Start of Added Effects ---

  // Effect to handle body scroll and Escape key press
  useEffect(() => {
    // Function to handle keydown event for 'Escape'
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Prevent scrolling on the body when the menu is open
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      // Restore scrolling
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to remove event listener and restore scroll
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]); // This effect re-runs whenever 'isOpen' changes

  // --- End of Added Effects ---

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/sentiment-analysis', label: 'Sentiment Analysis' },
    { href: '/chatbot', label: 'Chatbot' },
    { href: '/about', label: 'About' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };
  
  const topVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 6 },
  };

  const middleVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const bottomVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -6 },
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-black" onClick={() => setIsOpen(false)}>
          LA_LIT
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'text-black' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                      layoutId="underline"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger Menu Button (Visible on Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} // <-- A11y: Added aria-label
          >
            <div className="w-6 h-5 flex flex-col justify-between items-center">
              <motion.span
                className="block h-0.5 w-full bg-black rounded-full"
                variants={topVariants}
                animate={isOpen ? 'open' : 'closed'}
              />
              <motion.span
                className="block h-0.5 w-full bg-black rounded-full"
                variants={middleVariants}
                animate={isOpen ? 'open' : 'closed'}
              />
              <motion.span
                className="block h-0.5 w-full bg-black rounded-full"
                variants={bottomVariants}
                animate={isOpen ? 'open' : 'closed'}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Animated with AnimatePresence) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute left-0 w-full bg-white shadow-md"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <ul className="flex flex-col items-center space-y-4 py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg transition ${
                        isActive ? 'text-black font-semibold' : 'text-gray-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}