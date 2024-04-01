// src/components/Header.js
import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../animations/AuthContext';


const Header = () => {
  const { user } = useAuth();

  return (
    <View>
      {user && <Text>Usuario: {user.nombre}</Text>}
    </View>
  );
};

export default Header;
