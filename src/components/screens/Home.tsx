import {Button} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {fetchForecastByCityCode} from '../../features/forecasts';
import {useAppDispatch, useAppSelector} from '../../hooks';

export function HomeScreen() {
  const dispatch = useAppDispatch();
  const forecasts = useAppSelector(state => state.forecasts);
  useEffect(() => {
    dispatch(fetchForecastByCityCode('400040'));
  }, [forecasts, dispatch]);
  return (
    <View>
      {forecasts.values.map(fv => {
        return <Text key={fv.date}>{fv.date}</Text>;
      })}
    </View>
  );
}
