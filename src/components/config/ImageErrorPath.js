import imageNotFound from '../../images/image-not-found.png';

const handleImagePathError = (e) => {
    e.target.src = imageNotFound;
}

export default handleImagePathError;