import React from "react";
import { Link } from 'react-router-dom';
import styles from "./WebMovieCard.module.css";
import defaultMoviePoster from "../../images/default-movie-poster.jpg";


const WebMovieCard = (props) => {
    const handleImageError = (e) => {
        e.target.src = defaultMoviePoster;
    };
    return (
        <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6">
            <div className="card my-2">
                <img
                    src={props.movie_picture}
                    onError={handleImageError}
                    className={`card-img-top ${styles.movie_image}`}
                    alt="..."
                />
                <div className="card-body">
                    <h5 className={`card-title text-muted ${styles.movie_title}`}>{props.movie_title} </h5>
                    <h6 className="card-title">Releases Year : <span
                        className="badge bg-danger">{props.movie_year}</span></h6>
                    <p className="card-text">Country : <span className="badge bg-info">{props.movie_country}</span></p>
                    <p className="card-text">Language : <span
                        className="badge bg-warning text-dark">{props.movie_language}</span></p>
                    <div className="d-grid gap-2"><Link to={`/web/movie/view/${props.movie_id}`} className="btn btn-md btn-outline-success">View</Link></div>
                </div>
            </div>
        </div>
    );
};
export default WebMovieCard;