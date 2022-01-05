import { View, StyleSheet, Dimensions, Text, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";

import CustomBottomSheet from "../components/CustomBottomSheet";
import { useEffect, useRef, useState } from "react";
import { Rock } from "../types/Rock";
import { fetchRocks } from "../api/Rocks";

const { width, height } = Dimensions.get("window");

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [rocks, setRocks] = useState<Rock[] | null>(null);
  const [selectedRock, setSelectedRock] = useState<Rock | null>(null);

  const fetchData = async () => {
    const data = await fetchRocks();
    setRocks(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsCompass={false}
        loadingEnabled={true}
        initialRegion={{
          longitude: 13.997127830419933,
          latitude: 56.264683520793525,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {
          rocks && rocks.map(rock => {
            return (
              <Marker
                key={rock._id}
                coordinate={{
                  latitude: rock.latitude,
                  longitude: rock.longitude,
                }}
                onPress={
                  () => {
                    setSelectedRock(rock);
                    bottomSheetRef.current?.snapToIndex(0);
                  }
                }
              />
            );
          })
         
        }
      </MapView>

      <CustomBottomSheet rock={selectedRock} bottomSheetRef={bottomSheetRef} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;
