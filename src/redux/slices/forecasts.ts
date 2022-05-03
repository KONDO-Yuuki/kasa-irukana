import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  Forecast,
  ForecastsState,
  UmbrellaNecessary,
  UmbrellaNecessaryState,
} from '../../types/forecasts';

const initialState: ForecastsState = {
  startForecasts: [],
  goalForecasts: [],
  umbrellaNecessaryStates: [],
};

const createFetchForecastByCityCode = (name: string) =>
  createAsyncThunk<any, string>(name, async citiyId => {
    const result = await fetch(
      `https://weather.tsukumijima.net/api/forecast/city/${citiyId}`,
    );
    return result.json();
    // todo エラーハンドリングの実装
  });
export const fetchStartForecastByCityCode = createFetchForecastByCityCode(
  'fetchStartForecastByCityCode',
);
export const fetchEndForecastByCityCode = createFetchForecastByCityCode(
  'fetchEndForecastByCityCode',
);

export const forecastsSlice = createSlice({
  name: 'forecasts',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStartForecastByCityCode.fulfilled, (state, action) => {
      state.startForecasts = castApiResult(action.payload);
      if (
        state.startForecasts.length === 3 &&
        state.goalForecasts.length === 3
      ) {
        state.umbrellaNecessaryStates = calcUmbrellaNecessaries(
          state.startForecasts,
          state.goalForecasts,
        );
      }
    });
    builder.addCase(fetchEndForecastByCityCode.fulfilled, (state, action) => {
      state.goalForecasts = castApiResult(action.payload);
      if (
        state.startForecasts.length === 3 &&
        state.goalForecasts.length === 3
      ) {
        state.umbrellaNecessaryStates = calcUmbrellaNecessaries(
          state.startForecasts,
          state.goalForecasts,
        );
      }
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
      position: validBody.location.city,
      title: validBody.title,
      detail: {
        weather: forecast.detail.weather,
        wind: forecast.detail.wind,
      },
      temperature: {
        min: forecast.temperature.min.celsius,
        max: forecast.temperature.max.celsius,
      },
      chanceOfRainBy6Hours: [
        parseChanceOfRain(forecast.chanceOfRain.T00_06),
        parseChanceOfRain(forecast.chanceOfRain.T06_12),
        parseChanceOfRain(forecast.chanceOfRain.T12_18),
        parseChanceOfRain(forecast.chanceOfRain.T18_24),
      ],
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

/**
 *
 * @param startForecasts 出発地のForecast
 * @param goalForecasts 到着地のForecast
 * @returns UmbrellaNecessaryモデル(日付と傘が必要かどうかのステータス)
 */
export const calcUmbrellaNecessaries = (
  startForecasts: Forecast[],
  goalForecasts: Forecast[],
): UmbrellaNecessary[] => {
  return startForecasts.map(sf => {
    const gf = goalForecasts.find(g => g.date === sf.date);
    if (!gf) {
      return {date: sf.date, label: 'UNKNOWN'};
    }
    return {date: sf.date, label: isAmbrellaNecessary(sf, gf)};
  });
};

export const isAmbrellaNecessary = (
  startForecast: Forecast,
  goalForecast: Forecast,
): UmbrellaNecessaryState => {
  return startForecast.chanceOfRainBy6Hours.reduce(
    (
      accum: UmbrellaNecessaryState,
      currentStartPercent: number | null,
      i: number,
    ) => {
      const currentGoalPercent = goalForecast.chanceOfRainBy6Hours[i];
      // 0 : numberの事を考えてnullチェック
      if (currentStartPercent === null || currentGoalPercent === null) {
        // null(すでに経過した時刻)の場合は無視する
        return accum;
      }

      if (i === 0) {
        // 0 ~ 6時の天気は加味しない
        return accum;
      }

      if (
        accum === 'NECESSARY' ||
        currentStartPercent >= 30 ||
        currentGoalPercent >= 30
      ) {
        // すでにNECESSARY判定 or 降水確率30％より多いとNECESSARY
        return 'NECESSARY';
      }

      if (
        accum === 'MAYBE' ||
        currentStartPercent > 0 ||
        currentGoalPercent > 0
      ) {
        // すでにMAYBE判定 or 降水確率が0％より多いとMAYBE
        return 'MAYBE';
      }

      if (
        accum === 'UNNECESSARY' ||
        (currentStartPercent === 0 && currentGoalPercent === 0)
      ) {
        // 降水確率0％のときのみUNNECESSARY
        return 'UNNECESSARY';
      }

      return accum;
    },
    'UNKNOWN',
  );
};

export default forecastsSlice.reducer;
