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
            backgroundColor: isMe ? colors.isMe : colors.notMe,
            maxWidth: '80%',
            borderRadius: 10,
            padding: 3,
            overflow: 'hidden'
        },
        image: {
            borderRadius: 10
        },
        date: {
            position: 'absolute',
            bottom: 10,
            right: 10,
            color: colors.white,
            fontSize: 12,
            marginTop: 2,
            textAlign: 'right'
        }
    });

};
