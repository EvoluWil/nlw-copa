import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { theme } from './src/styles/theme';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import { Loading } from './src/components/loading/loading.component';
import { AuthProvider } from './src/contexts/auth.context';
import { Routes } from './src/routes/base.routes';

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthProvider>
    </NativeBaseProvider>
  );
};

export default App;
