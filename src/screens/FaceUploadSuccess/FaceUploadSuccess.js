

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FaceUploadSuccess = ({ route, navigation }) => {
  const { imageUri } = route.params || {};

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>FACIAL ATTRIBUTES</Text>
        <Text style={styles.subTitle}>Let’s add a Photo</Text>
      </View>

    
      <View style={styles.imageWrapper}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.circleImage} />
        ) : (
          <Text>No Image Available</Text>
        )}
      </View>


      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate('CaptureImageSuccess', { imageUri });
          }}
        >
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FaceUploadSuccess;

const IMAGE_SIZE = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  headerContainer: {
    height: 60,
    width: '100%',
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: { fontSize: 12, letterSpacing: 1, color: '#999' },
  subTitle: { fontSize: 20, fontWeight: '600', marginVertical: 10, color: '#999' },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    borderWidth: 2,
    borderColor: '#28a745',
    resizeMode: 'cover',
  },
  buttonWrapper: {
    paddingBottom: 50,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    width: '90%',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
