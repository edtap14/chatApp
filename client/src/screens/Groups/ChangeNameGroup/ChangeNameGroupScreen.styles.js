import { StyleSheet } from 'react-native';
import { colors } from '../../../Global/colors';

export const styles = new StyleSheet.create({
    content: {
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 20
    },
    input: {
        backgroundColor: colors.grayDeep,
        color: colors.white,
        fontSize: 18,
        marginVertical: 5
    },
    inputError: {
        backgroundColor: colors.wine
    },
    btn: {
        width: '100%',
        marginTop: 20
    }
});
