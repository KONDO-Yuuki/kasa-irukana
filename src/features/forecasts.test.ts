import 'react-native';
import {forecastsSample, forecastRowData} from '../fixtures/forecasts';
import {castApiResult} from './forecasts';

it('castApiResult', () => {
  const result = castApiResult(forecastRowData);
  expect(result).toMatchObject(forecastsSample);
});
