import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/Header/Header';
import EditFilmFr from './EditFilmFr'

const AddFilm = () => {
  return (
    <div className="AdminTop">
      <Sidebar />
      <div className="listContainer">
        <Header />
        <EditFilmFr />
      </div>
    </div>
  )
}
export default AddFilm