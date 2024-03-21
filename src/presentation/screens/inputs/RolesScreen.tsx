import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { List, Text, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

type Role = {
  Cod_Rol: number;
  Rol: string;
  Descripcion: string;
  Fecha_Registro: string;
  Usr_Registro: string;
  EstadoBD: string;
};

export const RolesScreen = () => {
  const [results, setResults] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [newRoleData, setNewRoleData] = useState<{ Rol: string; Descripcion: string; Usr_Registro: string }>({
    Rol: '',
    Descripcion: '',
    Usr_Registro: '',
  });

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

  const handleShowInsertForm = () => {
    setShowInsertForm(true);
  };

  const handleCancelInsertForm = () => {
    setShowInsertForm(false);
    setNewRoleData({ Rol: '', Descripcion: '', Usr_Registro: '' });
  };

  const handleAddRole = () => {
    fetch('http://10.0.2.2:3000/api/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRoleData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar el nuevo rol');
        }
        return response.json();
      })
      .then(() => {
        setShowInsertForm(false);
        setNewRoleData({ Rol: '', Descripcion: '', Usr_Registro: '' });
        fetch('http://10.0.2.2:3000/api/roles')
          .then(response => response.json())
          .then(data => setResults(data))
          .catch(error => console.error('Error al ejecutar la consulta: ' + error));
      })
      .catch(error => console.error('Error al agregar el nuevo rol:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resultados de la consulta:</Text>
      <ScrollView style={styles.scrollContainer}>
        <List.Section>
          {results.map(role => (
            <TouchableOpacity onPress={() => handleSelectRole(role)}>
              <List.Item
                title={role.Rol}
                description={role.Descripcion}
                left={() => <Icon name="people" size={30} color="#000" />}
                right={() => (
                  <TouchableOpacity onPress={() => console.log('Editar', role)}>
                    <Icon name="pencil" size={24} color="#000" />
                  </TouchableOpacity>
                )}
                style={selectedRole === role ? styles.selectedItem : null}
              />
            </TouchableOpacity>
          ))}
        </List.Section>
      </ScrollView>
      {!showInsertForm && (
        <View style={styles.actionsContainer}>
          <Button mode="contained" onPress={handleShowInsertForm}>Agregar Nuevo Rol</Button>
        </View>
      )}
      {showInsertForm && (
        <View style={styles.insertForm}>
          <TextInput
            label="Rol"
            value={newRoleData.Rol}
            onChangeText={text => setNewRoleData({ ...newRoleData, Rol: text })}
          />
          <TextInput
            label="Descripción"
            value={newRoleData.Descripcion}
            onChangeText={text => setNewRoleData({ ...newRoleData, Descripcion: text })}
          />
          <TextInput
            label="Usuario Registro"
            value={newRoleData.Usr_Registro}
            onChangeText={text => setNewRoleData({ ...newRoleData, Usr_Registro: text })}
          />
          <View style={styles.insertFormActions}>
            <Button mode="contained" onPress={handleCancelInsertForm}>Cancelar</Button>
            <Button mode="contained" onPress={handleAddRole}>Agregar</Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actionsContainer: {
    marginTop: 20,
  },
  insertForm: {
    marginTop: 20,
  },
  insertFormActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  selectedItem: {
    backgroundColor: '#e0e0e0', // Color de fondo cuando la fila está seleccionada
  },
});

export default RolesScreen;















