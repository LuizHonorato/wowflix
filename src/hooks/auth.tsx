import React, { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../store/modules/auth/actions';

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User;
}

interface AuthContextData {
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState<AuthState>(() => {
    const userStoraged = localStorage.getItem('@Wowflix:user');

    if (userStoraged) {
      const user = JSON.parse(userStoraged);
      dispatch(loadUser(user));
    }

    return {} as AuthState;
  });

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
