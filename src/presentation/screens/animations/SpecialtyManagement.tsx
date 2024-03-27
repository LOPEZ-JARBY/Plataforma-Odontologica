import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { List, Text, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';

type Especialidad = {
  Cod_Especialidades: number;
  Nombre_especialidad: string;
  Fecha_Registro: Date;
  Usr_Registro: string;
  EstadoBD: string;
};

export const SpecialtyManagement = () => {
  const [results, setResults] = useState<Especialidad[]>([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState<Especialidad | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [editedEspecialidad, setEditedEspecialidad] = useState<Especialidad | null>(null);
  const [editedNombre_especialidad, setEditedNombre_especialidad] = useState<string>('');
  const [editedEstadoBD, setEditedEstadoBD] = useState<string>('');

  useEffect(() => {
    fetch('http://10.0.2.2:3000/api/especialidades')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(data => setResults(data))
      .catch(error => console.error('Error al ejecutar la consulta: ' + error));
  }, []);

  const handleSelectEspecialidad = (Especialidad: Especialidad) => {
    setSelectedEspecialidad(Especialidad);
  };

  const [editedCod_Especialidades, setEditedCod_Especialidades] = useState<number | null>(null);
  const [editedUsrRegistro, setEditedUsrRegistro] = useState<string>('');

  const handleEditEspecialidad = (Especialidad: Especialidad) => {
    if (Especialidad) {
      setEditedEspecialidad(Especialidad);
      setEditedCod_Especialidades(Especialidad.Cod_Especialidades);
      setEditedNombre_especialidad(Especialidad.Nombre_especialidad);
      setEditedUsrRegistro(Especialidad.Usr_Registro);
      setEditedEstadoBD(Especialidad.EstadoBD);
      setIsModalVisible(true);
    }
  };

  const handleUpdateEspecialidad = () => {
    if (editedEspecialidad) {
      console.log('Datos a enviar al backend:', {
        Cod_Especialidades: editedCod_Especialidades,
        Nombre_especialidad: editedNombre_especialidad,
        EstadoBD: editedEstadoBD,
        Usr_Registro: editedUsrRegistro,
      });
      fetch(`http://10.0.2.2:3000/api/especialidades/${editedEspecialidad.Cod_Especialidades}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Cod_Especialidades: editedCod_Especialidades,
          Nombre_especialidad: editedNombre_especialidad,
          EstadoBD: editedEstadoBD,
          Usr_Registro: editedUsrRegistro,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al actualizar la especialidad');
          }
          return fetch('http://10.0.2.2:3000/api/especialidades');
        })
        .then(response => response.json())
        .then(data => {
          setResults(data);
          setIsModalVisible(false);
        })
        .catch(error => console.error('Error al actualizar la especialidad:', error));
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

  const [newEspecialidadData, setNewEspecialidadData] = useState<any>({
    Nombre_especialidad: editedNombre_especialidad,
    Usr_Registro: editedUsrRegistro,
  });

  const handleAddEspecialidad = () => {

    // Realizar la solicitud POST al backend
    fetch('http://10.0.2.2:3000/api/especialidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEspecialidadData), // Convertir los datos a formato JSON
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar la nueva especialidad');
        }
        return response.json();
      })
      .then(() => {
        setIsAddModalVisible(false);
        setNewEspecialidadData({ Nombre_especialidad: '', Usr_Registro: '' });
        fetch('http://10.0.2.2:3000/api/especialidades')
          .then(response => response.json())
          .then(data => setResults(data))
          .catch(error => console.error('Error al ejecutar la consulta: ' + error));
      })
      .catch(error => console.error('Error al agregar la nueva especialidad:', error));
  };



  const handleCancelAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Consulta de Especialidades:</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddModal}>
          <Icon name="add" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <List.Section>
          {results
            .filter(especialidad => especialidad.EstadoBD !== 'eliminado')
            .map(especialidad => (
              <TouchableOpacity key={especialidad.Cod_Especialidades} onPress={() => handleSelectEspecialidad(especialidad)}>
                <List.Item
                  title={especialidad.Nombre_especialidad}
                  description={`Usuario Registro: ${especialidad.Usr_Registro}\nFecha Registro: ${formatDate(
                    new Date(especialidad.Fecha_Registro)
                  )}\nEstado: ${especialidad.EstadoBD}`}
                  left={() => <Icon name="people" size={30} color="#000" />}
                  right={() => (
                    <View style={styles.iconContainer}>
                      <Icon name={selectedEspecialidad === especialidad ? 'checkmark' : 'create'} size={24} color="#007bff" />
                    </View>
                  )}
                  style={selectedEspecialidad === especialidad ? styles.selectedItem : null}
                  descriptionNumberOfLines={4}
                  descriptionEllipsizeMode="tail"
                  descriptionStyle={{ marginTop: 5, color: 'gray' }}
                />
              </TouchableOpacity>
            ))}
        </List.Section>
      </ScrollView>
      {selectedEspecialidad && (
        <View style={styles.actionsContainer}>
          <Button mode="contained" onPress={() => handleEditEspecialidad(selectedEspecialidad)}>Editar Especialidad</Button>
        </View>
      )}
      {/* Segundo Modal */}
      <Modal visible={isAddModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={[styles.modalTitle, { color: '#ffffff', fontSize: 24 }]}>Nueva Especialidad</Text>
          {/* Contenido del segundo modal */}
          <TextInput
            style={styles.input}
            value={newEspecialidadData.Nombre_especialidad}
            onChangeText={text => setNewEspecialidadData({ ...newEspecialidadData, Nombre_especialidad: text })}
            placeholder="Especialidad"
          />
          <TextInput
            style={styles.input}
            value={newEspecialidadData.Usr_Registro}
            onChangeText={text => setNewEspecialidadData({ ...newEspecialidadData, Usr_Registro: text })}
            placeholder="Usuario de Registro"
          />
          <Button mode="contained" style={[styles.button, styles.sendButton, { marginBottom: 10 }]} onPress={handleAddEspecialidad}>Enviar</Button>
          <Button mode="contained" style={[styles.button, styles.cancelButton]} onPress={handleCancelAddModal}>Cancelar</Button>
        </View>
      </Modal>
      {/* Primer Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={[styles.modalTitle, { color: '#ffffff', fontSize: 24 }]}>Editar Especialidad</Text>
          <TextInput
            style={styles.input}
            value={editedNombre_especialidad}
            onChangeText={text => setEditedNombre_especialidad(text)}
            placeholder="Especialidad"
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
          <Button mode="contained" style={[styles.button, styles.sendButton, { marginBottom: 10 }]} onPress={handleUpdateEspecialidad}>Enviar</Button>
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

export default SpecialtyManagement;