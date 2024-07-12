import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { IconButton, CloseIcon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../api';
import { useAuth } from '../../hooks';
import { CreateChat, Search } from '../../components/chat';

const userController = new User();

export function CreateChatScreen() {
    const navigation = useNavigation();
    const { accessToken } = useAuth();
    const [users, setUsers] = useState([]);
    const [userResult, setUserResult] = useState(null);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon={ <CloseIcon/> }
                    padding={ 0 }
                    onPress={ navigation.goBack }
                />
            )
        });
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response = await userController.getAll(accessToken);
                setUsers(response);
                setUserResult(response);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    if (!userResult) return null;

    return (
        <View>
            <Search data={ users } setData={ setUserResult }/>
            <CreateChat.ListUser users={ userResult }/>
        </View>
    );
}
