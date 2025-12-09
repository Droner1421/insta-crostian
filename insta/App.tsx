import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './src/contexts/UserContext';
import { BottomTabNavigator } from './src/navigator/BottomTabNavigator';

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <BottomTabNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </UserProvider>
  );
}
