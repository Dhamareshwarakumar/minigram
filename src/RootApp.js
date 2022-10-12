import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { NativeBaseProvider, Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';


const RootApp = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <NativeBaseProvider>
                    <App />
                </NativeBaseProvider>
            </NavigationContainer>
        </Provider>
    );
};

export default RootApp;