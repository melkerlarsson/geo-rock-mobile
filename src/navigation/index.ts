import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';

export type RootStackParamList = {
  Onboarding: undefined,
  Home: undefined
}

export type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, "Onboarding">;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export const RootStack = createNativeStackNavigator<RootStackParamList>();





