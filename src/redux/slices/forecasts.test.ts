import 'react-native';
import {
  forecastsSample,
  forecastRowData,
  umbrelleNecessarySample,
} from '../../fixtures/forecasts';
import {UmbrellaNecessaryState} from '../../types/forecasts';
import {
  calcUmbrellaNecessaries,
  castApiResult,
  isAmbrellaNecessary,
  initialState,
  forecastsSlice,
  fetchStartForecastByCityCode,
  fetchGoalForecastByCityCode,
} from './forecasts';

describe('forecastsSlice', () => {
  const rejectedPayload = {
    errorMessage: '通信に失敗しました',
    errorDetail: 'result.data.error',
  };
  describe('init', () => {
    it('reinitialize', () => {
      const startFulfilledState = forecastsSlice.reducer(initialState, {
        type: fetchStartForecastByCityCode.fulfilled.type,
        payload: forecastRowData,
      });
      const state = forecastsSlice.reducer(
        startFulfilledState,
        forecastsSlice.actions.init,
      );
      expect(state).toEqual(initialState);
    });
  });
  describe('fetchStartForecastByCityCode', () => {
    it('fulfilled', () => {
      const action = {
        type: fetchStartForecastByCityCode.fulfilled.type,
        payload: forecastRowData,
      };
      const state = forecastsSlice.reducer(initialState, action);
      expect(state.startForecasts).toMatchSnapshot();
      expect(state.goalForecasts).toHaveLength(0);
      expect(state.umbrellaNecessaryStates).toHaveLength(0);
      expect(state.error).toBeFalsy();
    });
    it('rejected', () => {
      const action = {
        type: fetchStartForecastByCityCode.rejected.type,
        payload: rejectedPayload,
      };
      const state = forecastsSlice.reducer(initialState, action);
      expect(state.startForecasts).toHaveLength(0);
      expect(state.goalForecasts).toHaveLength(0);
      expect(state.error).toBe(rejectedPayload.errorMessage);
    });
  });
  describe('fetchGoalForecastByCityCode', () => {
    it('fulfilled', () => {
      const action = {
        type: fetchGoalForecastByCityCode.fulfilled.type,
        payload: forecastRowData,
      };
      const state = forecastsSlice.reducer(initialState, action);
      expect(state.startForecasts).toHaveLength(0);
      expect(state.goalForecasts).toMatchSnapshot();
      expect(state.umbrellaNecessaryStates).toHaveLength(0);
      expect(state.error).toBeFalsy();
    });
    it('rejected', () => {
      const action = {
        type: fetchGoalForecastByCityCode.rejected.type,
        payload: rejectedPayload,
      };
      const state = forecastsSlice.reducer(initialState, action);
      expect(state.startForecasts).toHaveLength(0);
      expect(state.goalForecasts).toHaveLength(0);
      expect(state.error).toBe(rejectedPayload.errorMessage);
    });
  });
  describe('umbrellaNecessaryStates', () => {
    it('fulfilled start and goal', () => {
      const startFulfilledState = forecastsSlice.reducer(initialState, {
        type: fetchStartForecastByCityCode.fulfilled.type,
        payload: forecastRowData,
      });
      const state = forecastsSlice.reducer(startFulfilledState, {
        type: fetchGoalForecastByCityCode.fulfilled.type,
        payload: forecastRowData,
      });
      expect(state.umbrellaNecessaryStates).toHaveLength(3);
      expect(state.umbrellaNecessaryStates).toMatchSnapshot();
      expect(state.error).toBeFalsy();
    });
    it('fulfilled start but rejected goal', () => {
      const startFulfilledState = forecastsSlice.reducer(initialState, {
        type: fetchStartForecastByCityCode.fulfilled.type,
        payload: forecastRowData,
      });
      const state = forecastsSlice.reducer(startFulfilledState, {
        type: fetchGoalForecastByCityCode.rejected.type,
        payload: rejectedPayload,
      });
      expect(state.umbrellaNecessaryStates).toHaveLength(0);
      expect(state.error).toBe(rejectedPayload.errorMessage);
    });
    it('rejected start but fulfilled goal', () => {
      const startRejectedState = forecastsSlice.reducer(initialState, {
        type: fetchStartForecastByCityCode.rejected.type,
        payload: rejectedPayload,
      });
      const state = forecastsSlice.reducer(startRejectedState, {
        type: fetchGoalForecastByCityCode.fulfilled.type,
        payload: forecastRowData,
      });
      expect(state.umbrellaNecessaryStates).toHaveLength(0);
      expect(state.error).toBe(rejectedPayload.errorMessage);
    });
    it('rejected start and goal', () => {
      const startRejectedState = forecastsSlice.reducer(initialState, {
        type: fetchStartForecastByCityCode.rejected.type,
        payload: rejectedPayload,
      });
      const state = forecastsSlice.reducer(startRejectedState, {
        type: fetchGoalForecastByCityCode.rejected.type,
        payload: rejectedPayload,
      });
      expect(state.umbrellaNecessaryStates).toHaveLength(0);
      expect(state.error).toBe(rejectedPayload.errorMessage);
    });
  });
});

