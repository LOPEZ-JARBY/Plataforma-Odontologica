import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SwitchScreen } from '../screens/switches/SwitchScreen';
import { AlertScreen } from '../screens/alerts/AlertScreen';
import { TextInputScreen } from '../screens/inputs/TextInputScreen';
import { PullToRefreshScreen } from '../screens/ui/PullToRefreshScreen';
import { CustomSectionListScreen } from '../screens/ui/CustomSectionListScreen';
import { ModalScreen } from '../screens/ui/ModalScreen';
import { InfiniteScrollScreen } from '../screens/ui/InfiniteScrollScreen';
import { InfiniteScrollScreen2 } from '../screens/ui/InfiniteScrollScreen2';
import { Animation102Screen } from '../screens/animations/Animation102Screen';
import { RolesScreen } from '../screens/inputs/RolesScreen';
import { EditRoleScreen } from '../screens/inputs/EditRoleScreen';
import { LoginScreen } from '../screens/animations/LoginScreen';




const Stack = createStackNavigator();

export const Navigator =() => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SwitchScreen" component={SwitchScreen} />
      <Stack.Screen name="AlertScreen" component={AlertScreen} />
      <Stack.Screen name="TextInputScreen" component={TextInputScreen} />
      <Stack.Screen name="RolesScreen" component={RolesScreen} />
      <Stack.Screen name="PullToRefreshScreen" component={PullToRefreshScreen} />
      <Stack.Screen name="CustomSectionListScreen" component={CustomSectionListScreen} /> 
      <Stack.Screen name="ModalScreen" component={ModalScreen} /> 
      <Stack.Screen name="InfiniteScrollScreen" component={InfiniteScrollScreen} /> 
      <Stack.Screen name="InfiniteScrollScreen2" component={InfiniteScrollScreen2} />
      <Stack.Screen name="Animation102Screen" component={Animation102Screen} />
      <Stack.Screen name="EditRoleScreen" component={EditRoleScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

    </Stack.Navigator>
  );
}