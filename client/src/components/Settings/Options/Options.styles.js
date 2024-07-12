import { StyleSheet } from 'react-native';
import { colors } from '../../../Global/colors';

export const styles = new StyleSheet.create({
    content: {
        marginTop: 40,
        marginHorizontal: 20,
    },
    item: {
        backgroundColor: colors.almostBlack,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10
    },
    text: {
        color: colors.white,
        fontSize: 16
    },
    itemClose: {
        marginTop: 20,
    },
    textClose: {
        textAlign: 'center',
        color: colors.red,
        fontSize: 16
    }
});
