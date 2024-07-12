import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

export function ImageFullScreen() {
    const { params: { uri } } = useRoute();
    return (
        <View>
            <Image source={ { uri } } style={ {
                height: '100%',
                width: '100%'
            } }
                   resizeMode={ 'contain' }

            />
        </View>
    );
}
