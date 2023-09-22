import React, {useState, useEffect} from 'react';
import axiosConfig from "../axiosConfig";
import WebAlertMessage from "./WebAlertMessage";
import webUrl from "../webUrlConfig";

const WebUserProfileEditForm = (props) => {
    // const {authUser} = useAuthContext();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [userImage, setUserImage] = useState('');
    const [avatar, setaAatar] = useState(null);
    const [alertMsg, setAlertMsg] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
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

    // Assuming you have user data available in authUser
    useEffect(() => {
        if (props.editUserData) {
            setName(props.editUserData.name || '');
            setGender(props.editUserData.gender || '');
            setUserImage(webUrl+props.editUserData.avatar || '');
        }
    }, [props.editUserData]);
    // if npt use this way not working..

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            var formdata = new FormData();
            formdata.append('name', name);
            formdata.append('gender', gender);
            formdata.append('avatar', avatar);
            await axiosConfig.post('user/update/' + props.editUserData.id, formdata)
                .then((response) => {
                    if (response.data.responseStatus === 1) {
                        setName(response.data.user.name);
                        setGender(response.data.user.gender);
                        setUserImage(response.data.user.avatar);
                    }
                    setAlertMsg(response.data.message);
                }).catch((error) => {
                    console.log('error', error);
                    setAlertMsg(error);
                });
        } catch (error) {
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
                            <label className="form-label">Upload Your Image</label>
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
                    <label className="form-label">Name</label>
                    <input type="name" id="name" className="form-control"
                           value={name}
                           onChange={handleName}/>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label className="form-label">Gender</label>
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
                <button type="submit" className="btn btn-success mt-3">Submit</button>
            </form>
        </>
    );
}

export default WebUserProfileEditForm;