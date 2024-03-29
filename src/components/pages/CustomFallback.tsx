import React from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';

import {SafeAreaView, StyleSheet} from 'react-native';

type Props = {
  resetError: () => void;
  error: Error;
};

export const CustomFallback: React.FC<Props> = ({resetError, error}) => (
  <SafeAreaView style={styles.container}>
    <Layout style={styles.layoutContainer} level="4">
      <Text category="h1">{'エラーが発生しました'}</Text>
      <Text>{error.message}</Text>
      <Button onPress={resetError}>{'やりなおす'}</Button>
    </Layout>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
