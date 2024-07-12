import { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from 'native-base';
import { Group } from '../../../api';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks';
import { GroupProfile } from '../../../components/Group';
import { styles } from './GroupProfileScreen.styles';
import { copies } from '../../../Global/copies';

const groupController = new Group();

export function GroupProfileScreen() {
    const { accessToken } = useAuth();
    const { params: { groupId } } = useRoute();
    const navigation = useNavigation();
    const [group, setGroup] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await groupController.obtainDataGroup(accessToken, groupId);
                setGroup(response);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [groupId]);

    const exitGroup = async () => {
        try {
            await groupController.exitGroup(accessToken, groupId);
            navigation.goBack();
            navigation.goBack();
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <ScrollView style={ styles.content }>
            { group ? (
                        <GroupProfile.Info group={ group } setGroup={ setGroup }/>
                    )
                    : null }
            <View style={ styles.actionsContent }>
                <Button colorScheme={ 'secondary' } onPress={ exitGroup }>
                    { copies.exitGroup }
                </Button>
            </View>

        </ScrollView>
    );
}
