import React from 'react';
import { Provider } from 'react-redux';
import 'intl';
import 'intl/locale-data/jsonp/en';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './navigations/Navigations';

import { store } from './redux/Store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
}
