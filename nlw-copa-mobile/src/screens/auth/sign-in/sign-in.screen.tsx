import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { Center, Icon, Text } from 'native-base';

import Logo from '../../../assets/logo.svg';
import { Button } from '../../../components/button/button.component';
import { useAuth } from '../../../contexts/auth.context';

export const SignIn = () => {
  const { signIn, loading } = useAuth();
  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button
        onPress={signIn}
        isLoading={loading}
        variant="secondary"
        title="Entrar com Google"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
      />
      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {'\n'} de seu e-mail para criação
        de sua conta.
      </Text>
    </Center>
  );
};
