import React, { useCallback, useEffect, useState } from 'react';
import { VStack, Icon, useToast, FlatList } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Header } from '../../../components/header/header.component';
import { Button } from '../../../components/button/button.component';
import { PollService } from '../../../data/services/polls.service';
import {
  PollCard,
  PollPros
} from '../../../components/poll-card/poll-card.component';
import { EmptyPollList } from '../../../components/empty-poll-list/empty-poll-list.component';
import { Loading } from '../../../components/loading/loading.component';

export const ListPoll = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PollPros[]>([]);

  const { navigate } = useNavigation();
  const toast = useToast();

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      setData(await PollService.getPolls());
    } catch (error) {
      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [getData])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        pb={4}
        mb={4}
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="gray.600"
      >
        <Button
          onPress={() => navigate('find-poll')}
          title="Buscar bolão"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
        />
      </VStack>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PollCard
              data={item}
              onPress={() => navigate('detail-poll', { code: item.code })}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPollList />}
        />
      )}
    </VStack>
  );
};
