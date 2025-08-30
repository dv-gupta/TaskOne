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


///


// import React, {useEffect, useState, useRef} from 'react';
// import {
//   View,
//   Text,
//   ImageBackground,
//   Image,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ToastAndroid,
//   Animated,
//   Dimensions,
//   TouchableWithoutFeedback,
// } from 'react-native';

// const {width} = Dimensions.get('window');

// const IntroductionScreen = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMenu, setSelectedMenu] = useState(null);


//   const slideAnim = useRef(new Animated.Value(width)).current;

//   useEffect(() => {
//     fetch('https://t03.tryndbuy.com/api/GetMappedSKUDetails', {
//       method: 'GET',
//       headers: {
//         authID: '3c643a25e11144ad',
//       },
//     })
//       .then(res => res.json())
//       .then(json => {
//         setData(json?.MappedSKUList || []);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const renderItem = ({item}) => {
//     const imageUrl = `https://demo03.tryndbuy.com/images/Th${item.SKUID}.jpg`;
//     return (
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() =>
//           ToastAndroid.show(`SKUID: ${item.SKUID}`, ToastAndroid.SHORT)
//         }>
//         <Image source={{uri: imageUrl}} style={styles.productImage} resizeMode="cover" />
//         <Text style={styles.text}>{item.Cat}</Text>
//       </TouchableOpacity>
//     );
//   };

//   const dressTypes = [
//     {id: '1', title: 'Dresses', img: require('../../assets/images/Task2/Dress1.png')},
//     {id: '2', title: 'Tops', img: require('../../assets/images/Task2/Top.png')},
//     {id: '3', title: 'Pants', img: require('../../assets/images/Task2/pants.png')},
//     {id: '4', title: 'Jeans', img: require('../../assets/images/Task2/jeans.png')},
//   ];

//   // Animate panel
//   useEffect(() => {
//     if (selectedMenu === 'Dresses') {
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 400,
//         useNativeDriver: false,
//       }).start();
//     } else {
//       Animated.timing(slideAnim, {
//         toValue: width,
//         duration: 400,
//         useNativeDriver: false,
//       }).start();
//     }
//   }, [selectedMenu]);

//   return (
//     <ImageBackground
//       source={require('../../assets/images/Task2/bg.png')}
//       style={styles.background}>
//       <View style={styles.overlayContainer}>
//         <Image
//           source={require('../../assets/images/Task2/Model.png')}
//           style={styles.modelImage}
//           resizeMode="contain"
//         />

//         {/* Right side menu */}
//         <View style={styles.sideMenu}>
//           <TouchableOpacity
//             style={styles.circleIcon}
//             onPress={() => setSelectedMenu('Dresses')}>
//             <Image
//               source={require('../../assets/images/Task2/dress.png')}
//               style={styles.iconImage}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//           <View style={styles.menuLabel}>
//             <Text style={styles.label}>Dresses</Text>
//           </View>

//           <TouchableOpacity
//             style={styles.circleIcon}
//             onPress={() => setSelectedMenu('Makeup')}>
//             <Image
//               source={require('../../assets/images/Task2/brush.png')}
//               style={styles.iconImage}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//           <View style={styles.menuLabel}>
//             <Text style={styles.label}>Makeup</Text>
//           </View>
//         </View>
//       </View>

//       {/* Overlay + Slide Panel */}
//       {selectedMenu === 'Dresses' && (
//         <TouchableWithoutFeedback onPress={() => setSelectedMenu(null)}>
//           <View style={styles.overlay}>
//             <Animated.View style={[styles.slidePanel, {transform: [{translateX: slideAnim}]}]}>
//               <Text style={styles.typesTitle}>Types</Text>
//               <FlatList
//                 data={dressTypes}
//                 renderItem={({item}) => (
//                   <View style={styles.typeCard}>
//                     <Image source={item.img} style={styles.typeImage} />
//                     <Text style={styles.typeLabel}>{item.title}</Text>
//                   </View>
//                 )}
//                 keyExtractor={item => item.id}
//                 numColumns={2}
//                 columnWrapperStyle={{justifyContent: 'space-between'}}
//               />
//             </Animated.View>
//           </View>
//         </TouchableWithoutFeedback>
//       )}
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {flex: 1, resizeMode: 'cover'},
//   overlayContainer: {flex: 1, flexDirection: 'row', padding: 10},
//   modelImage: {flex: 1, height: '100%'},
//   sideMenu: {
//     width: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.3)',
//     borderRadius: 20,
//     paddingVertical: 20,
//   },
//   circleIcon: {
//     width: 60,
//     height: 60,
//     borderRadius: 35,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 10,
//     elevation: 3,
//   },
//   iconImage: {width: 40, height: 40},
//   label: {color: '#ffffff', fontWeight: '500', fontSize: 10},
//   menuLabel: {
//     height: 20,
//     width: '80%',
//     backgroundColor: 'rgba(51, 51, 51, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 3,
//     marginBottom: 10,
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0, bottom: 0, left: 0, right: 0,
//     backgroundColor: 'rgba(0,0,0,0.3)', // dim effect
//   },
//   slidePanel: {
//     position: 'absolute',
//     top: 0, bottom: 0, right: 0,
//     width: width * 0.6,
//     backgroundColor: '#fff',
//     padding: 15,
//     elevation: 10,
//     borderTopLeftRadius: 20,
//     borderBottomLeftRadius: 20,
//   },
//   typesTitle: {fontWeight: 'bold', fontSize: 16, marginBottom: 10},
//   typeCard: {flex: 1, alignItems: 'center', margin: 5},
//   typeImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 40,
//     borderWidth: 1,
//     borderColor: '#aaa',
//   },
//   typeLabel: {marginTop: 5, fontSize: 12, fontWeight: '500'},
//   card: {
//     flex: 1, margin: 5, backgroundColor: '#fff', borderRadius: 10,
//     overflow: 'hidden', elevation: 3,
//   },
//   productImage: {width: '100%', height: 120},
//   text: {textAlign: 'center', padding: 5, fontWeight: '600'},
// });

// export default IntroductionScreen;
