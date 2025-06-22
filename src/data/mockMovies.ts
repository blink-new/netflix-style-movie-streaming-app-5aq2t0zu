import { Movie } from '../types/movie'

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=900&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'trending',
    year: 2016,
    duration: '51m',
    rating: 'TV-14',
    genre: ['Drama', 'Fantasy', 'Horror'],
    featured: true
  },
  {
    id: '2',
    title: 'The Crown',
    description: 'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
    thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0301ba50b3a?w=600&h=900&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'trending',
    year: 2016,
    duration: '58m',
    rating: 'TV-MA',
    genre: ['Biography', 'Drama', 'History']
  },
  {
    id: '3',
    title: 'Black Mirror',
    description: 'An anthology series exploring a twisted, high-tech near-future where humanity\'s greatest innovations and darkest instincts collide.',
    thumbnail: 'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=600&h=900&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'trending',
    year: 2011,
    duration: '60m',
    rating: 'TV-MA',
    genre: ['Drama', 'Sci-Fi', 'Thriller']
  },
  {
    id: '4',
    title: 'Ozark',
    description: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=900&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'crime',
    year: 2017,
    duration: '60m',
    rating: 'TV-MA',
    genre: ['Crime', 'Drama', 'Thriller']
  },
  {
    id: '5',
    title: 'The Witcher',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    thumbnail: 'https://images.unsplash.com/photo-1578662015562-5b73afb23824?w=600&h=900&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    category: 'fantasy',
    year: 2019,
    duration: '60m',
    rating: 'TV-MA',
    genre: ['Adventure', 'Drama', 'Fantasy']
  },
  {
    id: '6',
    title: 'Money Heist',
    description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    thumbnail: 'https://images.unsplash.com/photo-1586953071245-7b3d8c7d34dd?w=600&h=900&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    category: 'crime',
    year: 2017,
    duration: '70m',
    rating: 'TV-MA',
    genre: ['Action', 'Crime', 'Mystery']
  },
  {
    id: '7',
    title: 'Avatar: The Last Airbender',
    description: 'In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny as the Avatar.',
    thumbnail: 'https://images.unsplash.com/photo-1612198105320-12d04d6dd852?w=600&h=900&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    category: 'animation',
    year: 2005,
    duration: '23m',
    rating: 'TV-Y7',
    genre: ['Animation', 'Adventure', 'Family']
  },
  {
    id: '8',
    title: 'The Mandalorian',
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=900&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    category: 'sci-fi',
    year: 2019,
    duration: '40m',
    rating: 'TV-14',
    genre: ['Action', 'Adventure', 'Sci-Fi']
  }
]