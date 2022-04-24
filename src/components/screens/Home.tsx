import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {
  fetchStartForecastByCityCode,
  fetchEndForecastByCityCode,
} from '../../features/forecasts';
import {useAppDispatch, useAppSelector} from '../../hooks';

export function HomeScreen() {
  const dispatch = useAppDispatch();
  const forecasts = useAppSelector(state => state.forecasts);
  useEffect(() => {
    dispatch(fetchStartForecastByCityCode('400040'));
    dispatch(fetchEndForecastByCityCode('400040'));
  }, [dispatch]);
  return (
    <View>
      <View>
        {forecasts.startForecasts.map(fv => {
          return <Text key={fv.date}>{fv.date}</Text>;
        })}
      </View>
      <View>
        {forecasts.goalForecasts.map(fv => {
          return <Text key={fv.date}>{fv.date}</Text>;
        })}
      </View>
      <View>
        {forecasts.umbrellaNecessaryStates.map(uns => {
          return (
            <View key={uns.date}>
              <Text>{uns.date}</Text>
              <Text>{uns.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
