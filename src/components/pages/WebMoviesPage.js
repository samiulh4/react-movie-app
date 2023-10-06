import React, {useState, useEffect} from "react";
import WebNav from "../partials/WebNav";
import WebFooter from "../partials/WebFooter";
import {Link} from 'react-router-dom';
import apiUrl from "../apiConfig";
import axios from "axios";
import webUrl from "../webUrlConfig";
import WebMovieCard from "../sections/WebMovieCard";
import {useAuthContext} from "../AuthContext";
import WebAlertMessage from "./WebAlertMessage";
import WebMovieSearchCard from "../sections/WebMovieSearchCard";

const WebMoviesPage = () => {
    const {authUser} = useAuthContext();
    const [movies, setMovies] = useState([]);
    const [searchData, setSearchData] = useState(null);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('alert-danger');

    const handleSearchData = (e) => {
        setSearchData(e.target.value);
    }
    useEffect(() => {
        axios.get(`${apiUrl}movie/get-web-movies`)
            .then((response) => {
                if (response.data.responseStatus === 1) {
                    setMovies(response.data.movies);
                } else {
                    //setAlertMsg(response.data.message);
                }
            }).catch((error) => {
            console.log('error', error);
            //setAlertMsg(error);
        });
    }, []);
    const submitSearchData = async (e) => {
        e.preventDefault();
        try {
            await axios.get(`${apiUrl}movie/search-data/${searchData}`)
                .then((response) => {
                    if (response.data.responseStatus === 1) {
                        setMovies(response.data.movies);
                    } else {
                        //setAlertMsg(response.data.message);
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
    return (<>
        <WebNav/>
        <div className="container-fluid">
            <WebAlertMessage message={alertMsg} type={alertType}/>
            <div className="row">
                <div className="col-md-8 py-2">
                    <form className="d-flex flex-row flex-wrap justify-content-center" onSubmit={submitSearchData}>
                        <div className="input-group w-100">
                            <input type="text" id="search" className="form-control" placeholder="Search..."
                                   onChange={handleSearchData}/>
                            <button type="submit" className="btn btn-success btn-md">Search</button>
                        </div>
                    </form>
                </div>
                {authUser ? (
                    <div className="col-md-4 text-end pt-2">
                        <Link className="btn btn-md btn-success" to="/web/movie/add">Add Movie</Link>
                    </div>
                ) : null}
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
}


export default WebMoviesPage;