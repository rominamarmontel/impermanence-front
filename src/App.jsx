import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import IsLoggedOut from './components/IsLoggedOut'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage/HomePage'
import FilmDetails from './pages/FilmDetails/FilmDetails'
import Layout from './pages/Layout'
import Login from './pages/Login'
import AddFilm from './Admin/AddFilm/AddFilm'
import AdminTop from './Admin/AdminTop/AdminTop'
import EditFilm from './Admin/EditFilm/EditFilm'
import AboutPage from './pages/AboutPage/AboutPage'
import FilmDetailsEn from './pages/FilmDetails/FilmDetailsEn'
import AboutPageEn from './pages/AboutPage/AboutPageEn'
import AddFilmEn from './Admin/AddFilm/AddFilmEn'
import EditFilmEn from './Admin/EditFilm/EditFilmEn'
import FilmPage from './pages/FilmPage/FilmPage'
import FilmPageEn from './pages/FilmPage/FilmPageEn'
import { filmColumns } from './datatablesource'


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
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/top" element={<AdminTop columns={filmColumns} />} />
          <Route path='/admin/films/edit/:frenchId' element={<EditFilm />} />
          <Route path='/admin/films/edit/:frenchId/en' element={<EditFilmEn />} />
          <Route path="/admin/films/create" element={<AddFilm />} />
          <Route path="/admin/films/create/:frenchId/en" element={<AddFilmEn />} />
        </Route>
        <Route element={<IsLoggedOut />}>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Route>
      </Routes>
    </div >
  )
}
export default App;