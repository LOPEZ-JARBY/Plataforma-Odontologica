import { View} from 'react-native';
import { globalStyles } from '../../../config/theme/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../components/ui/Title';
import { MenuItem } from '../../components/ui/MenuItem';



const animationMenuItems = [

  {
    name: 'Gestión de Roles',
    icon: 'albums-outline',
    component: 'RoleManagement',
  },
  {
    name: 'EDIT',
    icon: 'albums-outline',
    component: 'EditRoleScreen',
  },

  {
    name: 'Login',
    icon: 'albums-outline',
    component: 'LoginScreen',
  },


]



export const menuItems = [
    
 
    {
      name: 'Pull to refresh',
      icon: 'refresh-outline',
      component: 'PullToRefreshScreen',
    },
    {
      name: 'Section List',
      icon: 'list-outline',
      component: 'CustomSectionListScreen',
    },
    {
      name: 'Modal',
      icon: 'copy-outline',
      component: 'ModalScreen',
    },
    {
      name: 'InfiniteScroll',
      icon: 'download-outline',
      component: 'InfiniteScrollScreen',
    },
    {
      name: 'InfiniteScroll2',
      icon: 'download-outline',
      component: 'InfiniteScrollScreen2',
    },
    {
      name: 'Slides',
      icon: 'flower-outline',
      component: 'SlidesScreen',
    },
    {
      name: 'Themes',
      icon: 'flask-outline',
      component: 'ChangeThemeScreen',
    },
  

  ];

  const uiMenuItems = [
 
  {
    name: 'Switches',
    icon: 'toggle-outline',
    component: 'SwitchScreen',
  },
  {
    name: 'Alerts',
    icon: 'alert-circle-outline',
    component: 'AlertScreen',
  },
  {
    name: 'TextInputs',
    icon: 'document-text-outline',
    component: 'TextInputScreen',
  },
  {
    name: 'Configuración',
    icon: 'document-text-outline',
    component: 'SettingsScreen',
  },

  ]




export const HomeScreen = () => {
return (
    <View style={[globalStyles.mainContainer]}>
        <View style={globalStyles.globalMargin}>

            <ScrollView>
                <Title text='Opciones del menú' safe  />

                {/*animationMenuItems
                menuItems
                uiMenuItems */}



              {
                animationMenuItems.map( (item, index) => (
                  <MenuItem key={ item.component }
                   {...item}
                    isFirst={ index === 0 }
                    isLast={ index === animationMenuItems.length - 1 }
                    
                   />
                ))
              }
             
             <View style={{ marginTop: 30}} />
              {
                uiMenuItems.map( (item, index) => (
                  <MenuItem key={ item.component }
                   {...item}
                    isFirst={ index === 0 }
                    isLast={ index === uiMenuItems.length - 1 }
                    
                   />
                ))
              }

              <View style={{ marginTop: 30}} />

              {
                menuItems.map( (item, index) => (
                  <MenuItem key={ item.component }
                   {...item}
                    isFirst={ index === 0 }
                    isLast={ index === menuItems.length - 1 }
                    
                   />
                ))
              }

              <View style={{ marginTop: 30}} />
  
            </ScrollView>


        </View>
    </View>
);

}