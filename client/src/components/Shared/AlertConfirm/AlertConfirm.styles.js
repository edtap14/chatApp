import { StyleSheet } from 'react-native';
import { colors } from '../../../Global/colors';

export const styles = new StyleSheet.create({
    header: {
        backgroundColor: colors.almostBlack,
        borderBottomColor: colors.almostBlack
    },
    titleText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16
    },
    body: {
        backgroundColor: colors.almostBlack
    },
    messageText: {
        color: colors.white,
        opacity: 0.6
    },
    footer: {
        backgroundColor: colors.almostBlack,
        borderTopColor: colors.almostBlack
    },
    cancel: {
        color: colors.white,
        opacity: 0.6
    }
});
