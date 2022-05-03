import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useAppSelector} from '../redux';
import {RootStackParamList} from '../Navigator';

import {Detail as DetailPage} from '../components/pages/Detail';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export const DetailScreen: React.FC<Props> = ({route}) => {
  const {position, date} = route.params;
  const forecast = useAppSelector(state => {
    if (position === 'start') {
      return state.forecasts.startForecasts.find(f => f.date === date);
    }
    return state.forecasts.goalForecasts.find(f => f.date === date);
  });
  if (!forecast) {
    // todo　エラーハンドリング
    return <></>;
  }
  return <DetailPage forecast={forecast} position={position} />;
};
