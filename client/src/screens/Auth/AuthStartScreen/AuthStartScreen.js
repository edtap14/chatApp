import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../../utils';
import { assets } from '../../../assets';
import { styles } from './AuthStartScreen.styles';
import { copies } from '../../../Global/copies';

export function AuthStartScreen() {

    const navigation = useNavigation();

    const goToLogin = () => {
        navigation.navigate(screens.auth.loginScreen);
    };

    return (
        <SafeAreaView style={ styles.content }>
            <Image source={ assets.jpg.auth01 } style={ styles.img }/>
            <View>
                <Text style={ styles.title }>{ copies.titleAuthStart }</Text>
                <Text style={ styles.description }>{ copies.descriptionAuthCaution }</Text>
                <Text style={ styles.description }>{ copies.descriptionAuthConsutation }</Text>
                <Text style={ styles.btn } onPress={ goToLogin }>{ copies.acceptAuth }</Text>
            </View>
        </SafeAreaView>
    );
}
