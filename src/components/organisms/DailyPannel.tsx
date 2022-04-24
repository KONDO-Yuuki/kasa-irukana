import React from 'react';
import {Card, Icon, Layout, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {UmbrellaNecessaryState} from '../../features/forecasts';

export type Props = {
  date: string;
  startWeatherTelop: string;
  startPosition: string;
  goalWeatherTelop: string;
  goalPosition: string;
  umbrellaNecessaryState: UmbrellaNecessaryState;
};

const UmbrellaNecessaryLabel: React.FC<{
  umbrellaNecessary: UmbrellaNecessaryState;
}> = ({umbrellaNecessary}) => {
  switch (umbrellaNecessary) {
    case 'NECESSARY': {
      return (
        <Text category="s2" status="danger">
          {'傘が必要です'}
        </Text>
      );
    }
    case 'MAYBE': {
      return (
        <Text category="s2" status="warning">
          {'折りたたみ傘を忘れずに'}
        </Text>
      );
    }
    case 'UNNECESSARY': {
      return (
        <Text category="s2" status="primary">
          {'傘は不要です'}
        </Text>
      );
    }
    case 'UNKNOWN': {
      return (
        <Text category="s2" status="basic">
          {'不明'}
        </Text>
      );
    }
  }
};
export const DailyPannel: React.FC<Props> = ({
  umbrellaNecessaryState,
  startWeatherTelop,
  startPosition,
  goalWeatherTelop,
  goalPosition,
  date,
}) => {
  const renderItemHeader = (headerProps: any) => (
    <View {...headerProps} style={styles.itemHeader}>
      <Text category="s1" style={styles.date}>
        {date}
      </Text>
      <View style={styles.umbrella}>
        <UmbrellaNecessaryLabel umbrellaNecessary={umbrellaNecessaryState} />
      </View>
    </View>
  );
  const renderStartCardHeader = (headerProps: any, position: string) => (
    <View {...headerProps} style={styles.cardHeader}>
      <Icon style={styles.icon} fill="#8F9BB3" name="home" />
      <Text category="s1">{position}</Text>
    </View>
  );
  const renderGoalCardHeader = (headerProps: any, position: string) => (
    <View {...headerProps} style={styles.cardHeader}>
      <Icon style={styles.icon} fill="#8F9BB3" name="briefcase" />
      <Text category="s1">{position}</Text>
    </View>
  );
  return (
    <Card header={headerProps => renderItemHeader(headerProps)}>
      <View>
        <Layout style={styles.container} level="1">
          <Card
            style={styles.card}
            header={headerProps =>
              renderStartCardHeader(headerProps, startPosition)
            }>
            <Text>{startWeatherTelop}</Text>
          </Card>
          <Card
            style={styles.card}
            header={headerProps =>
              renderGoalCardHeader(headerProps, goalPosition)
            }>
            <Text>{goalWeatherTelop}</Text>
          </Card>
        </Layout>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 48,
  },
  date: {
    flex: 1,
    paddingHorizontal: 24,
  },
  umbrella: {
    flex: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 48,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
