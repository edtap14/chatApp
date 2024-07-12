import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../Styles.styles';
import { screens } from '../../utils';
import { ChatScreen, ChatsScreen, CreateChatScreen } from '../../screens/Chats';

const Stack = createNativeStackNavigator();

export function ChatsNavigation() {
    return (
        <Stack.Navigator
            screenOptions={ {
                ...styles.stackNavigationStyles
            } }
        >
            <Stack.Screen
                name={ screens.tab.chats.chatsScreen }
                component={ ChatsScreen }
                options={ { title: 'Chats' } }
            />
            <Stack.Screen
                name={ screens.tab.chats.createChatScreen }
                component={ CreateChatScreen }
                options={ {
                    title: 'Nuevo chat',
                    presentation: 'modal',
                    ...styles.modalStyles
                } }
            />
        </Stack.Navigator>
    );
};
