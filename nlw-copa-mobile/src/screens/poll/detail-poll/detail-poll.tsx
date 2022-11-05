import React, { useCallback, useEffect, useState } from 'react';
import { HStack, useToast, VStack } from 'native-base';

import { Header } from '../../../components/header/header.component';
import { Option } from '../../../components/option/option.component';
import { PollService } from '../../../data/services/polls.service';
import { useRoute } from '@react-navigation/native';
import { PollPros } from '../../../components/poll-card/poll-card.component';
import { Loading } from '../../../components/loading/loading.component';
import { EmptyMyPollList } from '../../../components/empty-my-pool-list/empty-my-pool-list.component';
import { PollHeader } from '../../../components/poll-header/poll-header.component';
import { Share } from 'react-native';
import { Guesses } from '../../../components/guesses/guesses.component';

interface ParamsProps {
  code: string;
}

export const DetailPoll = () => {
  const [data, setData] = useState<PollPros | null>(null);
  const [viewSelected, setViewSelected] = useState<'YOUR' | 'GROUP'>('YOUR');
  const [loading, setLoading] = useState(true);

  const { params } = useRoute();
  const { code } = params as ParamsProps;

  const toast = useToast();

  const sharePoll = async () => {
    await Share.share({
      message: `Venha fazer parte do meu bolão para copa do mundo de 2022 no Qatar, use o código ${code}, e entre!`
    });
  };

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      setData(await PollService.getPoll(code));
    } catch (error) {
      toast.show({
        title: 'Não foi possível carregar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setData(null);
    getData();
  }, [code]);

  if (loading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={data?.title}
        showBackButton
        showShareButton
        onShare={sharePoll}
      />
      {data?._count?.participants ? (
        <VStack flex={1} px={5}>
          <PollHeader data={data} />
          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={viewSelected === 'YOUR'}
              onPress={() => setViewSelected('YOUR')}
            />
            <Option
              title="Ranking do grupo"
              isSelected={viewSelected === 'GROUP'}
              onPress={() => setViewSelected('GROUP')}
            />
          </HStack>
          <Guesses pollId={data?.id} code={data?.code} />
        </VStack>
      ) : (
        <EmptyMyPollList code={data?.code} />
      )}
    </VStack>
  );
};
