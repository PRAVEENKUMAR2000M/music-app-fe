import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "../src/context/StateProvider";
import { initialState } from "../src/context/initialState";
import reducer from "../src/context/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        <Router>
            <StateProvider initialState={initialState} reducer={reducer}>
                <App />
            </StateProvider>
        </Router>
);
