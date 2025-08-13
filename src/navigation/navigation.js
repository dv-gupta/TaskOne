import React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';

// Screens
import SplashScreen from '../screens/SplashScreen';
import IntroductionScreen from '../screens/IntroductionScreen/introductionScreen';
import FaceUploadOne from '../screens/FaceUploadOne/FaceUploadOne';
import FaceUploadSuccess from '../screens/FaceUploadSuccess/FaceUploadSuccess';
import CaptureImageSuccess from '../screens/CaptureImageSuccess/CaptureImageSuccess';

// Navigation Ref (optional)
import { navigationRef } from '../utils/RootNavigation';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Introduction" component={IntroductionScreen} />
        <Stack.Screen name="FaceUploadOne" component={FaceUploadOne} />
        <Stack.Screen name='FaceUploadSuccess' component={FaceUploadSuccess}/>
        <Stack.Screen name='CaptureImageSuccess' component={CaptureImageSuccess}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
