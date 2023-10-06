import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

const WebMovieSearchCard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchTerm = (e) =>{
        setSearchTerm(e.target.value);
    };
    const handleSearchSubmit = async (e) =>{
        e.preventDefault();
        if (!searchTerm) {
            document.getElementById('searchTerm').style.border = '1px solid red';
            return false;
        } else {
            document.getElementById('searchTerm').style.border = '1px solid #ccc';
        }
        navigate('/web/movie/search/'+searchTerm);
    };
    return (
        <div className="card mb-4">
            <div className="card-header"><h5 className="text-center">Enter search term</h5></div>
            <div className="card-body">
                <form onSubmit={handleSearchSubmit}>
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search..."
                               aria-label="Search..." aria-describedby="button-search" id="searchTerm" onChange={handleSearchTerm}/>
                        <button className="btn btn-dark" id="button-search" type="submit">Go</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WebMovieSearchCard;