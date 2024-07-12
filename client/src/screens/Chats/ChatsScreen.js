import { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { IconButton, AddIcon } from 'native-base';
import { size } from 'lodash';
import { screens } from '../../utils';
import { Chat } from '../../api';
import { useAuth } from '../../hooks';
import { ListChat, Search } from '../../components/chat';
import { LoadingScreen } from '../../components/Shared';


const chatController = new Chat();

export function ChatsScreen(callback, deps) {
    const { accessToken } = useAuth();
    const navigation = useNavigation();
    const [chats, setChats] = useState(null);
    const [chatResult, setChatResult] = useState(null);
    const [reload, setReload] = useState(false);

    const onReload = () => setReload(prevState => !prevState);


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon={ <AddIcon/> }
                    padding={ 0 }
                    onPress={ () => navigation.navigate(screens.tab.chats.createChatScreen) }
                />
            )
        });
    }, []);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                try {
                    const response = await chatController.getAll(accessToken);
                    const result = response.sort((a, b) => {
                        return (
                            new Date(b.last_message_date) - new Date(a.last_message_date)
                        );
                    });
                    setChats(result);
                    setChatResult(result);
                } catch (e) {
                    console.error(e);
                }
            })();
        }, [reload])
    );
    const upTopChat = (chatId) => {
        const data = chatResult;
        const formIndex = data.map((chat) => chat._id).indexOf(chatId);
        const toIndex = 0;

        const element = data.splice(formIndex, 1)[ 0 ];

        data.splice(toIndex, 0, element);
        setChats([...data]);
    };

    if (!chatResult) return <LoadingScreen/>;
    return (
        <View>
            { size(chats) > 0 && <Search data={ chats } setData={ setChatResult }/> }
            <ListChat chats={ size(chats) === size(chatResult) ? chats : chatResult } onReload={ onReload }
                      upTopChat={ upTopChat }/>
        </View>
    );
}
