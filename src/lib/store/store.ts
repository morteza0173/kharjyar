import { configureStore } from "@reduxjs/toolkit";
import { filterTimeSlice } from "./filterTimeReducer";

export const store = configureStore({
  reducer: {
    filterTime: filterTimeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
