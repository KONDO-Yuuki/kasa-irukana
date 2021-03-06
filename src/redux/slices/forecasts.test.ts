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
} from './forecasts';

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
