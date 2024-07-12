import { StyleSheet } from 'react-native';
import { colors } from '../Global/colors';


export const styles = new StyleSheet.create({
    stackNavigationStyles: {
        contentStyle: {
            backgroundColor: colors.black
        },
        headerStyle: {
            backgroundColor: colors.black
        },
        headerTitleStyle: {
            color: '#fff'
        }
    },
    modalStyles: {
        contentStyle: {
            backgroundColor: colors.almostBlack
        },
        headerStyle: {
            backgroundColor: colors.almostBlack
        },
        headerTitleStyle: {
            color: colors.white
        }
    }
});
