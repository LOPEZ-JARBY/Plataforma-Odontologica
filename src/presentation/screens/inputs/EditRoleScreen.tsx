import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export const EditRoleScreen = () => {
  const [rol, setRol] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [usrRegistro, setUsrRegistro] = useState('');
  const [estadoBD, setEstadoBD] = useState('');

  const handleUpdateRole = () => {
    const requestData = {
      Rol: rol,
      Descripcion: descripcion,
      Usr_Registro: usrRegistro,
      EstadoBD: estadoBD,
    };

    console.log('Datos enviados al backend:', requestData);

    fetch('http://10.0.2.2:3000/api/roles/16', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el rol');
        }
        return response.json();
      })
      .then(data => {
        console.log('Rol actualizado:', data);
        // Aquí puedes agregar lógica adicional después de actualizar el rol
      })
      .catch(error => {
        console.error('Error al actualizar el rol:', error);
        // Aquí puedes manejar el error de alguna manera (por ejemplo, mostrando un mensaje al usuario)
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rol:</Text>
      <TextInput
        style={styles.input}
        value={rol}
        onChangeText={text => setRol(text)}
        placeholder="Ingrese el nuevo rol"
      />
      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={text => setDescripcion(text)}
        placeholder="Ingrese la nueva descripción"
      />
      <Text style={styles.label}>Usuario de Registro:</Text>
      <TextInput
        style={styles.input}
        value={usrRegistro}
        onChangeText={text => setUsrRegistro(text)}
        placeholder="Ingrese el usuario de registro"
      />
      <Text style={styles.label}>Estado de la Base de Datos:</Text>
      <TextInput
        style={styles.input}
        value={estadoBD}
        onChangeText={text => setEstadoBD(text)}
        placeholder="Ingrese el estado de la base de datos"
      />
      <Button title="Actualizar Rol" onPress={handleUpdateRole} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default EditRoleScreen;

