import { useEffect, useRef } from 'react'
import { X, VolumeX, Maximize2, RotateCcw } from 'lucide-react'
import { Button } from './ui/button'
import { Movie } from '../types/movie'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoModalProps {
  movie: Movie
  isOpen: boolean
  onClose: () => void
}

export const VideoModal = ({ movie, isOpen, onClose }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const isStreamtape = movie.videoUrl.includes('streamtape.com')
  const streamtapeEmbedUrl = isStreamtape ? movie.videoUrl.replace('/v/', '/e/') : ''

  useEffect(() => {
    if (isOpen && videoRef.current && !movie.videoUrl.includes('streamtape.com')) {
      videoRef.current.play()
    }
  }, [isOpen, movie.videoUrl])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-6xl bg-black rounded-lg overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              {isStreamtape ? (
                <iframe
                  src={streamtapeEmbedUrl}
                  allowFullScreen
                  allow="autoplay; fullscreen; picture-in-picture"
                  className="w-full h-full"
                  title={movie.title}
                ></iframe>
              ) : (
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  controls
                  poster={movie.thumbnail}
                  playsInline
                >
                  <source src={movie.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Movie Info */}
            <div className="p-6 bg-gray-900">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {movie.title}
                  </h2>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                    <span className="bg-red-600 px-2 py-1 rounded text-white font-semibold">
                      {movie.rating}
                    </span>
                    <span>{movie.year}</span>
                    {movie.type === 'tv-show' ? (
                      <span>{movie.seasons} Seasons</span>
                    ) : (
                      <span>{movie.duration}</span>
                    )}
                  </div>
                </div>

                {/* Video Controls */}
                <div className="flex items-center space-x-2">
                  {!isStreamtape && (
                    <select
                      className="bg-gray-800 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      defaultValue="english"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                    </select>
                  )}

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-gray-800 rounded-full w-10 h-10 p-0"
                  >
                    <VolumeX className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-gray-800 rounded-full w-10 h-10 p-0"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-gray-800 rounded-full w-10 h-10 p-0"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {movie.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {movie.genre.map((genre) => (
                  <span
                    key={genre}
                    className="text-xs text-gray-300 bg-gray-800 px-3 py-1 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}