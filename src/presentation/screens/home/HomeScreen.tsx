import { Button, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../../../config/theme/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../components/ui/Title';
import { MenuItem } from '../../components/ui/MenuItem';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/navigationTypes';
import React, { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../animations/AuthContext';


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
  //{
  //  name: 'InfiniteScroll',
  //  icon: 'download-outline',
  //  component: 'InfiniteScrollScreen',
  // },
  // {
  //   name: 'InfiniteScroll2',
  //   icon: 'download-outline',
  //  component: 'InfiniteScrollScreen2',
  // },
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


type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;


export const HomeScreen = () => {

  //Para mostrar el usuario de login
  const { user, signOut } = useAuth();

  // para evitar que el boton del hardware me lleve al LoginScreen
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Aquí puedes decidir qué hacer cuando se presiona el botón de retroceso
        // Por ahora, simplemente retornamos true para indicar que hemos manejado la acción de retroceso
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );




  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    // Aquí puedes añadir cualquier lógica adicional que necesites ejecutar al cerrar sesión,
    // como limpiar datos del usuario en el estado global o local storage.
    signOut(); // Asegúrate de que esta función esté implementada correctamente en tu contexto de autenticación
    navigation.navigate('LoginScreen');
  };



  return (
    <View style={[globalStyles.mainContainer]}>
      <View style={globalStyles.globalMargin}>
        {/* Muestra el nombre del usuario logueado en la parte superior, alineado a la derecha */}
        {user && (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Bienvenido, </Text>
            <Text style={styles.userName}>{user.nombre}</Text>
          </View>
        )}
        <ScrollView>
          <Title text='Opciones del menú' safe />

          {/*animationMenuItems
                menuItems
                uiMenuItems */}



          {
            animationMenuItems.map((item, index) => (
              <MenuItem key={item.component}
                {...item}
                isFirst={index === 0}
                isLast={index === animationMenuItems.length - 1}

              />
            ))
          }

          <View style={{ marginTop: 30 }} />
          {
            uiMenuItems.map((item, index) => (
              <MenuItem key={item.component}
                {...item}
                isFirst={index === 0}
                isLast={index === uiMenuItems.length - 1}

              />
            ))
          }

          <View style={{ marginTop: 30 }} />

          {
            menuItems.map((item, index) => (
              <MenuItem key={item.component}
                {...item}
                isFirst={index === 0}
                isLast={index === menuItems.length - 1}

              />
            ))
          }

          <View style={{ marginTop: 30 }} />
          {/* Botón para cerrar sesión */}
          <Button
            title="Cerrar sesión"
            onPress={handleLogout}
            color="#d9534f" // Opcional: Cambiar color del botón
          />
        </ScrollView>


      </View>
    </View>
  );

}


// Añade estilos adicionales si es necesario
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Esto asegura que el contenido se distribuya a lo largo de la pantalla
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alinea el contenido a la derecha
    marginRight: 20, // Ajusta el margen derecho según sea necesario
    marginTop: 20, // Ajusta el margen superior según sea necesario
  },
  welcomeText: {
    fontSize: 18, // Ajusta el tamaño de fuente según sea necesario
    color: '#000', // Ajusta el color de fuente según sea necesario
  },
  userName: {
    fontSize: 18, // Asegúrate de que coincida con el tamaño de fuente de welcomeText
    color: '#007bff', // Cambia esto al color deseado para el nombre del usuario
    fontWeight: 'bold', // Opcional: para darle más énfasis al nombre del usuario
  },
});