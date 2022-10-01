import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function () {
  const tw = useTailwind();

  return (
    <View style={tw('flex-1 justify-center items-center')}>
      <StatusBar style="auto" />
      <Text>Hello World</Text>
      <Button title="Click ME" />
    </View>
  );
}
