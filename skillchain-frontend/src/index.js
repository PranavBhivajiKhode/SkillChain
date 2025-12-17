// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import "bootstrap/dist/css/bootstrap.min.css";
// import Client from 'react-dom/client';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//     {/* <Client /> */}

//   </React.StrictMode>
// );
// reportWebVitals();


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Fonts (you won't use GeistSans.variable like in Next.js, just import the CSS/fonts here if needed)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App2 from "./Practice/App2";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
    {/* <App2 /> */}
  </React.StrictMode>
);

reportWebVitals();
