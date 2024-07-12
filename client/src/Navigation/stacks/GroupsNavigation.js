import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../Styles.styles';
import { screens } from '../../utils';
import { CreateGroupScreen, GroupsScreen } from '../../screens/Groups';

const Stack = createNativeStackNavigator();

export function GroupsNavigation(props) {
    return (
        <Stack.Navigator screenOptions={ { ...styles.stackNavigationStyles } }>
            <Stack.Screen
                name={ screens.tab.groups.groupsScreen }
                component={ GroupsScreen }
                options={ { title: 'Grupos' } }
            />
            <Stack.Screen
                name={ screens.tab.groups.createGroupScreen }
                component={ CreateGroupScreen }
                options={ {
                    title: 'Nuevo grupo',
                    presentation: 'modal',
                    ...styles.modalStyles
                } }
            />
        </Stack.Navigator>
    );
}

