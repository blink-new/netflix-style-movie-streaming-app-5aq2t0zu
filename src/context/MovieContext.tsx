import React, { createContext, useContext, useState, useEffect } from 'react'
import { Movie } from '../types/movie'
import { mockMovies } from '../data/mockMovies'

interface MovieContextType {
  movies: Movie[]
  featuredMovie: Movie | null
  addMovie: (movie: Movie) => void
  getMoviesByCategory: (category: string) => Movie[]
  searchMovies: (query: string) => Movie[]
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

export const useMovies = () => {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider')
  }
  return context
}

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)

  useEffect(() => {
    // Load initial mock data
    setMovies(mockMovies)
    setFeaturedMovie(mockMovies.find(movie => movie.featured) || mockMovies[0])
  }, [])

  const addMovie = (movie: Movie) => {
    setMovies(prev => [...prev, movie])
  }

  const getMoviesByCategory = (category: string) => {
    return movies.filter(movie => movie.category === category)
  }

  const searchMovies = (query: string) => {
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.description.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
    )
  }

  return (
    <MovieContext.Provider value={{
      movies,
      featuredMovie,
      addMovie,
      getMoviesByCategory,
      searchMovies
    }}>
      {children}
    </MovieContext.Provider>
  )
}