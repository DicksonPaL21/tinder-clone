import React from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const ChatScreen = () => {
  const tw = useTailwind();

  return (
    <View style={tw('flex-1 justify-center items-center')}>
      <Text>Chat Screen</Text>
    </View>
  );
};

export default ChatScreen;
