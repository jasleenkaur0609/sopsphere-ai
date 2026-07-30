/*
========================================================
File: main.jsx

Purpose:
This is the entry point of the React application.

What this file does:
- Starts the React application.
- Connects Redux for global state management.
- Enables React Router for page navigation.
- Applies the Material UI theme.
- Loads global CSS.
========================================================
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";

import App from "./App";
import store from "./redux/store";
import theme from "./theme/theme";
import "./index.css";

// Render the React application into the root div
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
 
    <Provider store={store}>

      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* Applies a consistent base style across browsers */}
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);