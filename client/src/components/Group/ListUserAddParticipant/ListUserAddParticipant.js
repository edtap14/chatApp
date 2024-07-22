import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, IconButton, CheckIcon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { map, size } from 'lodash';
import { ENV } from '../../../utils';
import { styles } from './ListUserAddParticipant.styles';

export function ListUserAddParticipant({ users }) {
    return (
        <ScrollView style={ styles.content } showsVerticalScrollIndicator={ false }>
            { map(users, (user) => (
                <TouchableOpacity
                    key={ user._id }
                    onPress={ () => console.log('Add User') }
                    style={ styles.item }
                >
                    <Avatar
                        bg={ 'cyan.500' }
                        marginRight={ 3 }
                        source={ { uri: user.avatar && `${ ENV.BASE_PATH }/${ user.avatar }` } }
                    >
                        { user.email.substring(0, 2).toUpperCase() }
                    </Avatar>
                    <View style={ styles.info }>
                        <Text style={ styles.name }>
                            { user.firstname || user.lastname
                              ? `${ user.firstname || '' } ${ user.lastname || '' }`
                              : '...'
                            }
                        </Text>
                        <Text style={ styles.email }>{ user.email }</Text>
                    </View>
                </TouchableOpacity>
            )) }
        </ScrollView>
    );
}
