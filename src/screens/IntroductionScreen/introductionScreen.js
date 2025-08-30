import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const IntroductionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Image
        pointerEvents="none"
        source={require('../../assets/images/Task1/women.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.infoBox}>
        <Text style={styles.title}>
          Hi, I am your fashion advisor.Let's{"\n"}
          get you started with creating your{"\n"}
          mix & match fashion avatar.
        </Text>

        <View style={styles.arrowWrapper}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => {
              console.log('Arrow pressed');
              navigation.navigate('FaceUploadOne');
            }}
          >
            <Image
              source={require('../../assets/images/Task1/Arrowright.png')}
              style={styles.arrowImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default IntroductionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.5,
  },
  infoBox: {
    padding: 20,
    borderWidth: 2,
    borderColor: 'grey',
    width: width * 0.85,
    borderRadius: 5,
  },
  title: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
  },
  arrowWrapper: {
    marginTop: 15,
    alignItems: 'flex-end',
    zIndex: 1,
    elevation: 2,
  },
  arrowButton: {
    backgroundColor: '#000',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  arrowImage: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});


/// TASK2

