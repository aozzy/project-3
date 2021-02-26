import { Link, withRouter } from 'react-router-dom'
import React from 'react'
import { getLoggedInUserId } from '../lib/auth'

//import axios from 'axios'
const NavBar = ({ history }) => {
  function handleLogout() {
    localStorage.removeItem('token') 
    history.push('/')
  }

  const loggedIn = getLoggedInUserId()


  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-menu is-active">
      <div className="navbar-start">
        <img className="navbar-logo" src="https://res.cloudinary.com/dznpk39i0/image/upload/v1614268790/rtdxyxqfxywcygegrrzj.png"/>
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/" className="button">
              Home
            </Link>
            <Link to='/project-3/cityscapes/discover' className="button">
              Discover
            </Link>
            <Link to='/project-3/cityscapes/flights' className="button">
              Flights
            </Link>
            <Link to='/project-3/cityscapes/map' className="button">
              Covid 19 Map
            </Link>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/project-3/register" className="button" id="reg-log-button">
              Register
            </Link>
            <Link to="/project-3/login" className="button" id="reg-log-button">
              Login
            </Link>
            {loggedIn && <button onClick={handleLogout} className="button" id="reg-log-button">
              Logout
            </button>}
          </div>
        </div>
      </div>
    </div>
  </nav>
}
export default withRouter(NavBar)
