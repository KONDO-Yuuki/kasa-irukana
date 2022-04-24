import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './components/screens/Home';
import {DetailScreen} from './components/screens/Detail';
import {store} from './store';
import {Provider as ReduxProvider} from 'react-redux';

const Stack = createNativeStackNavigator();

export function Navigator() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Dashboard"
            component={HomeScreen}
            options={{title: 'ダッシュボード'}}
          />
          <Stack.Screen name="詳細な天気" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
