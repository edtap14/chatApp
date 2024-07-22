import { StyleSheet } from 'react-native';
import { colors } from '../../../Global/colors';

export const styles = new StyleSheet.create({
    content: {
        paddingHorizontal: 10,
        marginBottom: 50,
        padding: 50
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: colors.mediumGray,
        paddingVertical: 10,
        alignItems: 'center',
    },
    selected: {
        backgroundColor: colors.greenBlue
    },
    name: {
        fontWeight: 'bold',
        color: colors.white,
        fontSize: 16
    },
    email: {
        color: colors.white,
        opacity: 0.6,
        marginTop: 2
    }
});
