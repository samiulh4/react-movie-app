import React, {useState, useEffect} from "react";
import WebNav from "../partials/WebNav";
import WebFooter from "../partials/WebFooter";
import {Link} from 'react-router-dom';
import apiUrl from "../apiConfig";
import axios from "axios";
import webUrl from "../webUrlConfig";
import WebMovieCard from "../sections/WebMovieCard";
import {useAuthContext} from "../AuthContext";

const WebMoviesPage = () => {
    const { authUser } = useAuthContext();
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get(`${apiUrl}movie/get-web-movies`)
            .then((response) => {
                if (response.data.responseStatus === 1) {
                    console.log(response.data.movies);
                    setMovies(response.data.movies);
                } else {
                    //setAlertMsg(response.data.message);
                }
            }).catch((error) => {
            console.log('error', error);
            //setAlertMsg(error);
        });
    }, []);
    return (<>
        <WebNav/>
        <div className="container-fluid">
            {authUser ?(
                <div className="row">
                    <div className="col-md-12 text-end pt-2">
                        <Link className="btn btn-md btn-success" to="/web/movie/add">Add Movie</Link>
                    </div>
                </div>
            ):null}
            <div className="row">
                {movies.map(movie => (
                    <WebMovieCard
                        key={movie.id}
                        movie_id={movie.id}
                        movie_title={movie.title}
                        movie_picture={`${webUrl}${movie.picture}`}
                        movie_country={movie.country_title}
                        movie_year={movie.released_year}
                        movie_language={movie.language_name}
                    />
                ))}
            </div>
        </div>
        <WebFooter/>
    </>);
}


export default WebMoviesPage;