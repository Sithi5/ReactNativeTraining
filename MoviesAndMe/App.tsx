import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './navigations/Navigations';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
}
