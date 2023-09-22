import React from "react";
import { Link } from 'react-router-dom';
import movieIcon from '../../images/movie.png';
// import styles from './WebNav.module.css';
import { useNavigate } from 'react-router-dom';
import axiosConfig from "../axiosConfig";
import { useAuthContext } from "../AuthContext";
import webUrl from "../webUrlConfig";



const WebNav = () => {

    const { authUser, authLogout } = useAuthContext();
    const navigate = useNavigate();


    const sign_out = (e) => {
        axiosConfig.get('/sign-out')
            .then(response => {
                if (response.data.responseCode === 200) {
                    alert(response.data.message);
                } else {
                    alert(response.data.message);
                }
                authLogout();
            }).catch(error => {
                authLogout();
                alert(error);
                console.log('sign_out (error) :', error);
            });
        navigate('/sign-in');
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={movieIcon} alt="..." style={{ width: "30px", height: "30px" }} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/web/movies">Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">

                            {authUser ? (
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"> <img src={`${webUrl}${authUser.avatar}`} alt="..." style={{ width: "30px", height: "30px" }} /> {authUser.name}
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to={`/web/user/profile/edit/${authUser.id}`}>
                                                {authUser.email}
                                            </Link>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={sign_out}>Sign Out</button>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/sign-in">Sign In</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/sign-up">Sign Up</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>);
};

export default WebNav;