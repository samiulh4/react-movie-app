import React from 'react';
import WebNav from "../partials/WebNav";
import WebFooter from "../partials/WebFooter";
import WebSignUpForm from "./WebSignUpForm";



const WebSignUpPage = () => {
    return (<>
        <WebNav/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h3 className="text-center">Sign Up</h3>
                        </div>
                        <div className="card-body">
                            <WebSignUpForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <WebFooter/>
    </>);
}
export default WebSignUpPage;