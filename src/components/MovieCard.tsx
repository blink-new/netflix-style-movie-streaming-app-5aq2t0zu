import { useState } from 'react'
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { Movie } from '../types/movie'
import { motion } from 'framer-motion'
import { VideoModal } from './VideoModal'
import { Link } from 'react-router-dom'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)

  return (
    <>
      <motion.div
        className="relative w-72 h-40 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Movie Thumbnail */}
        <Link to={`/details/${movie.id}`} className="block w-full h-full rounded-lg overflow-hidden bg-gray-900">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play Button Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="sm"
              className="bg-white/90 hover:bg-white text-black rounded-full w-12 h-12 backdrop-blur-sm shadow-lg"
              onClick={(e) => {
                e.preventDefault()
                setShowVideoModal(true)
              }}
            >
              <Play className="w-5 h-5 fill-current" />
            </Button>
          </motion.div>
        </Link>

        {/* Hover Card */}
        <motion.div
          className="absolute top-full left-0 right-0 bg-gray-900 rounded-b-lg shadow-2xl border border-gray-700 p-4 z-30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
        >
          {/* Title */}
          <Link to={`/details/${movie.id}`}>
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">
              {movie.title}
            </h3>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 mb-3">
            <Button
              size="sm"
              className="bg-white text-black hover:bg-gray-200 rounded-full w-8 h-8 p-0"
              onClick={() => setShowVideoModal(true)}
            >
              <Play className="w-4 h-4 fill-current" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-800 rounded-full w-8 h-8 p-0 border border-gray-600"
            >
              <Plus className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-800 rounded-full w-8 h-8 p-0 border border-gray-600"
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-800 rounded-full w-8 h-8 p-0 border border-gray-600 ml-auto"
            >
              <Link to={`/details/${movie.id}`}>
                <ChevronDown className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Movie Info */}
          <div className="flex items-center space-x-2 text-sm text-gray-300 mb-2">
            <span className="bg-red-600 px-1.5 py-0.5 rounded text-white text-xs font-semibold">
              {movie.rating}
            </span>
            <span>{movie.year}</span>
            {movie.type === 'tv-show' ? (
              <span>{movie.seasons} Seasons</span>
            ) : (
              <span>{movie.duration}</span>
            )}
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-1">
            {movie.genre.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <VideoModal 
        movie={movie}
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />
    </>
  )
}