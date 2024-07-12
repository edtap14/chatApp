import { StyleSheet } from 'react-native';
import { colors } from '../../../Global/colors';

export const styles = new StyleSheet.create({
    content: {
        paddingBottom: 2
    },
    noChats: {
        color: colors.white,
        textAlign: 'center',
        marginTop: 20,
        opacity: 0.4,
        fontSize: 16,
        marginHorizontal: 40
    }
});
