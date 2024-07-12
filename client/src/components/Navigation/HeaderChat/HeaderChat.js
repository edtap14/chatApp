import { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Pressable } from 'react-native';
import { Avatar, ChevronLeftIcon, DeleteIcon, IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Chat } from '../../../api';
import { useAuth } from '../../../hooks';
import { ENV, screens } from '../../../utils';
import { AlertConfirm } from '../../Shared';
import { styles } from './HeaderChat.styles';
import { copies } from '../../../Global/copies';

const chatController = new Chat();

export function HeaderChat({ chatId }) {
    const [userChat, setUserChat] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    ;
    const navigation = useNavigation();
    const {
        accessToken,
        user
    } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                const response = await chatController.obtainChat(accessToken, chatId);
                const otherUser = user._id !== response.participant_one._id ? response.participant_one : response.participant_two;

                setUserChat(otherUser);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [chatId]);

    const openCloseDelete = () => setShowDelete(prevState => !prevState);

    const deleteChat = async () => {
        try {
            await chatController.removeChat(accessToken, chatId);
            openCloseDelete();
            navigation.goBack();
        } catch (e) {
            console.error(e);
        }
    };

    const goToUserProfile = () => {
        navigation.navigate(screens.global.userProfileScreen, {
            userId: userChat._id
        });
    };

    return (
        <>
            <SafeAreaView style={ styles.container }>
                <View style={ styles.content }>
                    <View style={ styles.info }>
                        <IconButton icon={ <ChevronLeftIcon/> } onPress={ navigation.goBack }/>
                        { userChat && (
                            <Pressable onPress={ goToUserProfile } style={ styles.info }>
                                <Avatar
                                    bg={ 'cyan.500' }
                                    marginRight={ 3 }
                                    size={ 'sm' }
                                    style={ styles.avatar }
                                    source={ {
                                        uri: userChat.avatar && `${ ENV.BASE_PATH }/${ userChat.avatar }`
                                    } }
                                >
                                    { userChat.firstname
                                      ? userChat.firstname.substring(0, 2).toUpperCase()
                                      : userChat.email.substring(0, 2).toUpperCase()
                                    }
                                </Avatar>
                                <Text style={ styles.identity }>
                                    { userChat.firstname || userChat.lastname
                                      ? `${ userChat.firstname || '' } ${ userChat.lastname || '' }`
                                      : userChat.email
                                    }
                                </Text>
                            </Pressable>
                        ) }
                    </View>
                    <View>
                        <IconButton icon={ <DeleteIcon/> } padding={ 0 } onPress={ openCloseDelete }/>
                    </View>
                </View>
            </SafeAreaView>
            <AlertConfirm
                show={ showDelete }
                onClose={ openCloseDelete }
                textConfirm={ copies.delete }
                onConfirm={ deleteChat }
                title={ copies.deleteChat }
                message={ copies.deleteChateMessageV2 }
                isDanger
            />
        </>
    );
}
