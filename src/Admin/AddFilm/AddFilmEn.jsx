import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import AddFilmEnTop from './AddFilmEnTop'

const AddFilm = () => {
  return (
    <div className="AdminTop">
      <Sidebar />
      <div className="listContainer">
        <Header />
        <AddFilmEnTop />
      </div>
    </div>
  )
}
export default AddFilm