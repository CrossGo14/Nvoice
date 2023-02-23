import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './Src/Navigation/AuthNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default App;