import './adminTop.scss'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import Datatable from '../Datatable/Datatable'
import { filmColumns } from '../../datatablesource'

const AdminTop = () => {
  return (
    <div className="AdminTop">
      <Sidebar />
      <div className="listContainer">
        <Header />
        <Datatable columns={filmColumns} />
      </div>
    </div>
  )
}

export default AdminTop