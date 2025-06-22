export interface Movie {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  category: string
  year: number
  duration: string
  rating: string
  genre: string[]
  featured?: boolean
}

export interface MovieUpload {
  title: string
  description: string
  category: string
  type: 'movie' | 'tv-show'
  year: number
  duration: string
  rating: string
  genre: string[]
  thumbnail: File | null
  video: File | null
  videoUrl?: string
}