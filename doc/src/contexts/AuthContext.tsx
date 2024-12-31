// import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  session: { token: string } | null;
  signOut: () => Promise<void>;
}

// const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [session, setSession] = useState<{ token: string } | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setSession({ token });
//       fetchUser(token);
//     }
//   }, []);

//   const fetchUser = async (token: string) => {
//     try {
//       const response = await api.get('/user/profile');
//       setUser(response.data);
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       await signOut();
//     }
//   };

//   const signOut = async () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     setSession(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, session, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optional: Validate token or fetch user details
      setSession({ token });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
