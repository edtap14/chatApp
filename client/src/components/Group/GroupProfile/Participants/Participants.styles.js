import { StyleSheet } from 'react-native';
import { colors } from '../../../../Global/colors';

export const styles = new StyleSheet.create({
    content: {
        width: '100%',
        marginTop: 30
    },
    title: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 22
    },
    list: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: colors.grayDeep,
        borderRadius: 10,
        marginVertical: 10
    },
    participant: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center'
    },
    addIcon: {
        color: colors.white
    },
    addParticipant: {
        color: colors.blueCelestial,
        fontWeight: 'bold',
        fontSize: 16
    },
    info: {
        flex: 1
    },
    identity: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        justifyContent: 'space-between'
    },
    email: {
        color: colors.white,
        opacity: 0.4,
        marginTop: 5
    },
    banIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%'
    }
});
