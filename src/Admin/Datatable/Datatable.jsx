import './datatable.scss'
import { useEffect, useState } from 'react'
import myApi from '../../service/service'
import Spinner from '../../components/Spinner/Spinner'
import { Link } from 'react-router-dom'
import { DataGrid } from "@mui/x-data-grid";
import { filmColumns } from '../../datatablesource'


const Datatable = () => {
  const [films, setFilms] = useState([])

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  useEffect(() => {
    myApi.get('/films').then((response) => {
      setFilms(response.data)
      console.log(response.data)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  const handleDelete = async (id) => {
    try {
      await myApi.delete(`/films/edit/${id}`)
      setFilms(films.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err)
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/films/edit/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  if (!films || !films.length) {
    return <Spinner />
  }
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link to={`/admin/films/create`} className="link">
          Add New
        </Link>
        <img src='https://cdn.icon-icons.com/icons2/266/PNG/512/France_29740.png' alt='France' width={72} height={54} style={{ paddingRight: 20 }} />
      </div>
      {films && (
        <DataGrid
          className="datagrid"
          rows={films}
          columns={filmColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  )
}

export default Datatable