import React, {useState, useEffect, useCallback} from 'react';
import {Link, useParams} from 'react-router-dom';
import WebNav from "../partials/WebNav";
import WebFooter from "../partials/WebFooter";
import WebAlertMessage from "./WebAlertMessage";
import WebMovieSearchCard from "../sections/WebMovieSearchCard";
import axios from "axios";
import apiUrl from "../apiConfig";
import WebMovieCard from "../sections/WebMovieCard";
import webUrl from "../webUrlConfig";

const WebMovieSearchPage = () => {
    const {searchTerm} = useParams();
    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('alert-info');
    const [movies, setMovies] = useState([]);

    const getMoviesSearchTerm = useCallback(async () => {
        if (searchTerm) {
            try {
                await axios.get(`${apiUrl}movie/search-data/${searchTerm}`)
                    .then((response) => {
                        if (response.data.responseStatus === 1) {
                            setMovies(response.data.movies);
                        } else {
                            setAlertType('alert-danger');
                            setAlertMsg(response.data.message);
                        }
                    }).catch((error) => {
                        setAlertType('alert-danger');
                        setAlertMsg(error.name + '=>' + error.message);
                        console.log(error);
                    });
            } catch (error) {
                console.log('Try catch error', error);
                setAlertType('alert-danger');
                setAlertMsg(error.message);
            }
        }
    }, [searchTerm]);

    useEffect(() => {
        getMoviesSearchTerm();
    }, [getMoviesSearchTerm]);

    return (<>
        <WebNav/>
        <div className="container-fluid">
            <WebAlertMessage message={alertMsg} type={alertType}/>
            <div className="row">
                <div className="col-md-12 py-2">
                    <Link className="btn btn-md btn-success" to="/web/movies">Back</Link>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-xxl-9 col-lg-9 col-md-9 col-sm-12">
                    <div className="row">
                        {movies.length > 0 ? (movies.map(movie => (
                            <WebMovieCard
                                key={movie.id}
                                movie_id={movie.id}
                                movie_title={movie.title}
                                movie_picture={`${webUrl}${movie.picture}`}
                                movie_country={movie.country_title}
                                movie_year={movie.released_year}
                                movie_language={movie.language_name}
                            />
                        ))) : (
                            <h1 className="text-center text-danger mt-4">No movies found !</h1>
                        )}
                    </div>
                </div>
                <div className="col-xxl-3 col-lg-3 col-md-3 col-sm-12">
                    <WebMovieSearchCard/>
                </div>
            </div>
        </div>
        <WebFooter/>
    </>);
};

export default WebMovieSearchPage;