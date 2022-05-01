import {storiesOf} from '@storybook/react-native';
import React from 'react';

import {Detail} from './Detail';
import {forecastsSample} from '../../fixtures/forecasts';

storiesOf('Detail', module).add('basic', () => (
  <Detail forecast={forecastsSample[0]} position={'start'} />
));
