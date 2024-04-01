import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definiendo el tipo para el estado del usuario
interface User {
  nombre: string;
  // Puedes añadir más campos según tu modelo de usuario
}

// Definiendo el tipo para el valor del contexto
interface AuthContextType {
  user: User | null;
  signIn: (userInfo: User) => void;
  signOut: () => void;
}

// Proporcionando un valor predeterminado que coincida con el tipo AuthContextType
const AuthContextDefaultValue: AuthContextType = {
  user: null,
  signIn: () => {}, // Función vacía como placeholder
  signOut: () => {}, // Función vacía como placeholder
};

// Creando el contexto con el valor predeterminado
const AuthContext = createContext<AuthContextType>(AuthContextDefaultValue);

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Componente proveedor del contexto
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (userInfo: User) => {
    setUser(userInfo);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

