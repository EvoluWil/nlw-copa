import { Row, Text, Pressable } from 'native-base';
import { Share } from 'react-native';

interface Props {
  code: string;
}

export function EmptyMyPollList({ code }: Props) {
  const sharePoll = async () => {
    await Share.share({
      message: `Venha fazer parte do meu bolão para copa do mundo de 2022 no Qatar, use o código ${code}, e entre!`
    });
  };

  return (
    <Row flexWrap="wrap" justifyContent="center" p={4}>
      <Text color="gray.200" fontSize="sm">
        Esse bolão ainda não tem participantes, que tal
      </Text>

      <Pressable onPress={sharePoll}>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          compartilhar o código
        </Text>
      </Pressable>

      <Text color="gray.200" fontSize="sm" mx={1}>
        do bolão com alguém?
      </Text>

      <Text color="gray.200" mr={1}>
        Use o código
      </Text>

      <Text
        color="gray.200"
        fontSize="sm"
        textAlign="center"
        fontFamily="heading"
      >
        {code}
      </Text>
    </Row>
  );
}
