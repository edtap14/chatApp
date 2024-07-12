import { StyleSheet } from 'react-native';
import { colors } from '../../../Global/colors';

export const styles = new StyleSheet.create({
    content: {
        position: 'absolute',
        width: '100%',
        left: 0,
        bottom: 0,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 50,
        backgroundColor: colors.almostBlack,
        borderTopWidth: 1,
        borderTopColor: colors.mediumGray,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 1,
        position: 'relative'
    },
    input: {
        backgroundColor: colors.silver,
        color: colors.white,
        fontSize: 16,
        borderRadius: 50,
        marginLeft: 15
    },
    iconSend: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginHorizontal: 10,
        height: '100%'
    }
});
