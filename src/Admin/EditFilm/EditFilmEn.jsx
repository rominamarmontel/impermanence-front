import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
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