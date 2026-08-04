import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import App from "./App";
import store from "./redux/store";
import theme from "./theme";

import "./index.css";
import "./styles/globals.css";
import "./styles/variables.css";
import "./styles/typography.css";
import "./styles/layout.css";
import "./styles/buttons.css";
import "./styles/cards.css";
import "./styles/forms.css";
import "./styles/tables.css";
import "./styles/dashboard.css";
import "./styles/animations.css";
import "./styles/scrollbar.css";
import "./styles/utilities.css";
import "./styles/responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={4}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);