import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import AddFilmFr from './AddFilmFr'

const AddFilm = () => {
  return (
    <div className="AdminTop">
      <Sidebar />
      <div className="listContainer">
        <Header />
        <AddFilmFr />
      </div>
    </div>
  )
}
export default AddFilm