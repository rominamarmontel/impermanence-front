import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'


const Sidebar = () => {
  const { authenticateUser, removeToken } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleClick = () => {
    removeToken(); // 
    authenticateUser();
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" target="_blank" style={{ textDecoration: "none" }}>
          <span className="logo">impermanence<br />films</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin/top" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <button className="icon-button" onClick={handleClick} style={{ display: 'flex', backgroundColor: 'transparent', margin: 0, padding: 0 }}>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="bottom">

      </div>
    </div>
  );
};

export default Sidebar;
