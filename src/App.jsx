import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import IsLoggedOut from '../src/components/IsLoggedOut'
import ProtectedRoute from '../src/components/ProtectedRoute'
import HomePage from './pages/HomePage/HomePage'
import FilmPage from './pages/FilmPage/FilmPage'
import FilmDetails from './pages/FilmDetails/FilmDetails'
import Layout from './pages/Layout'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AddFilm from './pages/AddFilm'
import AdminTop from './pages/AdminTop'
import EditFilm from './pages/EditFilm'
import AboutPage from './pages/AboutPage/AboutPage'
import FilmPageEn from './pages/FilmPage/FilmPageEn'
import FilmDetailsEn from './pages/FilmDetails/FilmDetailsEn'
import AboutPageEn from './pages/AboutPage/AboutPageEn'
import AdminTopEn from './pages/AdminTopEn'
import AddFilmEn from './pages/AddFilmEn'
import EditFilmEn from './pages/EditFilmEn'

function App() {
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en');
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route element={<Layout isEnglish={isEnglish} />}>
          <Route path='/about' element={<AboutPage />} />
          <Route path='/films' element={<FilmPage />} />
          <Route path='/films/:id' element={<FilmDetails />} />
          <Route path='/en/films' element={<FilmPageEn />} />
          <Route path='/en/films/:id' element={<FilmDetailsEn />} />
          <Route path='/en/about' element={<AboutPageEn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/top" element={<AdminTop />} />
            <Route path="/admin/en/top" element={<AdminTopEn />} />
            <Route path='/admin/films/edit/:id' element={<EditFilm />} />
            <Route path='/admin/en/films/edit/:id' element={<EditFilmEn />} />
            <Route path="/admin/films/create" element={<AddFilm />} />
            <Route path="/admin/en/films/create" element={<AddFilmEn />} />
          </Route>
          <Route element={<IsLoggedOut />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

        </Route>
      </Routes>
    </div >
  )
}
export default App;