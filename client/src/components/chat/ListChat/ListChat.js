import { Text, View, ScrollView } from 'react-native';
import { map, size } from 'lodash';
import { Item } from './Item';
import { styles } from './ListChat.styles';
import { copies } from '../../../Global/copies';

export function ListChat({
                             chats,
                             onReload,
                             upTopChat
                         }) {
    if (!chats) return;
    return (
        <ScrollView alwaysBounceHorizontal={ false }>
            <View style={ styles.content }>
                {
                    size(chats) === 0
                    ? (
                        <Text style={ styles.noChats }>
                            { copies.noChats }
                        </Text>
                    )
                    : null
                }
                {
                    map(chats, (chat) => (
                        <Item onReload={ onReload } key={ chat._id } chat={ chat } upTopChat={ upTopChat }/>
                    ))
                }
            </View>
        </ScrollView>
    );
}
