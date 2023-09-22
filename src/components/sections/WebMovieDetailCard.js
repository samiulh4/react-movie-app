import React from 'react';
import styles from "./WebMovieDetailCard.module.css";
import {Link} from "react-router-dom";
import webUrl from "../webUrlConfig";
import handleImagePathError from "../config/ImageErrorPath";
import defaultImage from "../../images/default-image.jpg";
import {useAuthContext} from "../AuthContext";


const WebMovieDetailCard = (props) => {
    const { authUser } = useAuthContext();
    return (
        <div className="card mb-4">
            {props.movieCardInfo.moviePicture ? (
                <img className={`card-img-top ${styles.movie_picture}`}
                     src={`${webUrl}${props.movieCardInfo.moviePicture}`}
                     onError={handleImagePathError}
                     alt="..."/>
            ) : (
                <img className={`card-img-top ${styles.movie_picture}`} src={defaultImage} alt="..."/>
            )}

            <div className="card-body">
                <h6 className="card-text">Language: <span
                    className="badge bg-warning text-dark">{props.movieCardInfo.movieLanguage ? (props.movieCardInfo.movieLanguage) : null}</span>
                </h6>
                <h6 className="card-text">Country: <span
                    className="badge bg-primary text-light">{props.movieCardInfo.movieCountry ? (props.movieCardInfo.movieCountry) : null}</span>
                </h6>
                {authUser?(
                    <Link className="btn btn-sm btn-success" to={`/web/movie/edit/${props.movieCardInfo.movieId}`}>Edit</Link>
                ):null}
            </div>
        </div>
    );
}

export default WebMovieDetailCard;