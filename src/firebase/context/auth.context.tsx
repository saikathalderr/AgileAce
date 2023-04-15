import { auth } from '..';
import {
  GoogleAuthProvider,
  UserInfo,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';

// Define types for user and auth context
interface User extends UserInfo {}

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<User>;
  firebaseSignOut: () => Promise<void>;
}

// Create auth context
export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  signInWithGoogle: async () => {
    throw new Error('Not implemented');
  },
  firebaseSignOut: async () => {
    throw new Error('Not implemented');
  },
});

// Define AuthProvider props
interface AuthProviderProps {
  children: React.ReactNode;
}

// Create AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem(
          'user',
          JSON.stringify(user)
        );
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    // Listen for ID token changes
    const unsubscribeIdToken = onIdTokenChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem(
          'user',
          JSON.stringify(user)
        );
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeIdToken();
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const firebaseSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create useAuth hook for consuming the AuthContext
export const useFirebaseAuth = () => {
  return useContext(AuthContext);
};
