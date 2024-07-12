import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { HandlerNavigation } from './src/Navigation';
import { AuthProvider } from './src/context';

export default function App() {
    return (
        <NavigationContainer>
            <NativeBaseProvider>
                <AuthProvider>
                    <HandlerNavigation/>
                </AuthProvider>
            </NativeBaseProvider>
        </NavigationContainer>
    );
}
