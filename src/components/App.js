import React from "react";
import {BrowserRouter} from "react-router-dom";
import WebRoutes from "./WebRoutes";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <WebRoutes/>
            </div>
        </BrowserRouter>
    );
};

export default App;
