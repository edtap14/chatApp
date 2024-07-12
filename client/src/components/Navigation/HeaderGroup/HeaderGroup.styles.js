import { StyleSheet } from 'react-native';
import { colors } from '../../../Global/colors';

export const styles = new StyleSheet.create({
    container: {
        backgroundColor: colors.almostBlack,
        height: 95
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        marginLeft: 30
    },
    name: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16
    }
});
