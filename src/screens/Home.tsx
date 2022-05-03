import React, {useEffect} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  fetchStartForecastByCityCode,
  fetchGoalForecastByCityCode,
} from '../redux/slices/forecasts';
import {useAppDispatch, useAppSelector} from '../redux';
import {Home as HomePage} from '../components/pages/Home';
import {RootStackParamList} from '../Navigator';

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
  const isLoading = useAppSelector(
    state => state.forecasts.umbrellaNecessaryStates.length === 0,
  );
  const error = useAppSelector(state => state.forecasts.error);
  if (error) {
    throw new Error(error);
  }
  useEffect(() => {
    dispatch(fetchStartForecastByCityCode('140020'));
    dispatch(fetchGoalForecastByCityCode('130010'));
  }, [dispatch]);
  return <HomePage isLoading={isLoading} dailyPannels={dailyPannels} />;
};
