
// Make this a client component to use hooks
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Header() {
  // Get the current path
  const pathname = usePathname();

  // Define navigation links in an array for easier mapping
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/sentiment-analysis', label: 'Sentiment Analysis' },
    { href: '/chatbot', label: 'Chatbot' },
    { href: '/about', label: 'About' },
  ];

  // (The navLinks array and usePathname() hook are the same as before)
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          LA_LIT
        </Link>
        {/* Use a list for semantic navigation */}
        <ul className="flex items-center space-x-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition ${isActive ? 'text-black' : 'text-gray-600 hover:text-black'
                    }`}
                >
                  {/* The text label */}
                  {link.label}

                  {/* The animated underline */}
                  {isActive && (
                    <motion.div
                      //for our main animation/smooth underline type effect
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                      layoutId="underline"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}