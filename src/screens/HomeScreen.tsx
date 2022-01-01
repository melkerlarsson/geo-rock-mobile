import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');
interface HomeScreenProps {

}

const HomeScreen = ({}: HomeScreenProps) => {

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;