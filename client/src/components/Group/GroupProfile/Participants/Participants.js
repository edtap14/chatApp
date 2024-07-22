import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar, AddIcon, DeleteIcon, IconButton } from 'native-base';
import { size, map } from 'lodash';
import { Group } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { ENV, screens } from '../../../../utils';
import { styles } from './Participants.styles';
import { copies } from '../../../../Global/copies';
import group from 'native-base/src/components/composites/Avatar/Group';
import { useNavigation } from '@react-navigation/native';

const groupController = new Group();

export function Participants({
                                 group: {
                                     _id,
                                     participants
                                 },
                                 onReload
                             }) {
    const {
        accessToken,
        user
    } = useAuth();

    const navigation = useNavigation();

    const banFromGroup = async (participant) => {
        try {
            await groupController.banGroup(accessToken, _id, participant._id);
            onReload();
        } catch (e) {
            console.error(e);
        }

    };

    const openAddParticipants = () => {
        navigation.navigate(screens.global.addUserGroupScreen, {
            groupId: _id
        });
    };

    return (
        <View style={ styles.content }>
            <Text style={ styles.title }>{ size(participants) } { copies.participants }</Text>
            <View style={ styles.list }>
                <TouchableOpacity
                    style={ styles.participant }
                    onPress={ openAddParticipants }
                >
                    <Avatar bg={ 'muted.600' } marginRight={ 3 }>
                        <AddIcon style={ styles.addIcon }/>
                    </Avatar>
                    <Text style={ styles.addParticipant }>{ copies.addParticipants }</Text>
                </TouchableOpacity>
                { map(participants, (participant) => (
                    <View key={ participant._id } style={ styles.participant }>
                        <Avatar
                            bg={ 'cyan.500' }
                            marginRight={ 3 }
                            source={ {
                                uri: participant.avatar && `${ ENV.BASE_PATH }/${ participant.avatar }`
                            } }
                        >
                            { participant.email.substring(0, 2).toUpperCase() }
                        </Avatar>
                        <View style={ styles.info }>
                            <Text style={ styles.identity }>
                                { participant.firstname || participant.lastname
                                  ? `${ participant.firstname || '' } ${ participant.lastname || '' }`
                                  : '...'
                                }
                            </Text>
                            <Text style={ styles.email }>{ participant.email }</Text>
                            { participant._id !== user._id && (
                                <IconButton
                                    icon={ <DeleteIcon/> }
                                    onPress={ () => banFromGroup(participant) }
                                    style={ styles.banIcon }
                                    padding={ 0 }

                                />
                            ) }
                        </View>
                    </View>
                )) }
            </View>
        </View>
    );
}
