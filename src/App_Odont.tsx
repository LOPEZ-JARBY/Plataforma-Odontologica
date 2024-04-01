import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './presentation/navigator/Navigator';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './presentation/screens/animations/AuthContext';


export const App_Odont = () => {
  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
};

