import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthenticatedUserProvider } from './navigation/AuthenticatedUserProvider';
import RootNavigator from './navigation/RootNavigator';
export default function App() {
 
  return (
    <AuthenticatedUserProvider>
    <RootNavigator />
  </AuthenticatedUserProvider>
  );
}
// registerRootComponent(App)
