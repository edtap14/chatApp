import { View, Text, Pressable } from 'react-native';
import { Avatar, InfoIcon } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Group } from '../../../../api';
import { ENV, imageExpoFormat, screens } from '../../../../utils';
import { styles } from './Info.styles';
import { useAuth } from '../../../../hooks';

const groupController = new Group();
export const Info = ({
                         group,
                         setGroup
                     }) => {

    const { accessToken } = useAuth();
    const navigation = useNavigation();
    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1
        });

        if (!result.canceled) {
            await updateImage(result.assets[ 0 ].uri);
        }
    };

    const updateImage = async (uri) => {
        try {
            const file = imageExpoFormat(uri);
            const response = await groupController.updateGroup(accessToken, group._id, {
                file
            });

            const newData = {
                ...group,
                image: response.image
            };
            setGroup(newData);
        } catch (e) {
            console.error(e);
        }
    };

    const openChangeNameGroup = () => {
        navigation.navigate(screens.global.changeNameGroupScreen, {
            groupId: group._id,
            groupName: group.name
        });
    };


    return (
        <View style={ styles.content }>
            <Pressable onPress={ openGallery }>
                <Avatar
                    bg={ 'cyan.500' }
                    size={ 'xl' }
                    source={ { uri: `${ ENV.BASE_PATH }/${ group.image }` } }
                />
            </Pressable>
            <Text style={ styles.name } onPress={ openChangeNameGroup }>
                { group.name } <InfoIcon/>
            </Text>
        </View>
    );
};
