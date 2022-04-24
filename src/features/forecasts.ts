import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {forecastsApi} from '../api/forecasts';

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
  const validBody = validate(body);
  return validBody.forecasts.map((forecast: any) => {
    return {
      date: forecast.date,
      dateLabel: forecast.dateLabel,
      telop: forecast.telop,
      detail: {
        weather: forecast.detail.weather,
        wind: forecast.detail.wind,
      },
      temperature: {
        min: forecast.temperature.min.celsius,
        max: forecast.temperature.max.celsius,
      },
      chanceOfRain: {
        T00_06: parseChanceOfRain(forecast.chanceOfRain.T00_06),
        T06_12: parseChanceOfRain(forecast.chanceOfRain.T06_12),
        T12_18: parseChanceOfRain(forecast.chanceOfRain.T12_18),
        T18_24: parseChanceOfRain(forecast.chanceOfRain.T18_24),
      },
      imageUrl: forecast.image.url,
    };
  });
};

const validate = (body: any): any => {
  // todo 実装
  // joiなどでapiのshapeが壊れていないことをバリデートする
  return body;
};

/**
 * 数字 + '%' のstring型で定義されるchanceOfRainのパース
 * @param rainLabel
 */
const parseChanceOfRain = (rainLabel: string) => {
  // 1桁~3桁の数字(0 ~ 100)のみmatch
  const matched = rainLabel.match(/[0-9]{1,3}/);
  if (!matched) {
    return null;
  }
  return Number(matched);
};

export default forecastsSlice.reducer;
