import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UploadFaceScreen = ({navigation}) => {

  const [imageUri, setImageUri] = useState(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleImagePick = async fromCamera => {
    if (fromCamera) {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Camera permission is required.');
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      cameraType: 'front',
      quality: 0.8,
    };

    const picker = fromCamera ? launchCamera : launchImageLibrary;

    picker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
      } else {
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setImageUri(uri);
      
          navigation.navigate('FaceUploadSuccess', {imageUri: uri});
        }
      }
    });
  };

  return (
    <View style={styles.container}>
 
      <View style={{height: 60, width: '100%', borderBottomWidth: 1}}>
        <Text style={styles.headerTitle}>FACIAL ATTRIBUTES</Text>
        <Text style={styles.subTitle}>Let’s add a Photo</Text>
      </View>

      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.selectedImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.plusIcon}>＋</Text>
            <Text style={styles.addText}>Add an image</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleImagePick(false)}>
          <Image
            source={require('../../assets/images/Task1/photo.png')}
            style={{resizeMode: 'contain', height: 40, width: 40}}
          />
          <Text style={styles.iconLabel}>From Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleImagePick(true)}>
          <Image
            source={require('../../assets/images/Task1/Camera.png')}
            style={{resizeMode: 'contain', height: 40, width: 40}}
          />
          <Text style={styles.iconLabel}>Take a selfie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadFaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    alignItems: 'center',
  },
  headerTitle: {fontSize: 12, letterSpacing: 1, color: '#999', left: 20},
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    color: '#999',
    left: 20,
  },
  imageContainer: {
    width: 200,
    height: 260,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    overflow: 'hidden',
    borderStyle: 'dashed',
  },
  placeholder: {alignItems: 'center'},
  plusIcon: {fontSize: 40, color: '#999'},
  addText: {color: '#999', marginTop: 5},
  selectedImage: {width: '100%', height: '100%', resizeMode: 'cover'},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  iconButton: {alignItems: 'center'},
  iconLabel: {marginTop: 5, fontSize: 14, fontWeight: '800', color: '#000000'},
});
