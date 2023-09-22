import React from "react";
import WebNav from "../partials/WebNav";
import WebFooter from "../partials/WebFooter";
import WebMovieAddForm from "./WebMovieAddForm";

const WebMovieAddPage = () => {
    return (<>
        <WebNav/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-6 mx-auto">
                        <div className="card my-4">
                            <div className="card-header">
                                <h3 className="text-center">Create New Movie</h3>
                            </div>
                            <div className="card-body">
                                <WebMovieAddForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <WebFooter/>
    </>);
}


export default WebMovieAddPage;