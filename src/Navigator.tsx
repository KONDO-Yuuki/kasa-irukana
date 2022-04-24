import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './components/screens/Home';
import {DetailScreen} from './components/screens/Detail';

const Stack = createNativeStackNavigator();

export function Navigator() {
  return (
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
  );
}
