import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/navigation/index';

import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
 

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
