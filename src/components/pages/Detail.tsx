import React from 'react';
import {Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

import {Forecast} from '../../features/forecasts';
import {ForecastDetailPannel} from '../organisms/ForecastDetailPannel';

type Props = {
  forecast: Forecast;
  icon: string;
};

export const Detail: React.FC<Props> = ({forecast, icon}) => {
  return (
    <Layout style={styles.container} level="4">
      <ForecastDetailPannel forecast={forecast} iconName={icon} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  item: {
    paddingVertical: 8,
  },
  contentContainer: {},
});
