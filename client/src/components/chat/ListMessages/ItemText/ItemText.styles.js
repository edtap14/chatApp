import { StyleSheet } from 'react-native';
import { colors } from '../../../../Global/colors';

export const styled = (isMe) => {
    return new StyleSheet.create({
        content: {
            flexDirection: 'row',
            justifyContent: isMe ? 'flex-end' : 'flex-start',
            marginHorizontal: 10,
            marginBottom: 10
        },
        message: {
            flex: 1,
            backgroundColor: isMe ? colors.isMe : colors.notMe,
            maxWidth: '80%',
            borderRadius: 10,
            paddingVertical: 6,
            paddingHorizontal: 10
        },
        text: {
            color: colors.white,
            fontSize: 16
        },
        date: {
            color: colors.white,
            opacity: 0.6,
            fontSize: 12,
            marginTop: 2,
            textAlign: 'right'
        }
    });
};
