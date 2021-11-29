import { configureStore } from "@reduxjs/toolkit";
import projectModalReducer from "../screens/project-list/project-list.slice";
import authReducer from "store/auth.slice";

export const rootReducer = {
  projectModal: projectModalReducer,
  user: authReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