describe('castApiResult', () => {
  it('fixture同士が変換できること', () => {
    const result = castApiResult(forecastRowData);
    expect(result).toMatchObject(forecastsSample);
  });
});

describe('calcUmbrellaNecessaries', () => {
  it('startForecastsに対応したgoalForecastsが無いとUNKNOWNになること', () => {
    const result = calcUmbrellaNecessaries(forecastsSample, []);
    expect(result).toMatchObject([
      {date: '2022-04-24', label: 'UNKNOWN'},
      {date: '2022-04-25', label: 'UNKNOWN'},
      {date: '2022-04-26', label: 'UNKNOWN'},
    ]);
  });
  it('fixture同士が変換できること', () => {
    const result = calcUmbrellaNecessaries(forecastsSample, forecastsSample);
    expect(result).toMatchObject(umbrelleNecessarySample);
  });
});
test.each<
  [
    number | null,
    number | null,
    number | null,
    number | null,
    number | null,
    number | null,
    number | null,
    number | null,
    UmbrellaNecessaryState,
  ]
>([
  [100, 100, 100, 100, 100, 100, 100, 100, 'NECESSARY'],
  [null, 20, 0, 0, null, 100, 0, 0, 'NECESSARY'],
  [0, 0, 0, 0, 0, 0, 0, 0, 'UNNECESSARY'],
  [null, 0, 0, 0, null, 0, 0, 0, 'UNNECESSARY'],
  [null, 20, 0, 0, null, 0, 0, 0, 'MAYBE'],

  [null, 30, 0, 0, null, 0, 0, 0, 'NECESSARY'], // 境界値
  [null, 29, 0, 0, null, 0, 0, 0, 'MAYBE'], // 境界値
  [null, 1, 0, 0, null, 0, 0, 0, 'MAYBE'], // 境界値
  [null, 0, 0, 0, null, 0, 0, 0, 'UNNECESSARY'], // 境界値

  [null, null, 0, 0, null, null, 0, 0, 'UNNECESSARY'],
  [null, null, null, 0, null, null, null, 100, 'NECESSARY'],
  [100, 0, 0, 0, 100, 0, 0, 0, 'UNNECESSARY'], // 明け方雨でも傘はいらない
  [100, 30, 0, 0, 100, 0, 0, 0, 'NECESSARY'],
])(
  'isAmbrellaNecessary関数　start側の T00_06:%s, T06_12:%s、ST12_18:%s、T18_24:%s goal側の T00_06:%s, T06_12:%s、ST12_18:%s、T18_24:%sだと%sになる',
  (
    ST00_06,
    ST06_12,
    ST12_18,
    ST18_24,
    GT00_06,
    GT06_12,
    GT12_18,
    GT18_24,
    exp,
  ) => {
    const result = isAmbrellaNecessary(
      {
        ...forecastsSample[0],
        chanceOfRainBy6Hours: [ST00_06, ST06_12, ST12_18, ST18_24],
      },

      {
        ...forecastsSample[0],
        chanceOfRainBy6Hours: [GT00_06, GT06_12, GT12_18, GT18_24],
      },
    );
    expect(result).toBe(exp);
  },
);
