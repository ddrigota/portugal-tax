import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./reducers/formSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      formSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
