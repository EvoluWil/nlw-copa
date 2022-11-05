import { Box, FlatList, useToast } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { GameService } from '../../data/services/game.service';
import { GuessService } from '../../data/services/guess.service';
import { EmptyMyPollList } from '../empty-my-pool-list/empty-my-pool-list.component';
import { Game, GameProps } from '../game/game.component';
import { Loading } from '../loading/loading.component';

interface Props {
  pollId: string;
  code: string;
}

export function Guesses({ pollId, code }: Props) {
  const [data, setData] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const toast = useToast();

  const handleCreateGuess = async (gameId: string) => {
    if (!firstTeamPoints?.trim() || !secondTeamPoints?.trim()) {
      return toast.show({
        title: 'Informe o palpite para os dois times',
        placement: 'top',
        bgColor: 'yellow.500'
      });
    }
    try {
      setLoadingSubmit(true);
      await GuessService.createGuess(
        pollId,
        gameId,
        firstTeamPoints,
        secondTeamPoints
      );
      toast.show({
        title: 'Palpite realizado com sucesso',
        placement: 'top',
        bgColor: 'success.500'
      });
    } catch (error) {
      toast.show({
        title: 'Não foi possível salvar o palpite',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      setData(await GameService.getGames(pollId));
    } catch (error) {
      toast.show({
        title: 'Não foi possível carregar os jogos',
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
  }, [pollId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={handleCreateGuess}
          loading={loadingSubmit}
        />
      )}
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPollList code={code} />}
    />
  );
}
