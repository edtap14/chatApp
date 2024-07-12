import { StyleSheet } from 'react-native';
import { colors } from '../../../../Global/colors';

export const styles = new StyleSheet.create({
    itemsContainer: {
        backgroundColor: 'transparent'
    },
    option: {
        backgroundColor: colors.almostBlack
    },
    optionText: {
        color: colors.white,
        fontSize: 18
    },
    optionStart: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    optionEnd: {
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    cancel: {
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center'
    },
    cancelText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.blueSky
    }
});
