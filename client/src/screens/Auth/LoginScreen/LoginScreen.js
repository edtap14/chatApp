import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../../utils';
import { styles } from './LoginScreen.styles';
import { copies } from '../../../Global/copies';
import { LoginForm } from '../../../components/Auth';

export function LoginScreen() {
    const navigation = useNavigation();

    const goToRegister = () => {
        navigation.navigate(screens.auth.registerScreen);
    };
    return (
        <View style={ styles.content }>
            <Text style={ styles.title }>{ copies.titleLogin }</Text>

            <LoginForm/>

            <Text style={ styles.register } onPress={ goToRegister }>{ copies.registerButton }</Text>

            <Text style={ styles.info }>{ copies.infoLogin }</Text>
        </View>
    );
}
