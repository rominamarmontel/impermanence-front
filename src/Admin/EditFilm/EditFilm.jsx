import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
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