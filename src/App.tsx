import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import DetailPage from './pages/DetailPage' // Added import statement
import { Header } from './components/Header'
import { MovieProvider } from './context/MovieContext'

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/details/:id" element={<DetailPage />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
              },
            }}
          />
        </div>
      </Router>
    </MovieProvider>
  )
}

export default App