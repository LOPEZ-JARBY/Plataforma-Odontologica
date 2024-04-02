import { StyleSheet, Text, View, useWindowDimensions, TouchableOpacity } from "react-native"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import React, { useState } from 'react';
import { colors } from "../../../config/theme/theme";
import { Button } from "../../components/ui/Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../navigator/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from 'axios';
import { Alert } from 'react-native';
import { useAuth } from '../animations/AuthContext';

// Definir el tipo de prop de navegación para esta pantalla
type NavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

export const LoginScreen = () => {

  const navigation = useNavigation<NavigationProp>();
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Restablece el estado cuando la pantalla entra en foco
  useFocusEffect(
    React.useCallback(() => {
      //setUsername('');
      setPassword('');
    }, [])
  );
  const { signIn } = useAuth(); // Utiliza el hook useAuth para obtener signIn

  const handleLogin = async () => {
    // Verificar si alguno de los campos está vacío
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Campos Requeridos', 'Por favor, ingresa tu correo electrónico y contraseña.');
      return; // Detiene la ejecución de la función si algún campo está vacío
    }

    // Log para visualizar los valores antes de enviarlos
    console.log('Enviando al backend:', { emailOrUsername: username, password });

    {/*const userData = {
      username: "",
      email: "",
      // otros campos como nombre, id, etc.
    };*/}

    try {
      const response = await axios.post('http://10.0.2.2:3000/api/login', {
        emailOrUsername: username, // Asumiendo que 'username' contiene el correo electrónico
        password: password,
      });
      // Si la solicitud es exitosa y el login es correcto, redirige a HomeScreen
      // Aquí asumimos que la respuesta es un objeto JSON con los campos 'message' y 'usuario'
      if (response.data.message === 'Login exitoso.') {
        // Aquí utilizas el valor de 'usuario' para iniciar sesión en el contexto
        signIn({ nombre: response.data.usuario }); // Ajusta esta línea según la estructura de tu objeto User
        navigation.navigate('HomeScreen');
      } else {
        // Puedes manejar diferentes estados o errores de login aquí
        Alert.alert('Login', response.data);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        // Ahora TypeScript sabe que 'error' es un AxiosError y puedes acceder a 'error.response'
        if (error.response && error.response.status === 401) {
          Alert.alert('Error', 'Usuario/Correo o Contraseña incorrecta');
          setPassword(''); // Aquí limpias el input de contraseña        
        } else {
          Alert.alert('Error de Conexión', 'No se pudo conectar al servidor');
        }
      } else {
        // Manejo de otros tipos de errores
        Alert.alert('Error', 'Ocurrió un error inesperado');

      }
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>

        <View style={{ paddingTop: height * 0.30 }}>
          <Text style={styles.header}>Ingresar</Text>
          <Text>Por favor, ingrese para continuar</Text>
        </View>

        {/* Inpunt */}
        <View style={{ marginTop: 20 }}>
          {/* Input Correo Electrónico */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={24} color="#666" style={styles.iconStyle} />
            <TextInput
              // Asegúrate de que el TextInput se expanda
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setUsername(text)} // Actualiza el estado de username
              value={username} // Asegura que el valor mostrado sea el del estado
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
              onChangeText={(text) => setPassword(text)} // Actualiza el estado de password
              value={password} // Asegura que el valor mostrado sea el del estado
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
          <Text>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={{ marginLeft: 5, color: colors.primary }}>Crear una</Text>
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


