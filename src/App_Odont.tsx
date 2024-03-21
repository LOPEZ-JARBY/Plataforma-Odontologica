
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './presentation/navigator/Navigator';
import { PaperProvider } from 'react-native-paper';



export const App_Odont = () => {
  return (
    <PaperProvider>
  <NavigationContainer>
    <Navigator />
  </NavigationContainer>
  </PaperProvider>
  );

};
