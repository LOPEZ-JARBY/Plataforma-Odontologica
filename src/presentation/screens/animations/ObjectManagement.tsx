import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { List, Text, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { useAuth } from '../animations/AuthContext'; // Ajusta la ruta según la ubicación de tu AuthContext


type P_Objeto = {
  Cod_Objeto: number;
  Objeto: string;
  Descripcion: string;
  Tipo_Objeto: string;
  Fecha_Registro: Date;
  Usr_Registro: string;
  EstadoBD: string;
};

export const ObjectManagement = () => {
  const { user } = useAuth();
  const [results, setResults] = useState<P_Objeto[]>([]);
  const [selectedP_Objeto, setSelectedP_Objeto] = useState<P_Objeto | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [editedP_Objeto, setEditedP_Objeto] = useState<P_Objeto | null>(null);
  const [editedObjeto, setEditedObjeto] = useState<string>('');
  const [editedDescripcion, setEditedDescripcion] = useState<string>('');
  const [editedTipo_Objeto, setEditedTipo_Objeto] = useState<string>('');
  const [editedEstadoBD, setEditedEstadoBD] = useState<string>('');



  useEffect(() => {
    fetch('http://10.0.2.2:3000/api/objetos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(data => setResults(data))
      .catch(error => console.error('Error al ejecutar la consulta: ' + error));
  }, []);

  const handleSelectP_Objeto = (P_Objeto: P_Objeto) => {
    setSelectedP_Objeto(P_Objeto);
  };

  const [editedCod_Objeto, setEditedCod_Objeto] = useState<number | null>(null);
  const [editedUsrRegistro, setEditedUsrRegistro] = useState<string>('');

  const handleEditP_Objeto = (P_Objeto: P_Objeto) => {
    if (P_Objeto) {
      setEditedP_Objeto(P_Objeto);
      setEditedCod_Objeto(P_Objeto.Cod_Objeto);
      setEditedObjeto(P_Objeto.Objeto);
      setEditedDescripcion(P_Objeto.Descripcion);
      setEditedTipo_Objeto(P_Objeto.Tipo_Objeto);
      setEditedUsrRegistro(P_Objeto.Usr_Registro);
      setEditedEstadoBD(P_Objeto.EstadoBD);
      setIsModalVisible(true);
    }
  };

  const handleUpdateP_Objeto = () => {
    if (editedP_Objeto) {
      console.log('Datos a enviar al backend:', {
        Cod_Objeto: editedCod_Objeto,
        Objeto: editedObjeto,
        Descripcion: editedDescripcion,
        Tipo_Objeto: editedTipo_Objeto,
        EstadoBD: editedEstadoBD,
        Usr_Registro: user!.nombre,

      });
      fetch(`http://10.0.2.2:3000/api/objetos/${editedP_Objeto.Cod_Objeto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Cod_Objeto: editedCod_Objeto,
          Objeto: editedObjeto,
          Descripcion: editedDescripcion,
          Tipo_Objeto: editedTipo_Objeto,
          EstadoBD: editedEstadoBD,
          Usr_Registro: user!.nombre,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al actualizar objeto');
          }
          return fetch('http://10.0.2.2:3000/api/objetos');
        })
        .then(response => response.json())
        .then(data => {
          setResults(data);
          setIsModalVisible(false);
        })
        .catch(error => console.error('Error al actualizar objetos:', error));
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

  const [newP_ObjetoData, setNewP_ObjetoData] = useState<any>({
    Objeto: editedObjeto,
    Descripcion: editedDescripcion,
    Tipo_Objeto: editedTipo_Objeto,
    Usr_Registro: editedUsrRegistro,
  });

  const handleAddP_Objeto = () => {

        // Asegúrate de que 'user' no es null antes de proceder
        if (!user) {
          console.log("No hay usuario logueado.");
          return;
      }

       // Configura el nuevo objeto con el nombre de usuario del usuario logueado
    const newP_ObjetoWithUser = {
      ...newP_ObjetoData,
      Usr_Registro: user.nombre, // Asumiendo que 'nombre' es el campo que contiene el nombre de usuario
  };

    // Realizar la solicitud POST al backend
    fetch('http://10.0.2.2:3000/api/objetos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newP_ObjetoWithUser), // Convertir los datos a formato JSON
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar el nuevo objeto');
        }
        return response.json();
      })
      .then(() => {
        setIsAddModalVisible(false);
        setNewP_ObjetoData({ Objeto: '', Descripcion: '', Tipo_Objeto: '', Usr_Registro: '' });
        fetch('http://10.0.2.2:3000/api/objetos')
          .then(response => response.json())
          .then(data => setResults(data))
          .catch(error => console.error('Error al ejecutar la consulta: ' + error));
      })
      .catch(error => console.error('Error al agregar el nuevo objeto:', error));
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
        <Text style={styles.header}>Consulta de Objetos:</Text>

        <TouchableOpacity style={styles.addButton} onPress={handleAddModal}>
          <Icon name="add" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <List.Section>
          {results
            .filter(p_objeto => p_objeto.EstadoBD !== 'eliminado')
            .map(p_objeto => (
              <TouchableOpacity key={p_objeto.Cod_Objeto} onPress={() => handleSelectP_Objeto(p_objeto)}>
                <List.Item
                  title={p_objeto.Objeto}
                  description={`Descripción: ${p_objeto.Descripcion}\nTipo_Objeto: ${p_objeto.Tipo_Objeto}\nUsuario Registro: ${p_objeto.Usr_Registro}\nFecha Registro: ${formatDate(
                    new Date(p_objeto.Fecha_Registro)
                  )}\nEstado: ${p_objeto.EstadoBD}`}
                  left={() => <Icon name="people" size={30} color="#000" />}
                  right={() => (
                    <View style={styles.iconContainer}>
                      <Icon name={selectedP_Objeto === p_objeto ? 'checkmark' : 'create'} size={24} color="#007bff" />
                    </View>
                  )}
                  style={selectedP_Objeto === p_objeto ? styles.selectedItem : null}
                  descriptionNumberOfLines={4}
                  descriptionEllipsizeMode="tail"
                  descriptionStyle={{ marginTop: 5, color: 'gray' }}
                />
              </TouchableOpacity>
            ))}
        </List.Section>
      </ScrollView>
      {selectedP_Objeto && (
        <View style={styles.actionsContainer}>
          <Button mode="contained" onPress={() => handleEditP_Objeto(selectedP_Objeto)}>Editar Objeto</Button>
        </View>

      )}
      {/* Segundo Modal para Insertar*/}
      <Modal visible={isAddModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={[styles.modalTitle, { color: '#ffffff', fontSize: 24 }]}>Nuevo Objeto</Text>
          {/* Contenido del segundo modal */}
          <TextInput
            style={styles.input}
            value={newP_ObjetoData.Objeto}
            onChangeText={text => setNewP_ObjetoData({ ...newP_ObjetoData, Objeto: text })}
            placeholder="Objeto"
          />
          <TextInput
            style={styles.input}
            value={newP_ObjetoData.Descripcion}
            onChangeText={text => setNewP_ObjetoData({ ...newP_ObjetoData, Descripcion: text })}
            placeholder="Descripcion"
          />
          <TextInput
            style={styles.input}
            value={newP_ObjetoData.Tipo_Obeto}
            onChangeText={text => setNewP_ObjetoData({ ...newP_ObjetoData, Tipo_Objeto: text })}
            placeholder="Tipo de Objeto "
          />
          {/*<TextInput
            style={styles.input}
            value={newP_ObjetoData.Usr_Registro}
            onChangeText={text => setNewP_ObjetoData({ ...newP_ObjetoData, Usr_Registro: text })}
            placeholder="Usuario de Registro"
          />*/}
          <Button mode="contained" style={[styles.button, styles.sendButton, { marginBottom: 10 }]} onPress={handleAddP_Objeto}>Enviar</Button>
          <Button mode="contained" style={[styles.button, styles.cancelButton]} onPress={handleCancelAddModal}>Cancelar</Button>
        </View>
      </Modal>
      {/* Primer Modal para modificar o editar*/}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={[styles.modalTitle, { color: '#ffffff', fontSize: 24 }]}>Editar Objeto</Text>
          <TextInput
            style={styles.input}
            value={editedObjeto}
            onChangeText={text => setEditedObjeto(text)}
            placeholder="Objeto"
          />
          <TextInput
            style={styles.input}
            value={editedDescripcion}
            onChangeText={text => setEditedDescripcion(text)}
            placeholder="Descripción"
          />
          <TextInput
            style={styles.input}
            value={editedTipo_Objeto}
            onChangeText={text => setEditedTipo_Objeto(text)}
            placeholder="Tipo de Objeto"
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
          <Button mode="contained" style={[styles.button, styles.sendButton, { marginBottom: 10 }]} onPress={handleUpdateP_Objeto}>Enviar</Button>
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
  userGreeting: {
    margin: 1,
    fontSize: 20,
    fontWeight: 'bold',
    
    color: '#007bff', // Esto hará que el texto sea azul.
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

export default ObjectManagement;
