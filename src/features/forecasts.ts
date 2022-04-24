import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {forecastsApi} from '../api/forecasts';
import {forecastsSample} from '../fixtures/forecasts';

export type IsUmbrellaNecessary = 'NECESSARY' | 'MAYBE' | 'UNNECESSARY';

export type Forecast = {
  date: string;
  dateLabel: string;
  telop: string;
  detail: {weather: string; wind: string};
  temperature: {min: string | null; max: string | null};
  chanceOfRain: {
    T00_06: number | null;
    T06_12: number | null;
    T12_18: number | null;
    T18_24: number;
  };
  imageUrl: string;
  isUmbrellaNecessary: IsUmbrellaNecessary;
};

export type ForecastsState = {
  values: Forecast[];
};

const initialState: ForecastsState = {
  values: [],
};

export const fetchForecastByCityCode = createAsyncThunk<any, string>(
  'forecasts/fetchByCityCode/',
  async citiyId => {
    const result = await fetch(
      `https://weather.tsukumijima.net/api/forecast/city/${citiyId}`,
    );
    return result.json();
  },
);

export const forecastsSlice = createSlice({
  name: 'forecasts',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchForecastByCityCode.fulfilled, (state, action) => {
      state.values = castApiResult(action.payload);
    });
  },
});

export const castApiResult = (body: any): Forecast[] => {
  return [
    {...forecastsSample[0], date: body.forecasts[0].date},
    forecastsSample[1],
  ];
};

export default forecastsSlice.reducer;
