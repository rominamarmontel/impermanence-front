import "../init"
import React from "react";
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App";
import { AuthContextWrapper } from "./context/auth.context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextWrapper>
        <App />
      </AuthContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
