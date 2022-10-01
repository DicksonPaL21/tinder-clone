import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from './hooks/useAuth';

// Components
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

const PUBLIC_SCREENS = [
  {
    name: 'Login',
    component: LoginScreen,
  },
];

const PRIVATE_SCREENS = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Chat',
    component: ChatScreen,
  },
];

const StackNavigator = () => {
  const { user } = useAuth();
  console.log('cc-user', user);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user
        ? PUBLIC_SCREENS.map((screen, idx) => (
            <Stack.Screen key={idx} {...screen} />
          ))
        : PRIVATE_SCREENS.map((screen, idx) => (
            <Stack.Screen key={idx} {...screen} />
          ))}
    </Stack.Navigator>
  );
};

export default StackNavigator;
