import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { Platform } from 'react-native';
import { CreatePoll } from '../screens/poll/create-poll/create-poll';
import { DetailPoll } from '../screens/poll/detail-poll/detail-poll';
import { FindPoll } from '../screens/poll/find-poll/find-poll';
import { ListPoll } from '../screens/poll/list-poll/list-poll';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: theme.colors.yellow[500],
        tabBarInactiveTintColor: theme.colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: theme.sizes[14],
          paddingTop: theme.sizes[4],
          borderTopWidth: 0,
          backgroundColor: theme.colors.gray[800]
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'ios' ? 0 : -10
        }
      }}
    >
      <Screen
        name="create-poll"
        component={CreatePoll}
        options={{
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={theme.sizes[6]} />
          ),
          tabBarLabel: 'Criar Bolão'
        }}
      />
      <Screen
        name="list-poll"
        component={ListPoll}
        options={{
          tabBarIcon: ({ color }) => (
            <SoccerBall color={color} size={theme.sizes[6]} />
          ),
          tabBarLabel: 'Meus Bolões'
        }}
      />
      <Screen
        name="find-poll"
        component={FindPoll}
        options={{
          tabBarButton: () => null
        }}
      />

      <Screen
        name="detail-poll"
        component={DetailPoll}
        options={{
          tabBarButton: () => null
        }}
      />
    </Navigator>
  );
};
