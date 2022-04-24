import {configureStore} from '@reduxjs/toolkit';
import forecasts from './features/forecasts';

export const store = configureStore({
  reducer: {
    forecasts,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
