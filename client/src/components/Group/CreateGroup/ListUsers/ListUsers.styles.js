import { StyleSheet } from 'react-native';
import { colors } from '../../../../Global/colors';

export const styles = new StyleSheet.create({
    content: {
        paddingHorizontal: 10,
        marginBottom: 50,
        paddingBottom: 50
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.mediumGray,
        paddingVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    selected: {
        backgroundColor: colors.greenBlue
    },
    name: {
        fontWeight: '600',
        color: colors.white,
        fontSize: 16
    },
    email: {
        color: colors.white,
        opacity: 0.6,
        marginTop: 2
    }
});
