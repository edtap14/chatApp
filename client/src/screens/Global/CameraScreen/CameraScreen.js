import { useState, useRef } from 'react';
import { View } from 'react-native';
import { IconButton, CloseIcon, Icon } from 'native-base';
import { CameraView, FlashMode, CameraType, Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PhotoCaptured } from '../../../components/Shared';
import { styles } from './CamaraScreen.styles';
import { CameraTypeToFacingMode } from 'expo-camera/build/web/WebConstants';

export function CameraScreen() {
    const navigation = useNavigation();
    const {
        params: {
            id,
            type
        }
    } = useRoute();
    const [photo, setPhoto] = useState(null);
    const [flashOn, setFlashOn] = useState(false);
    const [cameraBack, setCameraBack] = useState(true);
    const cameraRef = useRef();
    const onClose = () => {
        navigation.goBack();
    };

    const onOffFlash = () => setFlashOn((prevState) => !prevState);

    const changeTypeCamera = () => setCameraBack((prevState) => !prevState);

    const captureImage = async () => {
        const options = { quality: 1 };
        const newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };
    if (photo) {
        return (
            <PhotoCaptured photo={ photo } type={ type } id={ id }/>
        );
    }
    return (
        <CameraView
            ref={ cameraRef }
            style={ styles.container }
            enableTorch={ flashOn }
            flash={ 'off' }
            facing={ cameraBack ? 'back' : 'front' }
        >
            <View style={ styles.topActions }>
                <IconButton icon={ <CloseIcon style={ styles.icon }/> } onPress={ onClose }/>
                <IconButton
                    onPress={ onOffFlash }
                    icon={
                        <Icon
                            as={ MaterialCommunityIcons }
                            size={ '6' }
                            name={ flashOn ? 'flash' : 'flash-off' }
                            style={ styles.icon }
                        />
                    }
                />
            </View>
            <View style={ styles.bottomActions }>
                <IconButton icon={ null }/>
                <IconButton
                    onPress={ captureImage }
                    icon={
                        <Icon
                            as={ MaterialCommunityIcons }
                            size={ '20' }
                            name={ 'circle-outline' }
                            style={ styles.icon }
                        />
                    }
                />
                <IconButton
                    style={ styles.iconBackground }
                    onPress={ changeTypeCamera }
                    icon={
                        <Icon
                            as={ MaterialCommunityIcons }
                            size={ '6' }
                            name={ 'camera-flip' }
                            style={ styles.icon }
                        />
                    }
                />
            </View>
        </CameraView>
    );
}
