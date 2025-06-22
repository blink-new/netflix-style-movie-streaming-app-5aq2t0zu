import { useMovies } from '../context/MovieContext'
import { HeroSection } from '../components/HeroSection'
import { MovieRow } from '../components/MovieRow'
import { motion } from 'framer-motion'

const HomePage = () => {
  const { getMoviesByCategory } = useMovies()

  const categories = [
    { title: 'Trending Now', key: 'trending' },
    { title: 'Crime Thrillers', key: 'crime' },
    { title: 'Fantasy Adventures', key: 'fantasy' },
    { title: 'Animation', key: 'animation' },
    { title: 'Sci-Fi', key: 'sci-fi' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black"
    >
      {/* Hero Section */}
      <HeroSection />
      
      {/* Movie Rows */}
      <div className="relative z-10 -mt-32 space-y-8 pb-20">
        {categories.map((category, index) => {
          const movies = getMoviesByCategory(category.key)
          if (movies.length === 0) return null
          
          return (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MovieRow 
                title={category.title}
                movies={movies}
              />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default HomePage