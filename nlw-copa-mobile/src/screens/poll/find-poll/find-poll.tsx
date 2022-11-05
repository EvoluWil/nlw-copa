import React, { useState } from 'react';
import { Heading, useToast, VStack } from 'native-base';

import { Header } from '../../../components/header/header.component';
import { Input } from '../../../components/input/input.component';
import { Button } from '../../../components/button/button.component';
import { PollService } from '../../../data/services/polls.service';
import { useNavigation } from '@react-navigation/native';

export const FindPoll = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();
  const toast = useToast();

  const handleJoinPoll = async () => {
    if (!code?.trim()) {
      return toast.show({
        title: 'Código do bolão é obrigatório',
        placement: 'top',
        bgColor: 'yellow.500'
      });
    }
    try {
      setLoading(true);
      await PollService.joinPoll(code);
      setLoading(false);
      navigate('list-poll');
    } catch (error) {
      setLoading(false);
      toast.show({
        title: error?.response?.data?.message
          ? error?.response?.data?.message
          : 'Não foi possível encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  };

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar bolão" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através do {'\n'} código do bolão!
        </Heading>

        <Input
          value={code}
          onChangeText={setCode}
          mb={2}
          placeholder="Qual o código do bolão?"
        />

        <Button
          title="Acessar bolão"
          onPress={handleJoinPoll}
          isLoading={loading}
        />
      </VStack>
    </VStack>
  );
};
