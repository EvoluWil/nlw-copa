import React from 'react';
import { Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useAuth } from '../contexts/auth.context';
import { SignIn } from '../screens/auth/sign-in/sign-in.screen';
import { Loading } from '../components/loading/loading.component';

export const Routes = () => {
  const { user, loading } = useAuth();
  return (
    <Box flex={1} bg="gray.900">
      {loading ? (
        <Loading />
      ) : (
        <NavigationContainer>
          {user ? <AppRoutes /> : <SignIn />}
        </NavigationContainer>
      )}
    </Box>
  );
};
