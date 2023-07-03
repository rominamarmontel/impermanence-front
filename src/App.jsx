import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import IsLoggedOut from './components/IsLoggedOut'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage/HomePage'
import FilmDetails from './pages/FilmDetails/FilmDetails'
import Layout from './pages/Layout'
// import Signup from './pages/Signup'
import Login from './pages/Login'
import AddFilm from './pages/Admin/AddFilm'
import AdminTop from './pages/Admin/AdminTop'
import EditFilm from './pages/Admin/EditFilm'
import AboutPage from './pages/AboutPage/AboutPage'
import FilmDetailsEn from './pages/FilmDetails/FilmDetailsEn'
import AboutPageEn from './pages/AboutPage/AboutPageEn'
import AddFilmEn from './pages/Admin/AddFilmEn'
import EditFilmEn from './pages/Admin/EditFilmEn'
import { lazy } from 'react'

const FilmPage = lazy(() => import('./pages/FilmPage/FilmPage'))
const FilmPageEn = lazy(() => import('./pages/FilmPage/FilmPageEn'))

function App() {
  const location = useLocation();
  const isEnglish = location.pathname.endsWith('/en') || location.pathname.startsWith('/en');
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route element={<Layout isEnglish={isEnglish} />}>
          <Route path='/about' element={<AboutPage />} />
          <Route path='/films' element={<FilmPage />} />
          <Route path='/films/:frenchId' element={<FilmDetails />} />
          <Route path='/en/films' element={<FilmPageEn />} />
          <Route path='/films/:frenchId/en' element={<FilmDetailsEn />} />
          <Route path='/en/about' element={<AboutPageEn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/top" element={<AdminTop />} />
            <Route path='/admin/films/edit/:frenchId' element={<EditFilm />} />
            <Route path='/admin/films/edit/:frenchId/en' element={<EditFilmEn />} />
            <Route path="/admin/films/create" element={<AddFilm />} />
            <Route path="/admin/films/create/:frenchId/en" element={<AddFilmEn />} />
          </Route>
          <Route element={<IsLoggedOut />}>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
          </Route>
        </Route>
      </Routes>
    </div >
  )
}
export default App;