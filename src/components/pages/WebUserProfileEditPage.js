import React, {useEffect, useState, useCallback} from 'react';
import WebNav from "../partials/WebNav";
import WebFooter from "../partials/WebFooter";
import WebUserProfileEditForm from "./WebUserProfileEditForm";
import {useParams} from 'react-router-dom';
// import axios from 'axios';
import axiosConfig from '../axiosConfig';
import WebAlertMessage from "./WebAlertMessage";

const WebUserProfileEditPage = () => {
    const {userId} = useParams();
    const [editUserData, setEditUserData] = useState(null);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('alert-info');

    const getSignInUserData = useCallback(async () => {
        if (userId) {
            try {
                const response = await axiosConfig.get('user/user-data-by-Id/' + userId);
                setEditUserData(response.data.user);
            } catch (error) {
                setAlertType('alert-danger');
                setAlertMsg('Try catch error : ' + error.message);
            }
        }
    }, [userId]);
    useEffect(() => {
        getSignInUserData();
    }, [getSignInUserData]);
    return (<>
        <WebNav/>
        <div className="container-fluid">
            <WebAlertMessage message={alertMsg} type={alertType}/>
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