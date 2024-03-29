import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../../config/theme/theme';

import { MenuItem } from "../../components/ui/MenuItem";

export const SettingsScreen = () => {
  const generalMenuItems = [
    {
      name: 'Perfil de usuario',
      icon: 'person-outline',
      component: 'UserProfileScreen',
    },
    {
      name: 'Acerca de',
      icon: 'information-circle-outline',
      component: 'AboutScreen',
    },
  ];

  const developerMenuItems = [
    {
      name: 'Gestión de Especialidades',
      icon: 'hammer-outline',
      component: 'SpecialtyManagement',
    },

    {
      name: 'Editar Preguntas',
      icon: 'create-outline',
      component: 'EditQuestions',
    },

    {
      name: 'Registro Actividad (Bitácora)',
      icon: 'journal-outline',
      component: 'ActivityLog',
    },
  ];

  const SecurityandaccessMenuItem = [
    {
      name: 'Gestión de Usuarios',
      icon: 'people-outline',
      component: 'UserManagement',
    },

    {
      name: 'Gestión de Roles',
      icon: 'cube-outline',
      component: 'RoleManagement',
    },

    {
      name: 'Gestión de Accesos',
      icon: 'key-outline',
      component: 'AccessManagement',
    },
    
    {
      name: 'Gestión Objetos',
      icon: 'document-text-outline',
      component: 'ObjectManagement',
    },

    {
      name: 'Cerrar sesión',
      icon: 'log-out-outline',
      component: 'Logout',
    }
  ];

  return (
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.globalMargin}>
        <Text style={styles.section}>General</Text>
        {generalMenuItems.map((item, index) => (
          <View style={styles.menuItemContainer} key={item.component}>
            <MenuItem {...item} isFirst={index === 0} />
          </View>
        ))}

        <Text style={styles.section}>Datos Maestros</Text>
        {developerMenuItems.map((item, index) => (
          <View style={styles.menuItemContainer} key={item.component}>
            <MenuItem {...item} isFirst={index === 0} />
          </View>
        ))}

        <Text style={styles.section}>Seguridad y Accesos</Text>
        {SecurityandaccessMenuItem.map((item, index) => (
          <View style={styles.menuItemContainer} key={item.component}>
            <MenuItem {...item} isFirst={index === 0} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    section: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    menuItemContainer: {
        marginTop: 0,
    }
});

export default SettingsScreen;















