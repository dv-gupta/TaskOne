import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';

const CaptureImageSuccess = ({ route, navigation }) => {
  const { imageUri } = route.params || {};
  const [progress] = useState(new Animated.Value(0));
  const [showImage, setShowImage] = useState(false);
  const animationRef = useRef(null);
  const uploadCompleted = useRef(false);
  const canceled = useRef(false);


  const tickScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
  
    Animated.loop(
      Animated.sequence([
        Animated.timing(tickScale, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(tickScale, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    animationRef.current = Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    });

    animationRef.current.start(() => {
      if (!canceled.current) {
        uploadCompleted.current = true;
        setShowImage(true);
        Alert.alert('Success', 'Image uploaded successfully!');
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  const handleClose = () => {
    if (!uploadCompleted.current) {
      canceled.current = true;
      if (animationRef.current) {
        animationRef.current.stop();
      }
      Alert.alert('Failed', 'Image upload failed!');
    }
    navigation.goBack();
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Image
          source={require('../../assets/images/Task1/close.png')}
          style={{ resizeMode: 'contain', height: 20, width: 20 }}
        />
      </TouchableOpacity>

      <View style={styles.tickWrapper}>
        {showImage && imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.circleImage} />
        ) : (
          <Animated.Image
            source={require('../../assets/images/Task1/check.png')}
            style={{
              resizeMode: 'contain',
              height: 50,
              width: 50,
              tintColor: '#28a745',
              transform: [{ scale: tickScale }], 
            }}
          />
        )}
      </View>

      <Text style={styles.successMessage}>
        Selfie captured perfectly!{'\n'}Let's build your own fashion avatar.
      </Text>

      {!showImage && (
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[styles.progressBarFill, { width: progressWidth }]}
          />
        </View>
      )}
    </View>
  );
};

export default CaptureImageSuccess;

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 5,
  },
  tickWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    borderWidth: 2,
    borderColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circleImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    resizeMode: 'cover',
  },
  successMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
  progressBarBackground: {
    width: '80%',
    height: 4,
    backgroundColor: '#ddd',
    marginTop: 20,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 2,
  },
});
