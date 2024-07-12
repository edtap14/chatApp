import { Actionsheet, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../../../../utils';
import { styles } from '../SendMedia.styles';
import { copies } from '../../../../../Global/copies';

export function CameraOptions({
                                  onClose,
                                  chatId
                              }) {


    const navigation = useNavigation();
    const openCamara = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            console.error(copies.errorCamera);
        } else {
            onClose();
            navigation.navigate(screens.global.cameraScreen, {
                type: 'chat',
                id: chatId
            });
        }
    };

    return (
        <Actionsheet.Item style={ [styles.option, styles.optionStart] }
                          onPress={ openCamara }
                          _text={ styles.optionText }
                          startIcon={ <Icon as={ MaterialCommunityIcons } size={ '6' }
                                            name={ 'camera' }
                                            color={ 'primary.500' }/> }>{ copies.camera }</Actionsheet.Item>
    );
}
