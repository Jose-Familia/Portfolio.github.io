"use client"

import { useState, useEffect } from 'react'
import { Home, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const icons = [
  { href: "/", Icon: Home, label: "Home" },
  { href: "https://github.com/Jose-Familia", Icon: Github, label: "GitHub"},
  { href: "https://www.linkedin.com/in/jrfamilia", Icon: Linkedin, label: "LinkedIn"},
  { href: "mailto:familiajoserene@gmail.com", Icon: Mail, label: "Contact" },
]

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('darkMode', newMode.toString())
    document.documentElement.classList.toggle('dark', newMode)
  }

  return (
    <div className="sticky bottom-0 flex justify-center items-center p-4">
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div 
          className={`flex items-center justify-center space-x-1 sm:space-x-2 rounded-full shadow-lg px-4 py-3 backdrop-blur-md ${isDarkMode ? 'bg-gray-800 bg-opacity-80' : 'bg-white bg-opacity-80'}`}
          layout
        >
          {icons.map(({ href, Icon, label }, index) => (
            <motion.div
              key={label}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative flex items-center justify-center"
            >
              <Link href={href} className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors p-2 sm:p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}`}>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center"
                >
                  <Icon size={24} />
                  <span className="sr-only">{label}</span>
                </motion.div>
              </Link>
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className={`absolute top-14 left-1/2 transform -translate-x-1/2 ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-800 text-white'} text-xs py-1 px-2 rounded whitespace-nowrap`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <motion.button
            onClick={toggleDarkMode}
            className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors p-2 sm:p-3 rounded-full relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDarkMode ? 'dark' : 'light'}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}