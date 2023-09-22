import React from "react";
import letterX from '../../images/letter-x.gif';

function NotFoundPage() {
    return (
        <div>
            <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                <img src={letterX} alt="..." style={{width: "100px", height: "100px"}}/>
                <h1 className="text-danger">Sorry ! Page Not Found.</h1>
            </div>
        </div>
    );
}

export default NotFoundPage;