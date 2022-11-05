import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { User } from '../data/models/user.model';
import { api } from '../data/services/api/api.service';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '../data/services/auth.service';
import { useToast } from 'native-base';

WebBrowser.maybeCompleteAuthSession();

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [_request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.GOOGLE_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  });

  const storeSession = useCallback((user: User, token?: string) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      AsyncStorage.setItem('@nlw-copa:token', token);
    }
    setUser(user);
  }, []);

  const signIn = useCallback(async () => {
    try {
      setLoading(true);
      await promptAsync();
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
    }
  }, []);

  const signInWithGoogle = useCallback(async (accessToken: string) => {
    try {
      const { user, token } = await AuthService.signIn(accessToken);
      storeSession(user, token);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMe = useCallback(async () => {
    try {
      setLoading(true);
      return AuthService.getMe();
    } catch (error) {
      signOut();
      toast.show({
        title: 'Sua sessão expirou',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  useEffect(() => {
    if (response?.type === 'success' && response?.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    AsyncStorage.getItem('@nlw-copa:token')
      .then(token => {
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return getMe();
        }
      })
      .then(user => storeSession(user));
  }, [storeSession]);

  const providerValue = useMemo(
    () => ({
      signIn,
      signOut,
      user,
      loading
    }),
    [signIn, signOut, user, loading]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { useAuth, AuthProvider };
