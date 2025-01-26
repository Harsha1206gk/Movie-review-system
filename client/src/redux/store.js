import { configureStore } from "@reduxjs/toolkit";
import { loadersSlice } from "./loadersSlice.js";
import { usersSlice } from "./usersSlice.js";

const store = configureStore({
  reducer: {
    loaders: loadersSlice.reducer,
    users: usersSlice.reducer,
  },
});

export default store;
