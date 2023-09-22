import React from 'react';
import webUrl from '../webUrlConfig';
import styles from './WebAuthorCard.module.css';
import defaultUser from '../../images/default-user.jpg';

const WebAuthorCard = (props) => {
    return (
        <div className="card mb-4">
            {props.authorCardInfo.authorAvatar?(
                <img className={`card-img-top ${styles.author_image}`} src={`${webUrl}${props.authorCardInfo.authorAvatar}`} alt="..."/>
            ):(
                <img className={`card-img-top ${styles.author_image}`} src={defaultUser} alt="..."/>
            )}

            <div className="card-body">
                <h4 className="card-text text-secondary text-center">{props.authorCardInfo.authorName?(props.authorCardInfo.authorName):null}</h4>
                <h5 className="card-text text-primary text-center">{props.authorCardInfo.authorEmail?(props.authorCardInfo.authorEmail):null}</h5>
            </div>
        </div>
    );
}

export default WebAuthorCard;
