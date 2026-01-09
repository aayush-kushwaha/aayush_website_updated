import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import YooshWidget from './components/YooshWidget'

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <YooshWidget />
    </div>
  )
}
