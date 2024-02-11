import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer/index'
import Alert from './components/Alert'
function App() {
  return (
    <div className='app'>
      <Navbar />
      <Alert />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
