import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { List, Text, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { useAuth } from './AuthContext';

type Role = {
  Cod_Rol: number;
  Rol: string;
  Descripcion: string;
  Fecha_Registro: Date;
  Usr_Registro: string;
  EstadoBD: string;
};

export const RoleManagement = () => {
  const { user } = useAuth();
  const [results, setResults] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [editedRole, setEditedRole] = useState<Role | null>(null);
  const [editedRol, setEditedRol] = useState<string>('');
  const [editedDescripcion, setEditedDescripcion] = useState<string>('');
  const [editedEstadoBD, setEditedEstadoBD] = useState<string>('');

  useEffect(() => {
    fetch('http://10.0.2.2:3000/api/roles')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(data => setResults(data))
      .catch(error => console.error('Error al ejecutar la consulta: ' + error));
  }, []);

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
  };

  const [editedCodRol, setEditedCodRol] = useState<number | null>(null);
  const [editedUsrRegistro, setEditedUsrRegistro] = useState<string>('');

  const handleEditRole = (role: Role) => {
    if (role) {
      setEditedRole(role);
      setEditedCodRol(role.Cod_Rol);
      setEditedRol(role.Rol);
      setEditedDescripcion(role.Descripcion);
      setEditedUsrRegistro(role.Usr_Registro);
      setEditedEstadoBD(role.EstadoBD);
      setIsModalVisible(true);
    }
  };

  const handleUpdateRole = () => {
    if (editedRole) {
      //console.log('Datos a enviar al backend:', {
        const roleDataWithUser = {
          Cod_Rol: editedCodRol,
          Rol: editedRol,
          Descripcion: editedDescripcion,
          EstadoBD: editedEstadoBD,
          Usr_Registro: user ? user.nombre : "UsuarioAnonimo", // Usando el usuario logeado
      };
      fetch(`http://10.0.2.2:3000/api/roles/${editedRole.Cod_Rol}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleDataWithUser),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al actualizar el rol');
          }
          return fetch('http://10.0.2.2:3000/api/roles');
        })
        .then(response => response.json())
        .then(data => {
          setResults(data);
          setIsModalVisible(false);
        })
        .catch(error => console.error('Error al actualizar el rol:', error));
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [newRoleData, setNewRoleData] = useState<any>({
    Rol: editedRol,
    Descripcion: editedDescripcion,
    Usr_Registro: editedUsrRegistro,
  });

  const handleAddRole = () => {
    
    //
    //
    // Construye el objeto para la solicitud con el usuario logeado como 'Usr_Registro'
  const roleDataWithUser = {
    ...newRoleData,
    Usr_Registro: user ? user.nombre : "UsuarioAnonimo", 
  };

    // Realizar la solicitud POST al backend
    fetch('http://10.0.2.2:3000/api/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleDataWithUser), // Convertir los datos a formato JSON
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar el nuevo rol');
        }
        return response.json();
      })
      .then(() => {
        setIsAddModalVisible(false);
        setNewRoleData({ Rol: '', Descripcion: '', Usr_Registro: '' });
        fetch('http://10.0.2.2:3000/api/roles')
          .then(response => response.json())
          .then(data => setResults(data))
          .catch(error => console.error('Error al ejecutar la consulta: ' + error));
      })
      .catch(error => console.error('Error al agregar el nuevo rol:', error));
  };



  const handleCancelAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };

  return (
    <View style={styles.container}>
      {/* Muestra el nombre del usuario logueado en la parte superior, alineado a la derecha */}
      {user && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Bienvenido: </Text>
          <Text style={styles.userName}>{user.nombre}</Text>
        </View>
      )}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Consulta de Roles:</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddModal}>
          <Icon name="add" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <List.Section>
          {results
            .filter(role => role.EstadoBD !== 'eliminado')
            .map(role => (
              <TouchableOpacity key={role.Cod_Rol} onPress={() => handleSelectRole(role)}>
                <List.Item
                  title={role.Rol}
                  description={`Descripción: ${role.Descripcion}\nUsuario Registro: ${role.Usr_Registro}\nFecha Registro: ${formatDate(
                    new Date(role.Fecha_Registro)
                  )}\nEstado: ${role.EstadoBD}`}
                  left={() => <Icon name="people" size={30} color="#000" />}
                  right={() => (
                    <View style={styles.iconContainer}>
                      <Icon name={selectedRole === role ? 'checkmark' : 'create'} size={24} color="#007bff" />
                    </View>
                  )}
                  style={selectedRole === role ? styles.selectedItem : null}
                  descriptionNumberOfLines={4}
                  descriptionEllipsizeMode="tail"
                  descriptionStyle={{ marginTop: 5, color: 'gray' }}
                />
              </TouchableOpacity>
            ))}
        </List.Section>
      </ScrollView>
      {selectedRole && (
        <View style={styles.actionsContainer}>
          <Button mode="contained" onPress={() => handleEditRole(selectedRole)}>Editar Rol</Button>
        </View>
      )}
      {/* Segundo Modal */}
      <Modal visible={isAddModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={[styles.modalTitle, { color: '#ffffff', fontSize: 24 }]}>Nuevo Rol</Text>
          {/* Contenido del segundo modal */}
          <TextInput
            style={styles.input}
            value={newRoleData.Rol}
            onChangeText={text => setNewRoleData({ ...newRoleData, Rol: text })}
            placeholder="Rol"
          />
          <TextInput
            style={styles.input}
            value={newRoleData.Descripcion}
            onChangeText={text => setNewRoleData({ ...newRoleData, Descripcion: text })}
            placeholder="Descripción"
          />
          {/*<TextInput
            style={styles.input}
            value={newRoleData.Usr_Registro}
            onChangeText={text => setNewRoleData({ ...newRoleData, Usr_Registro: text })}
            placeholder="Usuario de Registro"
            />*/}
          <Button mode="contained" style={[styles.button, styles.sendButton, { marginBottom: 10 }]} onPress={handleAddRole}>Enviar</Button>
          <Button mode="contained" style={[styles.button, styles.cancelButton]} onPress={handleCancelAddModal}>Cancelar</Button>
        </View>
      </Modal>
      {/* Primer Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={[styles.modalTitle, { color: '#ffffff', fontSize: 24 }]}>Editar Rol</Text>
          <TextInput
            style={styles.input}
            value={editedRol}
            onChangeText={text => setEditedRol(text)}
            placeholder="Rol"
          />
          <TextInput
            style={styles.input}
            value={editedDescripcion}
            onChangeText={text => setEditedDescripcion(text)}
            placeholder="Descripción"
          />
          <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={(value) => setEditedEstadoBD(value)}
              items={[
                { label: 'Activo', value: 'activo' },
                { label: 'Eliminado', value: 'eliminado' },
              ]}
              value={editedEstadoBD}
            />
          </View>
          <Button mode="contained" style={[styles.button, styles.sendButton, { marginBottom: 10 }]} onPress={handleUpdateRole}>Enviar</Button>
          <Button mode="contained" style={[styles.button, styles.cancelButton]} onPress={closeModal}>Cancelar</Button>
        </View>
      </Modal>
    </View>
  );
};

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
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  iconContainer: {
    marginRight: 10,
  },
  actionsContainer: {
    marginTop: 20,
  },
  selectedItem: {
    backgroundColor: '#e0e0e0', // Color de fondo cuando la fila está seleccionada
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: '#007bff', // Cambia el color de fondo del botón de Enviar a azul
    color: '#ffffff', // Cambia el color del texto del botón de Enviar a blanco
  },
  cancelButton: {
    backgroundColor: '#999999', // Cambia el color de fondo del botón de Cancelar a gris
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 24, // Reducido el tamaño de la fuente para que quepa mejor en la pantalla
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'red', // Color del borde del Picker
    borderRadius: 4,
    color: 'black', // Color del texto del Picker
    paddingRight: 30, // Asegura que el texto no se solape con el icono
    backgroundColor: 'white', // Color de fondo del Picker
  },
  inputAndroid: {
    fontSize: 24, // Reducido el tamaño de la fuente para que quepa mejor en la pantalla
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'red', // Color del borde del Picker
    borderRadius: 8,
    color: 'black', // Color del texto del Picker
    paddingRight: 30, // Asegura que el texto no se solape con el icono
    backgroundColor: 'white', // Color de fondo del Picker
    width: 358,
  },
});

export default RoleManagement;
