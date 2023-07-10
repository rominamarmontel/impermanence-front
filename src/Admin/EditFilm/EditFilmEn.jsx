import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import EditFilmEnTop from './EditFilmEnTop'

const AddFilmEn = () => {
  return (
    <div className="AdminTop">
      <Sidebar />
      <div className="listContainer">
        <Header />
        <EditFilmEnTop />
      </div>
    </div>
  )
}
export default AddFilmEn