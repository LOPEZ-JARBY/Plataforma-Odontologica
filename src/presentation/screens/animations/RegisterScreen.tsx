import { StyleSheet, Text, View, useWindowDimensions, TouchableOpacity } from "react-native"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import React, { useState } from 'react';
import { colors } from "../../../config/theme/theme";
import { Button } from "../../components/ui/Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../navigator/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";

// Definir el tipo de prop de navegación para esta pantalla
type NavigationProp = StackNavigationProp<RootStackParamList, 'RegisterScreen'>;

export const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí se realizará el proceso de inicio de sesión cuando esté listo
    console.log('Username:', username);
    console.log('Password:', password);
  };


  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>

        <View style={{ paddingTop: height * 0.20 }}>
          <Text style={styles.header}>Crear cuenta</Text>
          <Text>Por favor, crea una cuenta para continuar</Text>
        </View>

        {/* Inpunt */}
        <View style={{ marginTop: 20 }}>
          {/* Nombre completo */}
        <View style={styles.inputContainer}>
            <Ionicons name="person" size={24} color="#666" style={styles.iconStyle} />
            <TextInput
               // Asegúrate de que el TextInput se expanda
              placeholder="Nombre y Apellido"
              autoCapitalize="words"
              
            />
          </View>
          
          
          
          {/* Input Correo Electrónico */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={24} color="#666" style={styles.iconStyle} />
            <TextInput
               // Asegúrate de que el TextInput se expanda
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Input Contraseña */}
          <View style={styles.inputContainer}>
            <Ionicons name="key" size={24} color="#666" style={styles.iconStyle} />
            <TextInput
              // Asegúrate de que el TextInput se expanda
              placeholder="Contraseña"
              autoCapitalize="none"
              secureTextEntry
            />
          </View>
        </View>


        {/* Espacio */}
        <View style={{ height: 20 }} />

        {/* Button */}

        <View>
          <Button
            text="Iniciar sesión"
            onPress={handleLogin}
            iconName="log-in"
            iconSize={30}
            iconColor="#fff"
          />

        </View>

        {/* Información para crear cuenta */}
        <View style={{ height: 50 }} />

        <View style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text>¿Ya tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={{ marginLeft: 5, color: colors.primary }}>Ingresar</Text>
      </TouchableOpacity>
        </View>

      </ScrollView>
    </View>


  )
}








// Estilos

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
    fontSize: 40,
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

  inputContainer: {
    flexDirection: 'row', // Alinea ícono y texto horizontalmente
    alignItems: 'center', // Centra verticalmente
    borderWidth: 1, // Opcional: añade un borde al contenedor
    borderColor: '#ccc', // Opcional: color del borde
    padding: 10, // Espacio dentro del contenedor
    marginBottom: 10, // Espacio entre contenedores de input
  },
  iconStyle: {
    marginRight: 10, // Espacio entre el ícono y el TextInput
  },
  


  });
