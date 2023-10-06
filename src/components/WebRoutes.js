import React from 'react';
import {Route, Routes} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import WebHomePage from "./pages/WebHomePage";
import WebSignInPage from "./pages/WebSignInPage";
import WebUserProfileEditPage from "./pages/WebUserProfileEditPage";
import WebSignUpPage from "./pages/WebSignUpPage";
import WebMoviesPage from "./pages/WebMoviesPage";
import WebMovieAddPage from "./pages/WebMovieAddPage";
import WebMovieDetailPage from "./pages/WebMovieDetailPage";
import WebMovieEditPage from "./pages/WebMovieEditPage";
import WebMovieSearchPage from "./pages/WebMovieSearchPage";

const WebRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<WebHomePage/>}/>
            <Route path="/sign-in" element={<WebSignInPage/>}/>
            <Route path="/sign-up" element={<WebSignUpPage/>}/>
            <Route path="/web/movies" element={<WebMoviesPage/>}/>
            <Route path="/web/movie/add" element={<WebMovieAddPage/>}/>
            <Route path="/web/user/profile/edit/:userId" element={<WebUserProfileEditPage/>}/>
            <Route path="/web/movie/view/:movieId" element={<WebMovieDetailPage/>}/>
            <Route path="/web/movie/edit/:movieId" element={<WebMovieEditPage/>}/>
            <Route path="/web/movie/search/:searchTerm" element={<WebMovieSearchPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default WebRoutes;
