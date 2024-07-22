import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { User, Group } from '../../api';
import { useAuth } from '../../hooks';
import { Search, ListUserAddParticipant } from '../../components/Group';

const userController = new User();

export function AddUserGroupScreen() {
    const [users, setUsers] = useState(null);
    const [usersResult, setUsersResult] = useState(null);
    const { accessToken } = useAuth();
    const { params: { groupId } } = useRoute();

    useEffect(() => {
        (async () => {
            try {
                const response = await userController.getUsserExeptParticipantsGroup(accessToken, groupId);
                setUsers(response);
                setUsersResult(response);

            } catch (e) {
                console.error(e);
            }
        })();
    }, []);


    return (
        <View>
            <ListUserAddParticipant users={ usersResult }/>
        </View>
    );
}
