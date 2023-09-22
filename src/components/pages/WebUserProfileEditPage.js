import React, {useEffect, useState,useCallback} from 'react';
import WebNav from "../partials/WebNav";
import WebFooter from "../partials/WebFooter";
import WebUserProfileEditForm from "./WebUserProfileEditForm";
import {useParams} from 'react-router-dom';
// import axios from 'axios';
import axiosConfig from '../axiosConfig';

const WebUserProfileEditPage = () => {
    const {userId} = useParams();
    const [editUserData, setEditUserData] = useState(null);
    // const getSignInUserData = async () => {
    //     const apiUrl = `http://localhost:9000/api/user/user-data-by-Id/${userId}`;
    //     const authToken = localStorage.getItem('auth_token');
    //     const axiosInstance = axios.create({
    //         headers: {
    //           Authorization: `Bearer ${authToken}`,
    //         },
    //       });
    //       axiosInstance.get(apiUrl)
    //       .then((response) => {
    //         console.log(response.data.user);
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching user data:', error);
    //       });
    // }// end -:- getSignInUserData()
    const getSignInUserData = useCallback(async () => {
        if (userId) {
            try {
                const response = await axiosConfig.get('user/user-data-by-Id/' + userId);
                setEditUserData(response.data.user);
            } catch (error) {
                console.log(error);
            }
        }
    }, [userId]);
    useEffect(() => {
        getSignInUserData();
    }, [getSignInUserData]);
    return (<>
        <WebNav/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h3 className="text-center">User Profile</h3>
                        </div>
                        <div className="card-body">
                            {editUserData ? (<WebUserProfileEditForm editUserData={editUserData}/>) :
                                <h5 className="text-center text-danger">User Data Not Found</h5>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <WebFooter/>
    </>);
}
export default WebUserProfileEditPage;