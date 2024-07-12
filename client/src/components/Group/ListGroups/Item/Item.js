import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'native-base';
import { isEmpty } from 'lodash';
import { DateTime } from 'luxon';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GroupMessage, UnreadMessages } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { ENV, screens, socket } from '../../../../utils';
import { styles } from './Item.styles';

const groupMessageController = new GroupMessage();
const unreadMessagesController = new UnreadMessages();

export function Item({
                         group: {
                             name,
                             image,
                             _id
                         },
                         upGroupChat
                     }) {
    const {
        accessToken,
        user
    } = useAuth();
    const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
    const [lastMessage, setLastMessage] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            try {
                const totalMessages = await groupMessageController.getTotal(accessToken, _id);
                const totalReadMessages = await unreadMessagesController.getTotalReadMessages(_id);
                setTotalUnreadMessages(totalMessages - totalReadMessages);

            } catch (e) {
                console.error(e);
            }
        })();
    }, [_id]);

    useEffect(() => {
        (async () => {
            try {
                const response = await groupMessageController.getLastMessage(accessToken, _id);
                if (!isEmpty(response)) setLastMessage(response);

            } catch (e) {
                console.error(e);
            }
        })();
    }, [_id]);

    useEffect(() => {
        socket.emit('subscribe', `${ _id }_notify`);
        socket.on('message_notify', newMessage);
    }, []);

    const newMessage = async (newMsg) => {
        if (newMsg.group === _id) {
            if (newMsg.user._id !== user._id) {
                upGroupChat(newMsg.group);
                setLastMessage(newMsg);

                const activeGroupId = await AsyncStorage.getItem(ENV.ACTIVE_GROUP_ID);
                if (activeGroupId !== newMsg.group) {
                    setTotalUnreadMessages(prevState => prevState + 1);
                }
            }
        }
    };

    const openGroup = () => {
        setTotalUnreadMessages(0);
        navigation.navigate(screens.global.groupScreen, { groupId: _id });
    };
    return (
        <TouchableOpacity style={ styles.content } onPress={ openGroup }>
            <Avatar
                bg={ 'cyan.500' }
                size={ 'lg' }
                marginRight={ 3 }
                style={ styles.avatar }
                source={ { uri: `${ ENV.BASE_PATH }/${ image }` } }
            />
            <View style={ styles.infoContent }>
                <View style={ styles.info }>
                    <Text style={ styles.name }>{ name }</Text>
                    <Text style={ styles.message } numberOfLines={ 2 }>
                        <Text
                            style={ styles.user }> { lastMessage
                                                     ? `${ lastMessage.user?.firstname || lastMessage.user.email }: `
                                                     : ' ' } </Text>
                        <Text style={ styles.text }>
                            { lastMessage ? `${ lastMessage.message }` : '' }
                        </Text>
                    </Text>
                </View>
                <View style={ styles.notify }>
                    { lastMessage ? (
                        <Text style={ styles.time }>
                            { DateTime.fromISO(new Date(lastMessage.createdAt).toISOString()).toFormat('HH:mm') }
                        </Text>
                    ) : null }
                    { totalUnreadMessages ? (
                        <View style={ styles.totalUnreadContent }>
                            <Text style={ styles.totalUnread }>
                                { totalUnreadMessages < 99 ? totalUnreadMessages : '+99' }
                            </Text>
                        </View>
                    ) : null }
                </View>
            </View>
        </TouchableOpacity>
    );
}
