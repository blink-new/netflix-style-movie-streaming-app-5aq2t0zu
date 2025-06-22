import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Upload, Bell, User } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { motion } from 'framer-motion'

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.h1 
            className="text-2xl font-bold text-red-600"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Xcorpion Media
          </motion.h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-white ${
              location.pathname === '/' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/upload" 
            className={`text-sm font-medium transition-colors hover:text-white ${
              location.pathname === '/upload' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Upload
          </Link>
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-900"
            />
          </div>

          {/* Mobile Upload Button */}
          <Link to="/upload" className="md:hidden">
            <Button size="sm" variant="ghost" className="text-white hover:bg-gray-800">
              <Upload className="w-5 h-5" />
            </Button>
          </Link>

          {/* Notification Bell */}
          <Button size="sm" variant="ghost" className="text-white hover:bg-gray-800">
            <Bell className="w-5 h-5" />
          </Button>

          {/* User Profile */}
          <Button size="sm" variant="ghost" className="text-white hover:bg-gray-800">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  )
}