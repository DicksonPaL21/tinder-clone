import React from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import useAuth from '../hooks/useAuth';
import { useTailwind } from 'tailwind-rn';

const LoginScreen = () => {
  const tw = useTailwind();
  const { signInWithGoogle } = useAuth();

  return (
    <View style={tw('flex-1')}>
      <ImageBackground
        resizeMode="cover"
        style={tw('flex-1')}
        source={{ uri: 'https://tinder.com/static/tinder.png' }}
      >
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={[
            tw('absolute bottom-40 w-52 bg-white p-4 rounded-full'),
            { marginHorizontal: '25%' },
          ]}
        >
          <Text style={tw('font-semibold text-center')}>
            Sign in & get swiping
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
