import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { MovieCard } from './MovieCard'
import { Movie } from '../types/movie'
import { motion } from 'framer-motion'

interface MovieRowProps {
  title: string
  movies: Movie[]
}

export const MovieRow = ({ title, movies }: MovieRowProps) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const cardWidth = 300 // Width of each movie card including margins
  const visibleCards = 5 // Number of cards visible at once
  const maxScroll = Math.max(0, (movies.length - visibleCards) * cardWidth)

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - cardWidth * 2))
  }

  const scrollRight = () => {
    setScrollPosition(Math.min(maxScroll, scrollPosition + cardWidth * 2))
  }

  return (
    <div className="px-4 md:px-12 mb-8">
      {/* Section Title */}
      <motion.h2 
        className="text-2xl font-bold text-white mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      <div className="relative group">
        {/* Left Arrow */}
        {scrollPosition > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 hidden group-hover:block"
          >
            <Button
              size="sm"
              variant="ghost"
              className="bg-black/70 hover:bg-black/90 text-white backdrop-blur-sm rounded-full w-12 h-12 border border-gray-600"
              onClick={scrollLeft}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </motion.div>
        )}

        {/* Right Arrow */}
        {scrollPosition < maxScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 hidden group-hover:block"
          >
            <Button
              size="sm"
              variant="ghost"
              className="bg-black/70 hover:bg-black/90 text-white backdrop-blur-sm rounded-full w-12 h-12 border border-gray-600"
              onClick={scrollRight}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </motion.div>
        )}

        {/* Movie Cards Container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex space-x-4 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0"
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}