import React from 'react';
import {Layout, List, Spinner} from '@ui-kitten/components';
import {StyleSheet, View, ListRenderItem} from 'react-native';
import {DailyPannel, Props as DailyPannelProps} from '../organisms/DailyPannel';

type Props = {
  isLoading: boolean;
  dailyPannels: DailyPannelProps[];
};

export const Home: React.FC<Props> = ({isLoading, dailyPannels}) => {
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Spinner />
      </View>
    );
  }

  const renderItem: ListRenderItem<DailyPannelProps> = info => (
    <View style={styles.item}>
      <DailyPannel {...info.item} />
    </View>
  );

  return (
    <Layout style={styles.container} level="1">
      <List
        contentContainerStyle={styles.contentContainer}
        data={dailyPannels}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
