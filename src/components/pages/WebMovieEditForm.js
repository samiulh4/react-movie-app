import React, {useState, useEffect} from 'react';
import axios from "axios";
import axiosConfig from "../axiosConfig";
import WebAlertMessage from "./WebAlertMessage";
import defaultImage from "../../images/default-image.jpg";
import apiUrl from "../apiConfig";
import webUrl from "../webUrlConfig";
import handleImagePathError from "../config/ImageErrorPath";
import ReactSelect from "react-select"; // Import react-select
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";

const WebMovieEditForm = (props) => {

    const [title, setTitle] = useState(props.editMovieData.title);
    const [released_year, setReleasedYear] = useState(props.editMovieData.released_year);
    const [released_date, setReleasedDate] = useState(props.editMovieData.released_date);
    const [description, setDescription] = useState(props.editMovieData.description);
    const [language_id, setLanguage] = useState(props.editMovieData.language_id);
    const [country_id, setCountry] = useState(props.editMovieData.country_id);
    const [picture, setPicture] = useState(null);
    const [movieImg, setMovieImg] = useState(webUrl + props.editMovieData.picture);
    const [cover, setCover] = useState(null);
    const [movieCover, setMovieCover] = useState(webUrl + props.editMovieData.cover);

    const [countries, setCountries] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('alert-info');

    const [selectedLanguage, setSelectedLanguage] = useState(null); // If it not used then change value not displayed.
    const [selectedCountry, setSelectedCountry] = useState(null);


    const fetchCountries = async () => {
        try {
            const response = await axios.get(`${apiUrl}data/get-countries`);
            if (response.data) {
                setCountries(response.data.countries);
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }
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
    }
    useEffect(() => {
        fetchCountries();
        fetchLanguages();
    }, []);
    const languageOptions = languages.map((language) => ({
        value: language.id,
        label: language.language_name,
    }));
    const countryOptions = countries.map((country) => ({
        value: country.id,
        label: country.nice_name_en,
    }));
    useEffect(() => {
        if (props.editMovieData.language_id) {
            const initialLanguage = languages.find(
                (language) => language.id === props.editMovieData.language_id
            );
            if (initialLanguage) {
                setSelectedLanguage({
                    value: initialLanguage.id,
                    label: initialLanguage.language_name,
                });
            }
        }
    }, [props.editMovieData.language_id, languages]);

    useEffect(() => {
        if (props.editMovieData.country_id) {
            const initialCountry = countries.find(
                (country) => country.id === props.editMovieData.country_id
            );
            if (initialCountry) {
                setSelectedCountry({
                    value: initialCountry.id,
                    label: initialCountry.nice_name_en,
                });
            }
        }
    }, [props.editMovieData.country_id, countries]);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleReleasedYear = (e) => {
        setReleasedYear(e.target.value);
    }
    const handleReleasedDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setReleasedDate(formattedDate);
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
    const handleCover = (e) => {
        const file = e.target.files[0];
        setCover(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            setMovieCover(event.target.result);
        };
        reader.readAsDataURL(file);
    }
    const handleLanguage = (selectedOption) => {
        setSelectedLanguage(selectedOption);
        setLanguage(selectedOption.value);
    }
    const handleCountry = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setCountry(selectedOption.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;
        // if (!picture || !picture.name) {
        //     isValid = false;
        //     document.getElementById('picture').style.border = '1px solid red';
        // } else {
        //     document.getElementById('picture').style.border = '1px solid #ccc';
        // }
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
        if (isValid) {
            try {
                var formdata = new FormData();
                formdata.append('title', title);
                formdata.append('released_year', released_year);
                formdata.append('released_date', released_date);
                formdata.append('description', description);
                formdata.append('picture', picture);
                formdata.append('cover', cover);
                formdata.append('language_id', language_id);
                formdata.append('country_id', country_id);
                // console.log(released_date);
                // return false;
                await axiosConfig.post('movie/update/' + props.movieId, formdata)
                    .then((response) => {
                        if (response.data.responseStatus === 1) {
                            setTitle(response.data.movie.title);
                            setReleasedYear(response.data.movie.released_year);
                            setReleasedDate(response.data.movie.released_date);
                            setDescription(response.data.movie.description);
                            setPicture('');
                            setMovieImg(webUrl + response.data.movie.picture);
                            setCover('');
                            setMovieCover(webUrl + response.data.movie.cover);
                            setLanguage(response.data.movie.language_id);
                            setCountry(response.data.movie.country_id);
                        }
                        setAlertType('alert-success');
                        setAlertMsg(response.data.message);
                    }).catch((error) => {
                        console.log('Axios catch error', error);
                        setAlertType('alert-danger');
                        setAlertMsg(error.message);
                    });
            } catch (error) {
                console.log('Try catch error', error);
                setAlertType('alert-danger');
                setAlertMsg(error);
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
                        <div className="col-md-6">
                            <label className="form-label"><strong>Upload Movie Picture</strong></label>
                            <input className="form-control" type="file" id="picture"
                                   onChange={handlePicture}/>
                        </div>
                        <div className="col-md-6">
                            {movieImg ? (
                                <img src={movieImg} className="img-fluid img-thumbnail rounded float-end"
                                     alt="..."
                                     style={{height: '200px', width: '200px'}}
                                     onError={handleImagePathError}
                                />
                            ) : (
                                <img src={defaultImage} className="img-fluid img-thumbnail rounded float-end"
                                     alt="..."
                                     style={{height: '200px', width: '200px'}}/>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label"><strong>Upload Movie Cover</strong></label>
                            <input className="form-control" type="file" id="cover"
                                   onChange={handleCover}/>
                        </div>
                        <div className="col-md-6">
                            {movieCover ? (
                                <img src={movieCover} className="img-fluid img-thumbnail rounded float-end"
                                     alt="..."
                                     style={{height: '200px', width: '200px'}}
                                     onError={handleImagePathError}
                                />
                            ) : (
                                <img src={defaultImage} className="img-fluid img-thumbnail rounded float-end"
                                     alt="..."
                                     style={{height: '200px', width: '200px'}}/>
                            )}


                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-12">
                            <label className="form-label"><strong>Title</strong></label>
                            <input type="name" id="title" className="form-control"
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
                            <input type="name" id="released_year" className="form-control"
                                   value={released_year}
                                   onChange={handleReleasedYear}/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label"><strong>Release Date</strong></label>
                            <DatePicker
                                id="released_date"
                                selected={released_date ? new Date(released_date) : null}
                                onChange={(date) => handleReleasedDate(date)}
                                className="form-control"
                                dateFormat="yyyy-MM-dd"
                                placeholderText="yyyy-mm-dd"
                                showYearDropdown
                                scrollableYearDropdown
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label"><strong>Language</strong></label>
                            <ReactSelect
                                id="language_id"
                                value={selectedLanguage}
                                onChange={handleLanguage}
                                options={languageOptions}
                                placeholder="--Select Language--"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label"><strong>Country</strong></label>
                            <ReactSelect
                                id="country_id"
                                value={selectedCountry}
                                onChange={handleCountry}
                                options={countryOptions}
                                placeholder="--Select Country--"
                            />
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 text-start">
                        {props.movieId?(
                            <Link  className="btn btn-md btn-secondary mt-3" to={`/web/movie/view/${props.movieId}`}>Back</Link>
                        ):null}
                    </div>
                    <div className="col-md-6 text-end">
                        <button type="submit" className="btn btn-success mt-3">Submit</button>
                    </div>
                </div>

            </form>
        </>
    );
}

export default WebMovieEditForm;