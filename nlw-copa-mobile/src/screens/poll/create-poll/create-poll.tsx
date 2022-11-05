import React, { useState } from 'react';
import { Heading, VStack, Text, useToast } from 'native-base';

import { Header } from '../../../components/header/header.component';
import Logo from '../../../assets/logo.svg';
import { Input } from '../../../components/input/input.component';
import { Button } from '../../../components/button/button.component';
import { PollService } from '../../../data/services/polls.service';
import { useNavigation } from '@react-navigation/native';

export const CreatePoll = () => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();
  const toast = useToast();

  const handleCreate = async () => {
    if (!title?.trim()) {
      return toast.show({
        title: 'Titulo do bolão é obrigatório',
        placement: 'top',
        bgColor: 'yellow.500'
      });
    }
    try {
      setLoading(true);
      const { code } = await PollService.createPoll(title);
      toast.show({
        title: 'Bolão criado com sucesso',
        placement: 'top',
        bgColor: 'success.500'
      });
      navigate('detail-poll', { code });
    } catch (error) {
      toast.show({
        title: 'Não foi possível criar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa e compartilhe com amigos!
        </Heading>

        <Input
          value={title}
          onChangeText={setTitle}
          mb={2}
          placeholder="Qual nome do bolão?"
        />

        <Button
          title="Criar meu bolão"
          onPress={handleCreate}
          isLoading={loading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
};
