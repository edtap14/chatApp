import { useState } from 'react';
import { Text, View } from 'react-native';
import { IconButton, CloseIcon, Icon, Image, Spinner } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ChatMessage } from '../../../api';
import { useAuth } from '../../../hooks';
import { imageExpoFormat } from '../../../utils';
import { styles } from './PhotoCaptured.styles';

const chatMessageController = new ChatMessage();

export function PhotoCaptured({
                                  photo: { uri },
                                  type,
                                  id
                              }) {
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const { accessToken } = useAuth();

    const sendMedia = async () => {
        try {
            setLoading(true);
            const file = imageExpoFormat(uri);
            if (type === 'chat') {
                await chatMessageController.sendImage(accessToken, id, file);
            }

            // TODO: añadir funcion de imagen para grupos

            setLoading(false);
            navigation.goBack();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={ styles.container }>
            <Image source={ { uri } } alt={ 'photo' } style={ styles.photo }/>
            <View style={ styles.topActions }>
                <IconButton icon={ null }/>
                <IconButton
                    onPress={ navigation.goBack }
                    icon={ <CloseIcon style={ styles.icon } size={ '8' }/> }/>
                <IconButton icon={ null }/>
            </View>
            <View style={ styles.bottomActions }>
                <IconButton icon={ null }/>
                { loading
                  ? <Spinner size={ 'lg' }/>
                  : (
                      <IconButton
                          onPress={ sendMedia }
                          icon={
                              <Icon
                                  as={ MaterialCommunityIcons }
                                  size={ 20 }
                                  name={ 'check-circle-outline' }
                                  style={ styles.icon }
                              />
                          }
                      />
                  )
                }
                <IconButton icon={ null }/>
            </View>
        </View>
    );
}
