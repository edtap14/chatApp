import { StyleSheet } from 'react-native';
import { colors } from '../../../Global/colors';

export const styles = new StyleSheet.create({
    viewInput: {
        marginBottom: 5
    },
    input: {
        backgroundColor: colors.grayDeep,
        color: colors.white,
        fontSize: 18,
        marginVertical: 5
    },
    btn: {
        marginTop: 10
    },
    inputError: {
        backgroundColor: colors.wine
    }
});
