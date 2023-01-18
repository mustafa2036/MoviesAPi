import React from 'react'
import {Link} from 'react-router-dom';

export default function Navbar(props) {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-tranparent py-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">Noxe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {props.userData?<>
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="movies">Movies</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="tv">Tv</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="person">Person</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="contact">Contact</Link>
                    </li>
                    </>:''}
                    
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item d-flex align-items-center order-lg-first order-last">
                        <i className="fab mx-2 fa-facebook"></i>
                        <i className="fab mx-2 fa-twitter"></i>
                        <i className="fab mx-2 fa-linkedin"></i>
                        <i className="fab mx-2 fa-soundcloud"></i>
                        <i className="fab mx-2 fa-instagram"></i>
                    </li>
                    {props.userData?<>
                        <li className="nav-item order-lg-last order-first">
                            <span onClick={props.logOut} className="nav-link cursor">Logout</span>
                        </li>
                    </>:<>
                        <li className="nav-item order-lg-last order-first">
                            <Link className="nav-link" to="login">Login</Link>
                        </li>   
                        <li className="nav-item order-lg-last order-first">
                            <Link className="nav-link" to="register">Register</Link>
                        </li>
                    </>}
                </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}
