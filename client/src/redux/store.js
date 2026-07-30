/*
File: store.js

Purpose:
Configures the Redux store for the application.
All global state (authentication, users, SOPs, dashboard, etc.)
will be managed from here.
*/

import { configureStore } from "@reduxjs/toolkit";

// Import reducers here as they are created
// Example:
// import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    // auth: authReducer,
  },
});

export default store;