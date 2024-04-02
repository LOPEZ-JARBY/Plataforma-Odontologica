import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import { CustomView } from '../../components/ui/CustomView';
import { Card } from '../../components/ui/Card';
import { CustomSwitch } from '../../components/ui/CustomSwitch';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useAuth } from './AuthContext';
type Permission = 'insert' | 'edit' | 'delete' | 'query';
type PermissionsState = Record<Permission, boolean>;
interface Role {
  Cod_Rol: number;
  Rol: string;
  // otras propiedades...
}
interface Object {
  Cod_Objeto: string;
  Objeto: string;
  // otras propiedades...
}
interface PermissionData {
  id: number;
  Cod_Permisos: number;
  Cod_Rol: number;
  Cod_Objeto: string;
  Permiso_Insercion: string;
  Permiso_Eliminacion: string;
  Permiso_Actualizacion: string;
  Permiso_Consultar: string;
  // incluye aquí cualquier otro campo que vayas a utilizar
}
function booleanToEnum(value: boolean): string {
  return value ? 'S' : 'N';
}
export const AccessManagement = () => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<number | undefined>(undefined);
  const [selectedObject, setSelectedObject] = useState<string | undefined>(undefined);
  const [roles, setRoles] = useState<Role[]>([]);
  const [objs, setObjects] = useState<Object[]>([]);
  const [permissions, setPermissions] = useState<PermissionsState>({
    insert: false,
    edit: false,
    delete: false,
    query: false,
  });
  const handlePermissionChange = (permission: Permission, value: boolean) => {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [permission]: value
    }));
  };
  // put y post
  const handleAssign = () => {
    const permissionsPayload = {
      Permiso_Insercion: booleanToEnum(permissions.insert),
      Permiso_Eliminacion: booleanToEnum(permissions.delete),
      Permiso_Actualizacion: booleanToEnum(permissions.edit),
      Permiso_Consultar: booleanToEnum(permissions.query),
      Usr_Registro: 'adminbacked',
      EstadoBD: 'activo',
      Cod_Rol: selectedRole, // Asegúrate de que este valor esté definido
      Cod_Objeto: selectedObject, // Asegúrate de que este valor esté definido
    };

    console.log(`Role: ${selectedRole}`);
    console.log(`Object: ${selectedObject}`);
    console.log('Permissions:', permissionsPayload);

    // Realiza una solicitud GET para verificar si existe un permiso para la combinación de Cod_Rol y Cod_Objeto
    fetch(`http://10.0.2.2:3000/api/permisos?Cod_Rol=${selectedRole}&Cod_Objeto=${selectedObject}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          // Existe un permiso, realiza una actualización (PUT)
          console.log('Updating existing permission:', data[0].Cod_Permisos);
          return fetch(`http://10.0.2.2:3000/api/permisos/${data[0].Cod_Permisos}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(permissionsPayload),
          });
        } else {
          // No existe, crea un nuevo permiso (POST)
          console.log('Creating new permission');
          return fetch('http://10.0.2.2:3000/api/permisos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(permissionsPayload),
          });
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to process request.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        // Aquí es donde mostramos la alerta al usuario.
        Alert.alert(
          "Éxito",
          `Permiso ${data && data.length > 0 ? 'actualizado' : 'registrado'} correctamente.`,
          [{ text: "OK" }]
        );
      })
      .catch(error => {
        console.error('Fetch error:', error);
        Alert.alert(
          "Error",
          "Hubo un problema al procesar tu solicitud.",
          [{ text: "OK" }]
        );
      });
  };




  // Dentro de tu componente AccessManagement, justo después de tus estados definidos
  useEffect(() => {
    // Cargar roles
    fetch('http://10.0.2.2:3000/api/roles')
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok for roles.');
      })
      .then(data => setRoles(data))
      .catch(error => console.error("Error al cargar los roles:", error));
    // Cargar objetos
    fetch('http://10.0.2.2:3000/api/objetos')
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok for objects.');
      })
      .then(data => setObjects(data))
      .catch(error => console.error("Error al cargar los objetos:", error));
  }, []); // Este useEffect se ejecuta solo al montar el componente
  // devuelve respuesta de como esta alamacenada la tbl_permisos
  useEffect(() => {
    if (selectedRole !== undefined && selectedObject !== undefined) {
      loadPermissionsForSelectedRoleAndObject();
    }
  }, [selectedRole, selectedObject]);
  const loadPermissionsForSelectedRoleAndObject = () => {
    fetch('http://10.0.2.2:3000/api/permisos')
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok for permissions.');
      })
      .then((data: PermissionData[]) => {
        console.log("Data received from backend:", data);
        const existingRecord = data.find((permiso: PermissionData) =>
          permiso.Cod_Rol === selectedRole && permiso.Cod_Objeto === selectedObject
        );
        if (existingRecord) {
          // Actualiza el estado de permissions basado en la información obtenida
          setPermissions({
            insert: existingRecord.Permiso_Insercion === 'S',
            edit: existingRecord.Permiso_Actualizacion === 'S',
            delete: existingRecord.Permiso_Eliminacion === 'S',
            query: existingRecord.Permiso_Consultar === 'S',
          });
        } else {
          // Si no existe un registro, restablece los switches a su estado inicial
          setPermissions({
            insert: false,
            edit: false,
            delete: false,
            query: false,
          });
        }
      })
      .catch(error => console.error("Error al cargar los permisos:", error));
  };

  return (
    <CustomView margin>
      {/* Muestra el nombre del usuario logueado en la parte superior, alineado a la derecha */}
      {user && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Bienvenido: </Text>
          <Text style={styles.userName}>{user.nombre}</Text>
        </View>
      )}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Gestión de Permisos:</Text>
      </View>
      <Card style={{ marginBottom: 10 }}>
        <Text>Rol + Objeto:</Text>
        <Picker
          selectedValue={selectedRole}
          onValueChange={value => setSelectedRole(value)}
        >
          <Picker.Item label="Select role" value={undefined} />
          {roles.map(({ Cod_Rol, Rol }) => <Picker.Item key={Cod_Rol} label={Rol} value={Cod_Rol} />)}
        </Picker>
        <Picker
          selectedValue={selectedObject}
          onValueChange={value => setSelectedObject(value)}
        >
          <Picker.Item label="Select object" value={undefined} />
          {objs.map(({ Cod_Objeto, Objeto }) => <Picker.Item key={Cod_Objeto} label={Objeto} value={Cod_Objeto} />)}
        </Picker>
      </Card>
      {/* Permissions */}
      <Card>
        {(['insert', 'edit', 'delete', 'query'] as Permission[]).map(permission => (
          <CustomSwitch
            key={permission}
            isOn={permissions[permission]}
            onChange={(value) => handlePermissionChange(permission, value)}
            text={permission.charAt(0).toUpperCase() + permission.slice(1)}
          />
        ))}
      </Card>
      <Button onPress={handleAssign} style={styles.button}>
        Asignar
      </Button>
    </CustomView>
  );
};
export default AccessManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20
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