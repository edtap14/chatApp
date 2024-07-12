import { StyleSheet } from 'react-native';
import { colors } from '../../../Global/colors';

export const styles = new StyleSheet.create({
    content: {
        alignItems: 'center',
        marginTop: 10
    },
    identity: {
        color: colors.white,
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 20
    },
    email: {
        color: colors.white,
        fontSize: 16,
        marginTop: 10,
        opacity: 0.6
    }
});
