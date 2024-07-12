import { Platform, View } from 'react-native';
import { Spinner, VStack, Heading } from 'native-base';
import { copies } from '../../Global/copies';

export function LoadingScreen() {

    if (Platform.OS === 'ios') {
        return (
            <VStack flex alignItems="center" justifyContent="center">
                <Spinner size="lg"/>
                <Heading color="primary.500" fontSize="md" marginTop={ 2 }>
                    { copies.charging }
                </Heading>
            </VStack>);
    } else {
        return (
            <View style={ {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            } }>
                <Spinner size="lg"/>
                <Heading color="primary.500" fontSize="md" marginTop={ 2 }>
                    { copies.charging }
                </Heading>
            </View>);
    }
}
