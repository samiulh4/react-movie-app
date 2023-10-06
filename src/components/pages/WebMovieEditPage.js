import React, {useState, useCallback, useEffect} from "react";
import WebNav from "../partials/WebNav";
import WebFooter from "../partials/WebFooter";
import WebMovieEditForm from "./WebMovieEditForm";
import {useParams} from 'react-router-dom';
import axios from "axios";
import apiUrl from "../apiConfig";
import WebAlertMessage from "./WebAlertMessage";

const WebMovieEditPage = () => {
    const {movieId} = useParams();
    const [editMovieData, setEditMovieData] = useState(null);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('alert-info');

    const getMovieDataById = useCallback(async () => {
        if (movieId) {
            try {
                await axios.get(`${apiUrl}movie/get-movie-view-data-by-Id/${movieId}`).then((response) => {
                    if (response.data.responseStatus === 1) {
                        setEditMovieData(response.data.movie);
                    }
                }).catch((error) => {
                    setAlertType('alert-danger');
                    setAlertMsg('Axios catch error : '+error.message);
                });
            } catch (error) {
                setAlertType('alert-danger');
                setAlertMsg('Try catch error : '+error.message);
            }
        }
    }, [movieId]);
    useEffect(() => {
        getMovieDataById();
    }, [getMovieDataById]);
    return (<>
        <WebNav/>
        <div className="container-fluid">
            <WebAlertMessage message={alertMsg} type={alertType}/>
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-6 mx-auto">
                        <div className="card my-4">
                            <div className="card-header">
                                <h3 className="text-center text-success">Edit Movie</h3>
                            </div>
                            <div className="card-body">
                                {editMovieData?(
                                    <WebMovieEditForm movieId={movieId} editMovieData={editMovieData}/>
                                ):null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <WebFooter/>
    </>);
}


export default WebMovieEditPage;