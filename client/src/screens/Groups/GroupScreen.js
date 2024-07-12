import React from 'react';
import { Text } from 'react-native';
import { View } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HeaderGroup } from '../../components/Navigation';

export function GroupScreen() {
    const navigation = useNavigation();
    const { params: { groupId } } = useRoute();
    return (
        <>
            <HeaderGroup groupId={ groupId }/>
            <View flex>
                {/*TODO: ListMessages*/ }
                {/*TODO: GroupForm*/ }
            </View>
        </>

    );
}
