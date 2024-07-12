import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { View } from 'native-base';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatMessage, UnreadMessages } from '../../api';
import { HeaderChat } from '../../components/Navigation';
import { useAuth } from '../../hooks';
import { LoadingScreen } from '../../components/Shared';
import { ENV, socket } from '../../utils';
import { ListMessages, ChatForm } from '../../components/chat';

const chatMessageController = new ChatMessage();
const unreadMessagesController = new UnreadMessages();

export function ChatScreen() {
    const { params: { chatId } } = useRoute();
    const [messages, setMessages] = useState(null);
    const { accessToken } = useAuth();

    useEffect(() => {
        (async () => {
            await AsyncStorage.setItem(ENV.ACTIVE_CHAT_ID, chatId);
        })();
        return async () => {
            await AsyncStorage.removeItem(ENV.ACTIVE_CHAT_ID);
        };
    }, [chatId]);


    useEffect(() => {
        (async () => {
            try {
                const response = await chatMessageController.getAllMessages(
                    accessToken,
                    chatId
                );
                setMessages(response.messages);
                unreadMessagesController.setTotalReadMessages(chatId, response.total);
            } catch (error) {
                console.error(error);
            }
        })();

        return async () => {
            const response = await chatMessageController.getAllMessages(accessToken, chatId);
            unreadMessagesController.setTotalReadMessages(chatId, response.total);
        };
    }, [chatId]);

    useEffect(() => {
        socket.emit('subscribe', chatId);
        socket.on('message', newMessage);

        return () => {
            socket.emit('suscribe', chatId);
            socket.off('message', newMessage);
        };

    }, [chatId, messages]);

    const newMessage = (msg) => {
        setMessages([...messages, msg]);
    };

    return (
        <>
            <HeaderChat chatId={ chatId }/>
            {
                !messages
                ? (<LoadingScreen/>)
                : (
                    <View flex>
                        <ListMessages messages={ messages }/>
                        <ChatForm chatId={ chatId }/>
                    </View>
                )
            }
        </>
    );
}
