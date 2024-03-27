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
import { RoleManagement } from '../screens/animations/RoleManagement';
import { EditRoleScreen } from '../screens/inputs/EditRoleScreen';
import { LoginScreen } from '../screens/animations/LoginScreen';
import { SettingsScreen } from '../screens/inputs/SettingsScreen';
import { SpecialtyManagement } from '../screens/animations/SpecialtyManagement';
import { AccessManagement } from '../screens/animations/AccessManagement';
import { ObjectManagement } from '../screens/animations/ObjectManagement';



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
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="PullToRefreshScreen" component={PullToRefreshScreen} />
      <Stack.Screen name="CustomSectionListScreen" component={CustomSectionListScreen} /> 
      <Stack.Screen name="ModalScreen" component={ModalScreen} /> 
      <Stack.Screen name="InfiniteScrollScreen" component={InfiniteScrollScreen} /> 
      <Stack.Screen name="InfiniteScrollScreen2" component={InfiniteScrollScreen2} />
      <Stack.Screen name="RoleManagement" component={RoleManagement} />
      <Stack.Screen name="EditRoleScreen" component={EditRoleScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SpecialtyManagement" component={SpecialtyManagement} />
      <Stack.Screen name="AccessManagement" component={AccessManagement} />
      <Stack.Screen name="ObjectManagement" component={ObjectManagement} />
      

    </Stack.Navigator>
  );
}