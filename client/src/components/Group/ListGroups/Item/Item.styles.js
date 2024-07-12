import { StyleSheet } from 'react-native';
import { colors } from '../../../../Global/colors';

export const styles = new StyleSheet.create({
    content: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        height: 80
    },
    avatar: {
        width: 60,
        height: 60
    },
    infoContent: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.mediumGray,
        paddingVertical: 10,
        justifyContent: 'space-between',
        height: '100%'
    },
    info: {
        flex: 1
    },
    name: {
        fontWeight: 600,
        color: colors.white,
        fontSize: 16,
        marginBottom: 5,
    },
    message: {
        color: colors.white,
        fontSize: 15
    },
    text: {
        opacity: 0.4
    },
    notify: {
        alignItems: 'flex-end'
    },
    time: {
        opacity: 0.6,
        color: colors.white,
        fontSize: 12,
        marginBottom: 10
    },
    totalUnreadContent: {
        backgroundColor: colors.blueSky,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25
    },
    totalUnread: {
        color: colors.black,
        fontSize: 12,
        fontWeight: 'bold'
    }
});
