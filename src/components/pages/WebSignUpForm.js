import React, {useState} from 'react';
import axios from "axios";
import WebAlertMessage from "./WebAlertMessage";
import {useNavigate} from 'react-router-dom';
import DefaultAvatar from '../../images/default-avatar.png';
import apiUrl from "../apiConfig";

const WebSignUpForm = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [userImage, setUserImage] = useState(DefaultAvatar);
    const [avatar, setaAatar] = useState(null);
    const [alertMsg, setAlertMsg] = useState('');
    const navigate = useNavigate();

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleGender = (e) => {
        setGender(e.target.value);
    }
    const handleAvatar = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        setaAatar(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            setUserImage(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            var formdata = new FormData();
            formdata.append('name', name);
            formdata.append('gender', gender);
            formdata.append('avatar', avatar);
            formdata.append('password', password);
            formdata.append('email', email);
            await axios.post(`${apiUrl}sign-up`, formdata)
                .then((response) => {
                    if (response.data.responseStatus === 1) {
                        alert(response.data.message);
                        navigate('/sign-in');
                    } else {
                        setAlertMsg(response.data.message);
                    }
                }).catch((error) => {
                    console.log('error', error);
                    setAlertMsg(error);
                });
        } catch (error) {
            setAlertMsg(error);
            console.log('catch-error', error);
        }
    }
    return (
        <>
            <WebAlertMessage message={alertMsg} type={`alert-info`}/>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label"><strong>Upload Your Image</strong></label>
                            <input className="form-control" type="file" id="avatar"
                                   onChange={handleAvatar}/>
                        </div>
                        <div className="col-md-6">
                            <img src={userImage} className="img-fluid img-thumbnail rounded float-end"
                                 alt="..."
                                 style={{height: '200px', width: '200px'}}/>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <label className="form-label"><strong>Name</strong></label>
                    <input type="name" id="name" className="form-control"
                           value={name}
                           onChange={handleName}/>
                </div>
                <div className="row">
                    <label className="form-label"><strong>E-mail</strong></label>
                    <input type="name" id="email" className="form-control"
                           value={email}
                           onChange={handleEmail}/>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label className="form-label"><strong>Gender</strong></label>
                        <select
                            className="form-select"
                            id="gender"
                            value={gender}
                            onChange={handleGender}
                        >
                            <option value="">Select Gender</option>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                            <option value="t">Transgender</option>
                            <option value="o">Other</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <label className="form-label"><strong>Password</strong></label>
                    <input type="password" id="password" className="form-control"
                           value={password}
                           onChange={handlePassword}/>
                </div>
                <button type="submit" className="btn btn-success mt-3">Submit</button>
            </form>
        </>
    );
}

export default WebSignUpForm;