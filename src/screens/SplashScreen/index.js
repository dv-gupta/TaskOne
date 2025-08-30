import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Image,
  Animated,
  Easing,
  View,
  Dimensions,
  Text,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const SplashScreen = ({navigation}) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      navigation.replace('Introduction');
      // navigation.replace('TaskTwoScreen');

    });
  }, [navigation, progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../../assets/images/Task1/splash.png')}
        style={styles.logo}
        resizeMode="contain"
      />

   
      <Text style={styles.loadingText}>Loading brands...</Text>

  
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, {width: progressWidth}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.6,
    height: height * 0.3,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  progressContainer: {
    marginTop: 10,
    width: width * 0.6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 3,
  },
});

export default SplashScreen;
