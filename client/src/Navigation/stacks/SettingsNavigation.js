import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../Styles.styles';
import { screens } from '../../utils';
import { ChangeFirstnameScreen, ChangeLastnameScreen, SettingsScreen } from '../../screens/Settings';

const Stack = createNativeStackNavigator();

export function SettingsNavigation(props) {
    return (
        <Stack.Navigator screenOptions={ { ...styles.stackNavigationStyles } }>
            <Stack.Screen
                name={ screens.tab.settings.settingsScreen }
                component={ SettingsScreen }
                options={ { headerShown: false } }
            />
            <Stack.Screen
                name={ screens.tab.settings.changeFirstnameScreen }
                component={ ChangeFirstnameScreen }
                options={ {
                    title: 'Cambiar nombre',
                    presentation: 'modal'
                } }
            />
            <Stack.Screen
                name={ screens.tab.settings.changeLastnameScreen }
                component={ ChangeLastnameScreen }
                options={ {
                    title: 'Cambiar apellido',
                    presentation: 'modal'
                } }
            />
        </Stack.Navigator>
    );
}

