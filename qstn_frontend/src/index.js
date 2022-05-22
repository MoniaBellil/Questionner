import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// prime react

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

// Import CSS files for SurveyJS (survey-core) and Survey Creator
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";


//setup react router
import { BrowserRouter } from "react-router-dom";


//inject redux
import { Provider } from 'react-redux';
import store from './store/store';


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
