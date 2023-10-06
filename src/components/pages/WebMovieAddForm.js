import React, {useState, useEffect} from 'react';
import axiosConfig from "../axiosConfig";
import axios from "axios";
// import {useAuthContext} from "../AuthContext";
import WebAlertMessage from "./WebAlertMessage";
import defaultMoviePoster from "../../images/default-movie-poster.jpg";
import apiUrl from "../apiConfig";

const WebMovieAddForm = () => {

    const [title, setTitle] = useState('');
    const [released_year, setReleasedYear] = useState('');
    const [released_date, setReleasedDate] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState(null);
    const [picture_url, setPictureUrl] = useState('');
    const [movieImg, setMovieImg] = useState(defaultMoviePoster);
    const [language_id, setLanguage] = useState('');
    const [country_id, setCountry] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('alert-info');
    const [countries, setCountries] = useState([]);
    const [languages, setLanguages] = useState([]);

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`${apiUrl}data/get-countries`);
            if (response.data) {
                setCountries(response.data.countries);
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };
    const fetchLanguages = async () => {
        try {
            const response = await axios.get(`${apiUrl}data/get-languages`);
            if (response.data.responseStatus === 1) {
                setLanguages(response.data.languages);
            } else {
                setAlertType('alert-danger');
                setAlertMsg(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    };

    useEffect(() => {
        fetchCountries();
        fetchLanguages();
    }, []);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleReleasedYear = (e) => {
        setReleasedYear(e.target.value);
    }
    const handleReleasedDate = (e) => {
        setReleasedDate(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const handlePicture = (e) => {
        const file = e.target.files[0];
        setPicture(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            setMovieImg(event.target.result);
        };
        reader.readAsDataURL(file);
    }
    const handleLanguage = (e) => {
        setLanguage(e.target.value);
    }
    const handleCountry = (e) => {
        setCountry(e.target.value);
    }
    const handlePictureUrl = (e) => {
        setPictureUrl(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!title) {
            isValid = false;
            document.getElementById('title').style.border = '1px solid red';
        } else {
            document.getElementById('title').style.border = '1px solid #ccc';
        }
        if (!released_year) {
            isValid = false;
            document.getElementById('released_year').style.border = '1px solid red';
        } else {
            document.getElementById('released_year').style.border = '1px solid #ccc';
        }
        // if (!released_date) {
        //     isValid = false;
        //     document.getElementById('released_date').style.border = '1px solid red';
        // } else {
        //     document.getElementById('released_date').style.border = '1px solid #ccc';
        // }
        if (!language_id) {
            isValid = false;
            document.getElementById('language_id').style.border = '1px solid red';
        } else {
            document.getElementById('language_id').style.border = '1px solid #ccc';
        }
        if (!country_id) {
            isValid = false;
            document.getElementById('country_id').style.border = '1px solid red';
        } else {
            document.getElementById('country_id').style.border = '1px solid #ccc';
        }
        if ((!picture || !picture.name) && (!picture_url)) {
            isValid = false;
            document.getElementById('picture').style.border = '1px solid red';
            document.getElementById('picture_url').style.border = '1px solid red';
        } else {
            document.getElementById('picture').style.border = '1px solid #ccc';
            document.getElementById('picture_url').style.border = '1px solid #ccc';
        }
        if (isValid) {
            try {
                var formdata = new FormData();
                formdata.append('title', title);
                formdata.append('released_year', released_year);
                formdata.append('released_date', released_date);
                formdata.append('description', description);
                formdata.append('picture', picture);
                formdata.append('language_id', language_id);
                formdata.append('country_id', country_id);
                formdata.append('picture_url', picture_url);
                await axiosConfig.post('movie/store', formdata)
                    .then((response) => {
                        if (response.data.responseStatus === 1) {
                            setTitle('');
                            setReleasedYear('');
                            setReleasedDate('');
                            setDescription('');
                            setPicture('');
                            setMovieImg(defaultMoviePoster);
                            setLanguage('');
                            setCountry('');
                            setPictureUrl('');
                        }
                        setAlertType('alert-success');
                        setAlertMsg(response.data.message);
                    }).catch((error) => {
                        console.log('error', error);
                        setAlertMsg(error);
                    });
            } catch (error) {
                setAlertMsg(error);
                console.log('catch-error', error);
            }
        } else {
            setAlertType('alert-danger');
            setAlertMsg('Please fill out all required fields.');
        }
    }// end -:- handleSubmit()
    return (
        <>
            <WebAlertMessage message={alertMsg} type={alertType}/>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-12">
                            <label className="form-label"><strong>Title</strong></label>
                            <input type="text" id="title" className="form-control"
                                   value={title}
                                   onChange={handleTitle}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-12">
                            <label className="form-label"><strong>Description</strong></label>
                            <textarea className="form-control" id="description" rows="3" onChange={handleDescription}
                                      value={description}>{description}</textarea>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label"><strong>Release Year</strong></label>
                            <input type="text" id="released_year" className="form-control"
                                   value={released_year}
                                   onChange={handleReleasedYear}/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label"><strong>Release Date</strong></label>
                            <input type="date" id="released_date" className="form-control"
                                   value={released_date}
                                   onChange={handleReleasedDate}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label"><strong>Language</strong></label>
                            <select
                                className="form-select"
                                id="language_id"
                                value={language_id}
                                onChange={handleLanguage}
                            >
                                <option value="">--Select LANGUAGE--</option>
                                {languages.length > 0 ? (
                                    languages.map((language) => (
                                        <option key={language.id} value={language.id}>
                                            {language.language_name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Loading...</option>
                                )}
                                <option value="12">Bengali-বাংলা</option>
                                <option value="26">English</option>
                                <option value="56">Hindi-हिन्दी</option>
                                <option value="132">Urdu-اردو</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label"><strong>Country</strong></label>
                            <select
                                className="form-select"
                                id="country_id"
                                value={country_id}
                                onChange={handleCountry}
                            >
                                <option value="">--SELECT COUNTRY--</option>
                                {countries.length > 0 ? (
                                    countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.nice_name_en}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Loading...</option>
                                )}
                            </select>
                        </div>

                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6 mt-4">
                            <label className="form-label"><strong>Upload Movie Picture</strong></label>
                            <input className="form-control" type="file" id="picture"
                                   onChange={handlePicture}/>
                        </div>
                        <div className="col-md-6 mt-4">
                            <img src={movieImg} className="img-fluid img-thumbnail rounded float-end"
                                 alt="..."
                                 style={{height: '200px', width: '200px'}}/>

                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-12">
                            <label className="form-label"><strong>Movie Picture URL</strong></label>
                            <input type="text" id="picture_url" className="form-control"
                                   value={picture_url}
                                   onChange={handlePictureUrl}/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-6 text-start">
                        <button type="button" className="btn btn-md btn-secondary mt-3">Back</button>
                    </div>
                    <div className="col-md-6 text-end">
                        <button type="submit" className="btn btn-success mt-3">Submit</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default WebMovieAddForm;