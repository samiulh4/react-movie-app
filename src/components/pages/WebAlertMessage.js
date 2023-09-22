import React from 'react';

const WebAlertMessage = ({message, type}) => {
    return message ? (
        <div className={`alert ${type} alert-dismissible fade show`} role="alert">
            <strong>Message !</strong> {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    ) : null;
};

export default WebAlertMessage;
