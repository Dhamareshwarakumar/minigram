import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

import Home from './screens/Home';
import AddPost from './screens/AddPost';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import CustomHeader from './layout/CustomHeader';
import EmptyContainer from './components/EmptyContainer';
import Test from './screens/Test';

import { requestPermission } from './utils/askPermission';

import { SET_USER, IS_AUTHENTICATED } from './action/action.types'


const Stack = createNativeStackNavigator();

const App = ({ authState }) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = async user => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true
      });

      console.log(`[App.js][onAuthStateChanged][userId]: ${user._user.uid}`);

      await firebase
        .app()
        .database('https://instatest-cccda-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref(`/users/${user._user.uid}`)
        .on('value', snapshot => {
          console.log(`[App.js][onAuthStateChanged][userSnapshot]: ${JSON.stringify(snapshot.val())}`);
          dispatch({
            type: SET_USER,
            payload: snapshot.val()
          });
        });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false
      });
    }
  };

  useEffect(() => {
    requestPermission();

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  if (authState.loading) {
    return <EmptyContainer />
  }

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <CustomHeader {...props} />
      }}
    >
      {authState.isAuthenticated ? (
        <>
          {/* <Stack.Screen name="Test" component={Test} /> */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddPost" component={AddPost} />
        </>
      ) : (
        <>
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>

  );
};

const mapStateToProps = (state) => ({
  authState: state.auth
});

export default connect(mapStateToProps, null)(App);