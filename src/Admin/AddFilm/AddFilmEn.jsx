import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/Header/Header';
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