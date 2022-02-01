import React from 'react';
import { Provider } from 'react-redux';
import 'intl';
import 'intl/locale-data/jsonp/en';

import { NavigationContainer } from '@react-navigation/native';
import RootTabNavigation from './navigations/Navigations';

import { store } from './redux/Store';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootTabNavigation />
            </NavigationContainer>
        </Provider>
    );
}
