import { StyleSheet } from 'react-native';
import { colors } from '../../../../Global/colors';

export const styles = new StyleSheet.create({
    content: {
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 20
    },
    image: {
        marginTop: 20,
        marginBottom: 40
    },
    input: {
        backgroundColor: colors.grayDeep,
        color: colors.white,
        fontSize: 18,
        marginVertical: 5
    },
    imageError: {
        borderWidth: 2,
        borderColor: colors.red
    },
    inputError: {
        backgroundColor: colors.wine
    }
});
