import { StyleSheet } from 'react-native';
import { colors } from '../../../Global/colors';

export const styles = new StyleSheet.create({
    content: {
        marginHorizontal: 20,
        marginTop: 20
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
