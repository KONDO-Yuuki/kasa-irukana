import React from 'react';

import {ListRenderItem, StyleSheet, View} from 'react-native';
import {Forecast, Position} from '../../features/forecasts';
import {Card, Divider, Icon, List, ListItem, Text} from '@ui-kitten/components';

export type Props = {
  forecast: Forecast;
  position: Position;
};

const castNullableNum = (num: number | string | null): string => {
  if (num === null) {
    return '--';
  }
  return String(num);
};
export const ForecastDetailPannel: React.FC<Props> = ({forecast, position}) => {
  const data = [
    {
      title: '降水確率(0~6時)',
      description: castNullableNum(forecast.chanceOfRainBy6Hours[0]) + '%',
    },
    {
      title: '降水確率(6~12時)',
      description: castNullableNum(forecast.chanceOfRainBy6Hours[1]) + '%',
    },
    {
      title: '降水確率(12~18時)',
      description: castNullableNum(forecast.chanceOfRainBy6Hours[2]) + '%',
    },
    {
      title: '降水確率(18~24時)',
      description: castNullableNum(forecast.chanceOfRainBy6Hours[3]) + '%',
    },
    {
      title: '最高気温',
      description: castNullableNum(forecast.temperature.max) + '℃',
    },
    {
      title: '最低気温',
      description: castNullableNum(forecast.temperature.min) + '℃',
    },
  ];

  const renderItem: ListRenderItem<{
    title: string;
    description: string;
    iconName?: string;
  }> = ({item}) => (
    <ListItem title={item.title} description={item.description} />
  );

  const renderCardHeader = (headerProps: any) => (
    <View {...headerProps} style={styles.header}>
      <Icon
        style={styles.icon}
        fill="#8F9BB3"
        name={position === 'start' ? 'home' : 'briefcase'}
      />
      <Text category="s1">{forecast.title}</Text>
      <Text category="s2">{forecast.date}</Text>
    </View>
  );
  return (
    <>
      <Card header={headerProps => renderCardHeader(headerProps)}>
        <Text category="h3">{forecast.telop}</Text>
        <Text category="s2">{forecast.detail.weather}</Text>
      </Card>
      <List
        style={styles.listContainer}
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  listContainer: {marginTop: 20},
  icon: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 48,
  },
});
