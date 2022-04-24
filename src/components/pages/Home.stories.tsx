import {storiesOf} from '@storybook/react-native';
import React from 'react';

import {Home} from './Home';

storiesOf('Home', module)
  .add('is loading', () => <Home isLoading={true} dailyPannels={[]} />)
  .add('is data loaded', () => (
    <Home
      isLoading={false}
      dailyPannels={[
        {
          date: '2022-01-02',
          startWeatherTelop: '雨',
          startPosition: '東京都',
          goalWeatherTelop: '雨',
          goalPosition: '神奈川県',
          umbrellaNecessaryState: 'NECESSARY',
        },
        {
          date: '2022-01-02',
          startWeatherTelop: '晴れ',
          startPosition: '東京都',
          goalWeatherTelop: '晴れのち曇り',
          goalPosition: '神奈川県',
          umbrellaNecessaryState: 'MAYBE',
        },
        {
          date: '2022-01-02',
          startWeatherTelop: '晴れ',
          startPosition: '東京都',
          goalWeatherTelop: '晴れ',
          goalPosition: '神奈川県',
          umbrellaNecessaryState: 'UNNECESSARY',
        },
      ]}
    />
  ));
