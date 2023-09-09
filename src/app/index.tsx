import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import FavoriteScreen from '../page/FavoriteScreen';
import PostScreen from '../page/PostScreen';
import UserScreen from '../page/UserScreen';
import UserDetailScreen from '../page/UserDetailScreen';
import colors from '../shared/theme/colors';
import {store} from './store';

const Stack = createNativeStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();

const MainApp = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={{colors}}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="MainBottomTab" component={MainBottomTab} />
            <Stack.Screen
              name="UserDetailScreen"
              component={UserDetailScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

const MainBottomTab = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: 'account',
        }}
      />
      <BottomTab.Screen
        name="PostScreen"
        component={PostScreen}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: 'post',
        }}
      />
      <BottomTab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'Like',
          tabBarIcon: 'robot-love',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainApp;
