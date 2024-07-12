import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './RegisterScreen.styles';
import { copies } from '../../../Global/copies';
import { RegisterForm } from '../../../components/Auth';

export function RegisterScreen() {
    const navigation = useNavigation();


    return (
        <View style={ styles.content }>
            <Text style={ styles.title }>{ copies.titleRegisterScreen }</Text>
            <RegisterForm/>
            <Text style={ styles.register } onPress={ navigation.goBack }>{ copies.startSession }</Text>
        </View>
    );
}

