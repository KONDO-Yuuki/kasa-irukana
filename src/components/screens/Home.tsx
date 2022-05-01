import React, {useEffect} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  fetchStartForecastByCityCode,
  fetchEndForecastByCityCode,
} from '../../features/forecasts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Home as HomePage} from '../pages/Home';
import {RootStackParamList} from '../../Navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const dailyPannels = useAppSelector(state =>
    state.forecasts.umbrellaNecessaryStates.map((s, index) => {
      return {
        date: s.date,
        startWeatherTelop: state.forecasts.startForecasts[index].telop,
        startPosition: state.forecasts.startForecasts[index].position,
        goalWeatherTelop: state.forecasts.goalForecasts[index].telop,
        goalPosition: state.forecasts.goalForecasts[index].position,
        umbrellaNecessaryState: s.label,
        handleOnPressStart: (date: string) =>
          navigation.navigate('Detail', {position: 'start', date}),
        handleOnPressGoal: (date: string) =>
          navigation.navigate('Detail', {position: 'goal', date}),
      };
    }),
  );
  useEffect(() => {
    dispatch(fetchStartForecastByCityCode('140020'));
    dispatch(fetchEndForecastByCityCode('130010'));
  }, [dispatch]);
  return <HomePage isLoading={false} dailyPannels={dailyPannels} />;
};
