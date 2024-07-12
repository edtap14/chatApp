import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Button } from 'native-base';

export default function App() {
    return (
        <NativeBaseProvider>
            <SafeAreaView>
                <Text>Appchat</Text>
                <Button>boton 2R</Button>
            </SafeAreaView>
        </NativeBaseProvider>
    );
}


