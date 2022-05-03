import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/Home';
import {DetailScreen} from './screens/Detail';
import {store} from './redux';
import {Provider as ReduxProvider} from 'react-redux';
import {Position} from './redux/features/forecasts';

export type RootStackParamList = {
  Home: undefined;
  Detail: {date: string; position: Position};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigator() {
  return (
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
  );
}
