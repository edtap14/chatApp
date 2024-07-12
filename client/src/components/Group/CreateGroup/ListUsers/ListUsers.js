import { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, IconButton, CheckIcon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { map, size } from 'lodash';
import { ENV } from '../../../../utils';
import { styles } from './ListUsers.styles';
import { array } from 'yup';

export function ListUsers({
                              users,
                              nextStep,
                              setUsersId
                          }) {
    const [ids, setIds] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                if (size(ids) > 0) {
                    return (
                        <IconButton
                            icon={ <CheckIcon size={ 'lg' }/> }
                            padding={ 0 }
                            onPress={ onNextStep }
                        />
                    );
                }
                return null;
            }
        });
    }, [ids]);

    const onNextStep = () => {
        setUsersId(ids);
        nextStep();
    };

    const selectedUnselectedUser = (user) => {
        const isFound = ids.includes(user._id);

        if (isFound) {
            const newArray = ids.filter((userId) => userId !== user._id);
            setIds(newArray);
        } else {
            setIds((prevState) => [...prevState, user._id]);
        }
    };

    const isSelectedUser = (userId) => {
        return ids.includes(userId);
    };

    return (
        <ScrollView style={ styles.content }
                    showsHorizontalScrollIndicator={ false }>
            {
                map(users, (user) => (
                    <TouchableOpacity key={ user._id }
                                      style={ [styles.item, isSelectedUser(user._id) && styles.selected] }
                                      onPress={ () => selectedUnselectedUser((user)) }>
                        <Avatar bg={ 'cyan.500' }
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
                ))
            }
        </ScrollView>
    );
}
