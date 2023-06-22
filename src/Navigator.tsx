import * as React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/Home';
import {DetailScreen} from './screens/Detail';
import {CustomFallback} from './components/pages/CustomFallback';
import {store} from './redux';

import {Provider as ReduxProvider} from 'react-redux';
import {Position} from './types/forecasts';

export type RootStackParamList = {
  Home: undefined;
  Detail: {date: string; position: Position};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigator() {
  return (
    <ErrorBoundary FallbackComponent={CustomFallback}>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: '傘いるかな？'}}
            />
            <Stack.Screen name="Detail" component={DetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ReduxProvider>
    </ErrorBoundary>
  );
}
