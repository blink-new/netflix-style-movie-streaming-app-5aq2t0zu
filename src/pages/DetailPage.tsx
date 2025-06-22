import { useParams } from 'react-router-dom'
import { useMovies } from '../context/MovieContext'
import { motion } from 'framer-motion'
import { Star, Calendar, Clock } from 'lucide-react'
import { Button } from '../components/ui/button'
import { VideoModal } from '../components/VideoModal'
import { useState } from 'react'

const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { movies, tvShows } = useMovies()
  const [showVideoModal, setShowVideoModal] = useState(false)

  const allMedia = [...movies, ...tvShows]
  const media = allMedia.find(m => m.id === id)

  if (!media) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <h1 className="text-2xl text-white">Media not found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${media.thumbnail})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 flex items-end h-full p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-2xl">
              {media.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-300">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{media.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{media.year}</span>
              </div>
              {media.type === 'tv-show' ? (
                <div className="flex items-center gap-1">
                  <span>{media.seasons} Seasons</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{media.duration}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-4 md:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Storyline</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              {media.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {media.genre.map(g => (
                <span key={g} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {g}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Button 
              size="lg" 
              className="w-full bg-red-600 hover:bg-red-700 text-lg"
              onClick={() => setShowVideoModal(true)}
            >
              <Play className="w-6 h-6 mr-2 fill-current" />
              Play
            </Button>
          </div>
        </div>
      </div>

      <VideoModal 
        movie={media}
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />
    </div>
  )
}

export default DetailPage