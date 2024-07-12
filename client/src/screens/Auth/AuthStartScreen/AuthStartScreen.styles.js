import { StyleSheet } from 'react-native';
import { colors } from '../../../Global/colors';


export const styles = new StyleSheet.create({
    content: {
        flex: 1,
        margin: 20,
        marginTop: 0,
    },
    img: {
        width: '100%',
        height: 400,
        resizeMode: 'contain',
        marginVertical: 20
    },
    title: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20
    },
    description: {
        color: colors.white,
        opacity: 0.6,
        textAlign: 'center',
        marginBottom: 20
    },
    btn: {
        color: colors.aquamarine,
        fontWeight: '600',
        fontSize: 22,
        textAlign: 'center',
        marginTop: 30
    }
});




