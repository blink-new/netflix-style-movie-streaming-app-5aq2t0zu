import { useState } from 'react'
import { Upload, Film, Image, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { motion } from 'framer-motion'
import { useMovies } from '../context/MovieContext'
import { MovieUpload } from '../types/movie'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const UploadPage = () => {
  const navigate = useNavigate()
  const { addMovie } = useMovies()
  const [isUploading, setIsUploading] = useState(false)
  const [videoInputType, setVideoInputType] = useState<'file' | 'url'>('file')
  const [movieData, setMovieData] = useState<MovieUpload>({
    title: '',
    description: '',
    category: '',
    type: 'movie',
    year: new Date().getFullYear(),
    duration: '',
    rating: '',
    genre: [],
    thumbnail: null,
    video: null,
    videoUrl: '',
    seasons: 1
  })

  const categories = [
    { value: 'trending', label: 'Trending' },
    { value: 'crime', label: 'Crime' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'animation', label: 'Animation' },
    { value: 'sci-fi', label: 'Sci-Fi' },
    { value: 'drama', label: 'Drama' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'horror', label: 'Horror' }
  ]

  const ratings = [
    { value: 'G', label: 'G - General Audiences' },
    { value: 'PG', label: 'PG - Parental Guidance' },
    { value: 'PG-13', label: 'PG-13 - Parents Strongly Cautioned' },
    { value: 'R', label: 'R - Restricted' },
    { value: 'TV-Y', label: 'TV-Y - All Children' },
    { value: 'TV-Y7', label: 'TV-Y7 - Directed to Older Children' },
    { value: 'TV-G', label: 'TV-G - General Audience' },
    { value: 'TV-PG', label: 'TV-PG - Parental Guidance' },
    { value: 'TV-14', label: 'TV-14 - Parents Strongly Cautioned' },
    { value: 'TV-MA', label: 'TV-MA - Mature Audience Only' }
  ]

  const availableGenres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 
    'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 
    'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
  ]

  const handleFileChange = (type: 'thumbnail' | 'video', file: File | null) => {
    setMovieData(prev => ({
      ...prev,
      [type]: file
    }))
  }

  const handleVideoUrlChange = (url: string) => {
    setMovieData(prev => ({
      ...prev,
      videoUrl: url,
      video: null // Clear file input if URL is used
    }))
  }

  const handleGenreToggle = (genre: string) => {
    setMovieData(prev => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter(g => g !== genre)
        : [...prev.genre, genre]
    }))
  }

  const handleTypeChange = (type: 'movie' | 'tv-show') => {
    setMovieData(prev => ({ ...prev, type }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!movieData.title || !movieData.description || !movieData.category) {
      toast.error('Please fill in all required fields')
      return
    }

    if (videoInputType === 'file' && !movieData.video) {
      toast.error('Please upload a video file.')
      return
    }

    if (videoInputType === 'url' && !movieData.videoUrl) {
      toast.error('Please provide a video URL.')
      return
    }

    setIsUploading(true)

    try {
      // In a real app, you would upload files to a storage service
      // For now, we'll simulate the upload process
      await new Promise(resolve => setTimeout(resolve, 2000))

      const newMovie = {
        id: Date.now().toString(),
        title: movieData.title,
        description: movieData.description,
        thumbnail: movieData.thumbnail ? URL.createObjectURL(movieData.thumbnail) : 'https://images.unsplash.com/photo-1489599746576-b47c5e1b5f36?w=600&h=900&fit=crop',
        videoUrl: movieData.video ? URL.createObjectURL(movieData.video) : movieData.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        category: movieData.category,
        type: movieData.type,
        year: movieData.year,
        duration: movieData.duration || '120m',
        rating: movieData.rating || 'PG-13',
        genre: movieData.genre.length > 0 ? movieData.genre : ['Drama'],
        seasons: movieData.seasons
      }

      addMovie(newMovie)
      toast.success('Movie uploaded successfully!')
      
      // Reset form
      setMovieData({
        title: '',
        description: '',
        category: '',
        type: 'movie',
        year: new Date().getFullYear(),
        duration: '',
        rating: '',
        genre: [],
        thumbnail: null,
        video: null,
        videoUrl: '',
        seasons: 1
      })
      setVideoInputType('file')

      // Navigate to home page after a short delay
      setTimeout(() => {
        navigate('/')
      }, 1500)

    } catch {
      toast.error('Failed to upload movie. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Upload New Movie
          </h1>
          
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Film className="w-6 h-6 text-red-500" />
                Movie Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type Selection */}
                <div className="flex justify-center gap-4 mb-6">
                  <Button 
                    type="button"
                    variant={movieData.type === 'movie' ? 'default' : 'outline'}
                    onClick={() => handleTypeChange('movie')}
                    className="w-32"
                  >
                    Movie
                  </Button>
                  <Button 
                    type="button"
                    variant={movieData.type === 'tv-show' ? 'default' : 'outline'}
                    onClick={() => handleTypeChange('tv-show')}
                    className="w-32"
                  >
                    TV Show
                  </Button>
                </div>

                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      value={movieData.title}
                      onChange={(e) => setMovieData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter movie title"
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-white">
                      Year
                    </Label>
                    <Input
                      id="year"
                      type="number"
                      value={movieData.year}
                      onChange={(e) => setMovieData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                      placeholder="2024"
                      className="bg-gray-800 border-gray-600 text-white"
                      min="1900"
                      max={new Date().getFullYear() + 5}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={movieData.description}
                    onChange={(e) => setMovieData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter movie description"
                    className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                    required
                  />
                </div>

                {/* Category and Rating */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">Category *</Label>
                    <Select
                      value={movieData.category}
                      onValueChange={(value) => setMovieData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value} className="text-white">
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Rating</Label>
                    <Select
                      value={movieData.rating}
                      onValueChange={(value) => setMovieData(prev => ({ ...prev, rating: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {ratings.map((rating) => (
                          <SelectItem key={rating.value} value={rating.value} className="text-white">
                            {rating.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {movieData.type === 'tv-show' ? (
                    <div className="space-y-2">
                      <Label htmlFor="seasons" className="text-white">
                        Seasons
                      </Label>
                      <Input
                        id="seasons"
                        type="number"
                        value={movieData.seasons || 1}
                        onChange={(e) => setMovieData(prev => ({ ...prev, seasons: parseInt(e.target.value) }))}
                        placeholder="e.g., 3"
                        className="bg-gray-800 border-gray-600 text-white"
                        min="1"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-white">
                        Duration
                      </Label>
                      <Input
                        id="duration"
                        value={movieData.duration}
                        onChange={(e) => setMovieData(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="e.g., 120m"
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  )}
                </div>

                {/* Genres */}
                <div className="space-y-2">
                  <Label className="text-white">Genres</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableGenres.map((genre) => (
                      <Badge
                        key={genre}
                        variant={movieData.genre.includes(genre) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${
                          movieData.genre.includes(genre)
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800'
                        }`}
                        onClick={() => handleGenreToggle(genre)}
                      >
                        {genre}
                        {movieData.genre.includes(genre) && (
                          <X className="w-3 h-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* File Uploads */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Thumbnail Upload */}
                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <Image className="w-4 h-4" />
                      Thumbnail Image
                    </Label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange('thumbnail', e.target.files?.[0] || null)}
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <label htmlFor="thumbnail-upload" className="cursor-pointer">
                        {movieData.thumbnail ? (
                          <div>
                            <img
                              src={URL.createObjectURL(movieData.thumbnail)}
                              alt="Thumbnail preview"
                              className="w-full h-32 object-cover rounded-lg mb-2"
                            />
                            <p className="text-sm text-gray-400">{movieData.thumbnail.name}</p>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-400">Click to upload thumbnail</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Video Input */}
                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <Film className="w-4 h-4" />
                      Video Source
                    </Label>
                    <div className="flex gap-2 mb-4">
                      <Button 
                        type="button"
                        variant={videoInputType === 'file' ? 'default' : 'outline'}
                        onClick={() => setVideoInputType('file')}
                        className="flex-1"
                      >
                        Upload File
                      </Button>
                      <Button 
                        type="button"
                        variant={videoInputType === 'url' ? 'default' : 'outline'}
                        onClick={() => setVideoInputType('url')}
                        className="flex-1"
                      >
                        Use URL
                      </Button>
                    </div>
                    {videoInputType === 'file' ? (
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileChange('video', e.target.files?.[0] || null)}
                          className="hidden"
                          id="video-upload"
                        />
                        <label htmlFor="video-upload" className="cursor-pointer">
                          {movieData.video ? (
                            <div>
                              <Film className="w-12 h-12 text-red-500 mx-auto mb-2" />
                              <p className="text-sm text-white font-medium">{movieData.video.name}</p>
                              <p className="text-xs text-gray-400">
                                {(movieData.video.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          ) : (
                            <div>
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-400">Click to upload video</p>
                            </div>
                          )}
                        </label>
                      </div>
                    ) : (
                      <Input
                        id="video-url"
                        type="url"
                        value={movieData.videoUrl || ''}
                        onChange={(e) => handleVideoUrlChange(e.target.value)}
                        placeholder="Enter video URL (e.g., https://example.com/video.mp4)"
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isUploading}
                    className="bg-red-600 hover:bg-red-700 text-white px-12 py-3 text-lg font-semibold"
                  >
                    {isUploading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </div>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Movie
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default UploadPage