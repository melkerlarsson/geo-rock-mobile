import { useMemo } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import BottomSheet, { useBottomSheetSpringConfigs, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Animated, { interpolate, interpolateColors, useAnimatedStyle, useSharedValue, Extrapolate } from 'react-native-reanimated';

import Button from '../components/Button';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';


const { width, height } = Dimensions.get('window');
const horizontalPadding = 40;
const maxContentWidth = width - 2 * horizontalPadding;

interface CustomBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>
}



const CustomBottomSheet = ({ bottomSheetRef }: CustomBottomSheetProps) => {

  const snapPoints = useMemo(() => [200, '70%'], []);

  const index = useSharedValue(0);
  const position = useSharedValue(0);



  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });


  const squareStyle = useAnimatedStyle(() => {

    return {
      width: interpolate(index.value, [0, 1], [70, maxContentWidth], Extrapolate.CLAMP),
      height: interpolate(index.value, [0, 1], [70, 200], Extrapolate.CLAMP),

    };
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      animationConfigs={animationConfigs}
      backdropComponent={BottomSheetBackdrop}
      animatedIndex={index}
      animatedPosition={position}
    >
      <View style={styles.contentContainer}>
        <View style={{}}>
          <Text>Awesome 🎉 asdfhaskldfhasdfka jsdölkaj</Text>
        </View>

        <Animated.View style={[{ backgroundColor: "red", position: "absolute", right: horizontalPadding }, squareStyle]} />

        <View style={{ position: "absolute", bottom: 0 }}>
          <Button title="Read more" onPress={() => bottomSheetRef.current?.expand()} />
        </View>
      </View>

    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: horizontalPadding,
    flex: 1,
    flexDirection: "column",
  },
});

export default CustomBottomSheet;