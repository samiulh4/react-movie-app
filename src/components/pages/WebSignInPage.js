import React, {useState} from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import WebNav from "../partials/WebNav";
import WebFooter from "../partials/WebFooter";
import axiosConfig from "../axiosConfig";
import {useAuthContext} from "../AuthContext";
import apiUrl from "../apiConfig";
import WebAlertMessage from "./WebAlertMessage";


const WebSignInPage = () => {
    const {authLogin} = useAuthContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const navigate = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}sign-in`, {
                email: username,
                password: password
            }).then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('auth_token', response.data.token);
                    localStorage.setItem('auth_token_expire', response.data.expires_in);
                    getSignInUserData(response.data.token);
                    navigate('/');
                } else {
                    setAlertMsg(response.data.message);
                }
            }).catch((error) => {
                console.log('API-Catch-Error =>', error);
                setAlertMsg(error.message);
            });
        } catch (error) {
            console.log('Method-Catch-Error =>', error);
            setAlertMsg(error.message);
        }
        setUsername('');
        setPassword('');
    }
    const getSignInUserData = async (token) => {
        await axiosConfig.get('sign-in-user')
            .then(response => {
                if (response.data.responseStatus === 1) {
                    authLogin(response.data.user);
                } else {
                    setAlertMsg(response.data.message);
                }
            })
            .catch(error => console.log(error));
    }// end -:- getSignInUserData()
    return (<div>
        <WebNav/>
        <div className="container-fluid">
            <div className="row">
                <WebAlertMessage message={alertMsg} type={`alert-info`}/>
                <div className="col-md-6 mx-auto">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h3 className="text-center">Sign In</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <label className="form-label">Email</label>
                                    <input type="email" id="email" className="form-control"
                                           value={username}
                                           onChange={handleUsername}/>
                                </div>
                                <div className="row">
                                    <label className="form-label">Password</label>
                                    <input type="password" id="password" className="form-control"
                                           value={password}
                                           onChange={handlePassword}/>
                                </div>
                                <button type="submit" className="btn btn-success mt-3">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <WebFooter/>
    </div>);
};

export default WebSignInPage;