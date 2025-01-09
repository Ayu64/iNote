import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Mode from './Mode'

function Navbar() {

  let location = useLocation();
  // useEffect(()=>{
  //   console.log(location.pathname);
  // },[location] );
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
    navigate('/login'); // Uncomment this line if you want to redirect to login page after logout  
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{color:"floralwhite",fontSize:"20px"}}>iNoteBook</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link active" to="/login">Login</Link>
            </li> */}
          </ul>

            <Mode />
          {!localStorage.getItem("token")?<form className="d-flex" role="search">
              <Link className="btn btn-outline-info mx-1" to='/login' role='button'>Login</Link>
              <Link className="btn btn-outline-success" to='/signup' role='button'>SignUp</Link>
            </form>:<button onClick={handleLogout} className='btn btn-info'>Logout</button>}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
