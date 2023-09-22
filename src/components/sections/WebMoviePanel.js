import React from "react";
import styles from './WebMoviePanel.module.css';
import defaultMoviePoster from "../../images/default-movie-poster.jpg";

const WebMoviePanel = (props) => {
    // const handleImageError = () => {
    //     e.target.src = {defaultMoviePoster};
    // };
    return (
        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-sm-12">
            <div className={`${styles.movie_card}`}
                 style={{
                     backgroundImage: `url(${props.movie_image}), url(${defaultMoviePoster})`,
                 }}
            >
                <div className={`${styles.movie_box}`}>
                    <h5 className={`${styles.movie_name}`}>{props.movie_name}</h5>
                    <a href="https://www.youtube.com/"
                       className={`btn btn-success ${styles.movie_details_link}`}>View</a>
                </div>
            </div>
        </div>
    );
};
export default WebMoviePanel;
