import React, {useState, useEffect, useCallback} from "react";
import styled from './WebMovieDetailPage.module.css';
import WebNav from "../partials/WebNav";
import WebFooter from "../partials/WebFooter";
import WebAuthorCard from "../sections/WebAuthorCard";
import WebMovieDetailCard from "../sections/WebMovieDetailCard";
import {useParams} from 'react-router-dom';
import axios from "axios";
import apiUrl from "../apiConfig";
import webUrl from "../webUrlConfig";
import handleImagePathError from "../config/ImageErrorPath";
import defaultImageUrl from '../../images/default-image.jpg';

const WebMovieDetailPage = () => {
    const {movieId} = useParams();
    const [movieTitle, setMovieTitle] = useState(null);
    const [movieYear, setMovieYear] = useState(null);
    const [movieCreatedAt, setMovieCreatedAt] = useState(null);
    const [movieAuthorName, setMovieAuthorName] = useState(null);
    const [movieDescription, setMovieDescription] = useState(null);
    const [movieCover, setMovieCover] = useState(defaultImageUrl);
    const [authorCardInfo, setCardAuthorInfo] = useState({});
    const [movieCardInfo, setMovieCardInfo] = useState({});


    const getMovieDataById = useCallback(async () => {
        if (movieId) {
            try {
                await axios.get(`${apiUrl}movie/get-movie-view-data-by-Id/${movieId}`).then((response) => {
                    if (response.data.responseStatus === 1) {
                        setMovieTitle(response.data.movie.title);
                        setMovieYear(response.data.movie.released_year);
                        setMovieCreatedAt(response.data.movie.created_at);
                        setMovieAuthorName(response.data.movie.author_name);
                        setMovieDescription(response.data.movie.description);
                        setMovieCover(response.data.movie.cover);
                        const newAuthorInfo = {
                            authorName: response.data.movie.author_name,
                            authorEmail: response.data.movie.author_email,
                            authorAvatar: response.data.movie.author_avatar,
                        };
                        setCardAuthorInfo(newAuthorInfo);
                        const newMovieInfo = {
                            moviePicture: response.data.movie.picture,
                            movieLanguage: response.data.movie.language_title,
                            movieCountry: response.data.movie.country_title,
                            movieId: movieId,
                        }
                        setMovieCardInfo(newMovieInfo)
                    }
                }).catch((error) => {
                    console.log('Axios catch error :', error);
                });
            } catch (error) {
                console.log('Try catch error :', error);
            }
        }
    }, [movieId]);
    useEffect(() => {
        getMovieDataById()
    }, [getMovieDataById]);
    return (
        <>
            <WebNav/>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="article_content">
                            <div className="article_header mb-4">
                                <h1 className="fw-bolder mb-1">{movieTitle} {movieYear ? `(${movieYear})` : null}</h1>
                                <div className="article_meta_content text-muted fst-italic mb-2">
                                    {`Posted on ${movieCreatedAt} updated by ${movieAuthorName}`}
                                </div>
                                <a className="badge bg-info text-decoration-none link-light" href="#!">Action</a>
                                <a className="badge bg-secondary text-decoration-none link-light" href="#!">Drama</a>
                            </div>
                            <figure className={`mb-4 ${styled.movie_figure_picture}`}>
                                {movieCover ? (
                                    <img
                                        className={`img-fluid rounded`}
                                        src={`${webUrl}${movieCover}`}
                                        alt="..."
                                        onError={handleImagePathError}
                                    />
                                ) : (
                                    <img
                                        className={`img-fluid rounded`}
                                        src={defaultImageUrl}
                                        alt="..."
                                    />
                                )}

                            </figure>
                            <section className="article_context mb-5">
                                <p className="fs-5 mb-4">{movieDescription}</p>
                            </section>
                        </div>
                        <section className="mb-5">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <form className="mb-4">
                                        <textarea className="form-control" rows="3"
                                                  placeholder="Join the discussion and leave a comment!"></textarea>
                                    </form>
                                    <div className="d-flex mt-3">
                                        <div className="flex-shrink-0"><img className="rounded-circle"
                                                                            src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                                                                            alt="..."/></div>
                                        <div className="ms-3">
                                            <div className="fw-bold">Commenter Name</div>
                                            If you're going to lead a space frontier, it has to be government; it'll
                                            never be private enterprise. Because the space frontier is dangerous, and
                                            it's expensive, and it has unquantified risks.
                                        </div>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <div className="flex-shrink-0"><img className="rounded-circle"
                                                                            src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                                                                            alt="..."/></div>
                                        <div className="ms-3">
                                            <div className="fw-bold">Commenter Name</div>
                                            When I look at the universe and all the ways the universe wants to kill us,
                                            I find it hard to reconcile that with statements of beneficence.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-lg-4">
                        <WebMovieDetailCard movieCardInfo={movieCardInfo}/>
                        <WebAuthorCard authorCardInfo={authorCardInfo}/>
                        <div className="card mb-4">
                            <div className="card-header">Search</div>
                            <div className="card-body">
                                <div className="input-group">
                                    <input className="form-control" type="text" placeholder="Enter search term..."
                                           aria-label="Enter search term..." aria-describedby="button-search"/>
                                    <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-header">Categories</div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <ul className="list-unstyled mb-0">
                                            <li><a href="#!">Web Design</a></li>
                                            <li><a href="#!">HTML</a></li>
                                            <li><a href="#!">Freebies</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-6">
                                        <ul className="list-unstyled mb-0">
                                            <li><a href="#!">JavaScript</a></li>
                                            <li><a href="#!">CSS</a></li>
                                            <li><a href="#!">Tutorials</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <WebFooter/>
        </>
    );
}

export default WebMovieDetailPage;
