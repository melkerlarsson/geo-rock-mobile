import { useMemo } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import BottomSheet, {
  useBottomSheetSpringConfigs,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Animated, {
  interpolate,
  interpolateColors,
  useAnimatedStyle,
  useSharedValue,
  Extrapolate,
} from "react-native-reanimated";

import Button from "../components/Button";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const { width, height } = Dimensions.get("window");
const HORIZONTAL_PADDING = 30;
const BOTTOM_PADDING = 20;
const TOP_PADDING = 5;
const CONTENT_WIDTH = width - 2 * HORIZONTAL_PADDING;

const SHEET_HEIGHT_SMALL = 120;
const SHEET_HEIGHT_LARGE = height * 0.7;

interface CustomBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}

const CustomBottomSheet = ({ bottomSheetRef }: CustomBottomSheetProps) => {
  const snapPoints = useMemo(
    () => [SHEET_HEIGHT_SMALL, SHEET_HEIGHT_LARGE],
    []
  );

  const index = useSharedValue(0);
  const position = useSharedValue(0);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 400,
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        index.value,
        [0, 1],
        [120, CONTENT_WIDTH],
        Extrapolate.CLAMP
      ),
      height: interpolate(index.value, [0, 1], [70, 200], Extrapolate.CLAMP),
    };
  }, []);

  const animatedButtonContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(index.value, [0, 0.2], [1, 0], Extrapolate.CLAMP),
      //bottom: interpolate(index.value, [0, 1], [SHEET_HEIGHT_LARGE - SHEET_HEIGHT_SMALL + BOTTOM_PADDING, BOTTOM_PADDING], Extrapolate.CLAMP),
    };
  });

  const animatedTextContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            index.value,
            [0, 1],
            [0, 220],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const animatedLakeNameStyle = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(index.value, [0, 1], [20, 35], Extrapolate.CLAMP),
    };
  });

  const animatedDistanceStyle = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(index.value, [0, 1], [16, 20], Extrapolate.CLAMP),
    };
  });

  const animatedDescriptionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            index.value,
            [0, 1],
            [150, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
      opacity: interpolate(index.value, [0.5, 1], [0, 1], Extrapolate.CLAMP),
    };
  });

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
        {/* <Animated.View style={[styles.buttonContainer, styles.readMoreButtonContainer, animatedButtonContainerStyle]}>
          <Button title="Read more" style={{ width: CONTENT_WIDTH }} onPress={() => bottomSheetRef.current?.expand()} />
        </Animated.View> */}

        <Animated.View style={animatedTextContainerStyle}>
          <Animated.Text style={[animatedLakeNameStyle, styles.lakeName]}>
            Tydingen
          </Animated.Text>
          <Animated.Text style={[animatedDistanceStyle, styles.distance]}>
            2 km
          </Animated.Text>

          <Animated.Text style={[animatedDescriptionStyle, styles.description]}>
            This is a descriptive description of the rock which gives the user
            enough information to know what to avoid...
          </Animated.Text>
        </Animated.View>

        <Animated.View style={[styles.image, animatedImageStyle]} />

        <Animated.View
          style={[styles.buttonContainer, styles.closeButtonContainer]}
        >
          <Button
            title="Close"
            style={{ width: CONTENT_WIDTH }}
            onPress={() => bottomSheetRef.current?.close()}
          />
        </Animated.View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: BOTTOM_PADDING,
    paddingTop: TOP_PADDING,
    flex: 1,
    flexDirection: "column",
  },
  image: {
    backgroundColor: "#e6e6e6",
    position: "absolute",
    right: HORIZONTAL_PADDING,
    top: TOP_PADDING,
    borderRadius: 10,
  },
  buttonContainer: {
    position: "absolute",
    width: width,
    alignItems: "center",
  },
  readMoreButtonContainer: {
    bottom: SHEET_HEIGHT_LARGE - SHEET_HEIGHT_SMALL + BOTTOM_PADDING,
  },
  closeButtonContainer: {
    bottom: BOTTOM_PADDING,
  },
  lakeName: {
    fontWeight: "600",
  },
  distance: {
    fontWeight: "300",
  },
  description: {
    marginTop: 20,
  },
});

export default CustomBottomSheet;
