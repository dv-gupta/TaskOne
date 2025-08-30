import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const scaleWidth = size => (width / 375) * size;
const scaleHeight = size => (height / 812) * size;
const scaleFont = size => (width / 375) * size;

const TaskTwoScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    fetch('https://t03.tryndbuy.com/api/GetMappedSKUDetails', {
      method: 'GET',
      headers: {
        authID: '3c643a25e11144ad',
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log('API Response:', json);
        if (json && json.MappedSkuList) {
          setData(json.MappedSkuList);
        } else {
          setData([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedMenu === 'Dresses') {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedMenu]);

  const getCategory = cat => {
    switch (cat) {
      case 0:
      case '0':
        return 'Dresses';
      case 1:
      case '1':
        return 'Tops';
      case 2:
      case '2':
        return 'Pants';
      case 3:
      case '3':
        return 'Jeans';
      default:
        return 'Other';
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Task2/bg.png')}
      style={styles.background}>
      <View style={styles.overlayContainer}>
        <Image
          source={require('../../assets/images/Task2/Model.png')}
          style={styles.modelImage}
          resizeMode="contain"
        />

        <View style={styles.sideMenu}>
          <TouchableOpacity
            style={styles.circleIcon}
            onPress={() => setSelectedMenu('Dresses')}>
            <Image
              source={require('../../assets/images/Task2/dress.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.menuLabel}>
            <Text style={styles.label}>Dresses</Text>
          </View>

          <TouchableOpacity
            style={styles.circleIcon}
            onPress={() => setSelectedMenu('Makeup')}>
            <Image
              source={require('../../assets/images/Task2/brush.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.menuLabel}>
            <Text style={styles.label}>Makeup</Text>
          </View>

          <TouchableOpacity
            style={styles.circleIcon}
            onPress={() => setSelectedMenu('Makeup')}>
            <Image
              source={require('../../assets/images/Task2/glasses.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.menuLabel}>
            <Text style={styles.label}>Goggle</Text>
          </View>

          <TouchableOpacity
            style={styles.circleIcon}
            onPress={() => setSelectedMenu('Shoes')}>
            <Image
              source={require('../../assets/images/Task2/sneakers.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.menuLabel}>
            <Text style={styles.label}>Shoes</Text>
          </View>

          <TouchableOpacity
            style={styles.circleIcon}
            onPress={() => setSelectedMenu('Location')}>
            <Image
              source={require('../../assets/images/Task2/pictures.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.menuLabel}>
            <Text style={styles.label}>Location</Text>
          </View>
        </View>
      </View>

      {selectedMenu === 'Dresses' && (
        <TouchableWithoutFeedback onPress={() => setSelectedMenu(null)}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.slidePanel,
                {transform: [{translateX: slideAnim}]},
              ]}>
              <Text style={styles.typesTitle}>Types</Text>

              {loading ? (
                <Text>Loading...</Text>
              ) : data.length === 0 ? (
                <Text>No Data Found</Text>
              ) : (
                <FlatList
                  data={data}
                  renderItem={({item}) => {
                    const imageUrl = `https://demo03.tryndbuy.com/images/Th${item.SKUID}.jpg`;
                    return (
                      <TouchableOpacity
                        style={styles.typeCard}
                        onPress={() =>
                          ToastAndroid.show(
                            `SKUID: ${item.SKUID}`,
                            ToastAndroid.SHORT,
                          )
                        }>
                        <Image
                          source={{uri: imageUrl}}
                          style={styles.typeImage}
                        />
                        <Text style={styles.typeLabel}>
                          {getCategory(item.Cat)}
                        </Text>
                        <Text style={styles.skuLabel}>{item.SKUID}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => item.SKUID + index}
                  numColumns={2}
                  columnWrapperStyle={{justifyContent: 'space-between'}}
                />
              )}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {flex: 1, resizeMode: 'cover'},
  overlayContainer: {flex: 1, flexDirection: 'row', padding: scaleWidth(10)},
  modelImage: {flex: 1, height: '100%'},

  sideMenu: {
    width: scaleWidth(90),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: scaleWidth(20),
    paddingVertical: scaleHeight(20),
  },

  circleIcon: {
    width: scaleWidth(55),
    height: scaleWidth(55),
    borderRadius: scaleWidth(28),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scaleHeight(8),
    elevation: 3,
  },

  iconImage: {width: scaleWidth(35), height: scaleWidth(35)},

  label: {color: '#ffffff', fontWeight: '500', fontSize: scaleFont(10)},

  menuLabel: {
    height: scaleHeight(18),
    width: '80%',
    backgroundColor: 'rgba(51, 51, 51, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(3),
    marginBottom: scaleHeight(8),
  },

  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  slidePanel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: width * 0.55,
    backgroundColor: '#fff',
    padding: scaleWidth(15),
    elevation: 10,
    borderTopLeftRadius: scaleWidth(5),
    borderBottomLeftRadius: scaleWidth(5),
  },

  typesTitle: {
    fontWeight: 'bold',
    fontSize: scaleFont(16),
    marginBottom: scaleHeight(10),
  },

  typeCard: {flex: 1, alignItems: 'center', margin: scaleWidth(8)},

  typeImage: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: scaleWidth(10),
    borderWidth: 1,
    borderColor: '#ccc',
  },

  typeLabel: {
    marginTop: scaleHeight(5),
    fontSize: scaleFont(12),
    fontWeight: '600',
  },

  skuLabel: {fontSize: scaleFont(10), color: '#666'},
});

export default TaskTwoScreen;
