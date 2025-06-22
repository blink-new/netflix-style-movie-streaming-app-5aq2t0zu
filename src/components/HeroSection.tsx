import { useState } from 'react'
import { Play, Info, Volume2, VolumeX } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useMovies } from '../context/MovieContext'
import { motion } from 'framer-motion'
import { VideoModal } from './VideoModal'

export const HeroSection = () => {
  const { featuredMovie } = useMovies()
  const [isMuted, setIsMuted] = useState(true)
  const [showVideoModal, setShowVideoModal] = useState(false)

  if (!featuredMovie) return null

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${featuredMovie.thumbnail})`,
        }}
      >
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Title */}
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {featuredMovie.title}
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {featuredMovie.description}
            </motion.p>

            {/* Movie Info */}
            <motion.div 
              className="flex items-center space-x-4 mb-8 text-sm text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <span className="bg-red-600 px-2 py-1 rounded text-white font-semibold">
                {featuredMovie.rating}
              </span>
              <span>{featuredMovie.year}</span>
              <span>{featuredMovie.duration}</span>
              <div className="flex space-x-2">
                {featuredMovie.genre.slice(0, 3).map((genre) => (
                  <span key={genre} className="text-gray-400">
                    {genre}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
                onClick={() => setShowVideoModal(true)}
              >
                <Play className="w-6 h-6 mr-2 fill-current" />
                Play
              </Button>
              
              <Link to={`/details/${featuredMovie.id}`}>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-gray-600/70 text-white hover:bg-gray-600 backdrop-blur-sm font-semibold px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
                >
                  <Info className="w-6 h-6 mr-2" />
                  More Info
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Volume Control */}
      <motion.div 
        className="absolute bottom-8 right-8 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        <Button
          size="sm"
          variant="ghost"
          className="bg-black/50 border border-gray-600 hover:bg-black/70 text-white backdrop-blur-sm rounded-full w-12 h-12"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </motion.div>

      {/* Video Modal */}
      <VideoModal 
        movie={featuredMovie}
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />
    </div>
  )
}