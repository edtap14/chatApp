import { useState, useEffect } from 'react';
import { View, Keyboard, Platform } from 'react-native';
import { Input, IconButton, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './ChatForm.styles';
import { useFormik } from 'formik';
import { ChatMessage } from '../../../api';
import { useAuth } from '../../../hooks';
import { SendMedia } from './SendMedia';
import { initialValues, validationSchema } from './ChatForm.form';
import { copies } from '../../../Global/copies';

const chatMessageController = new ChatMessage();

export function ChatForm({ chatId }) {
    const { accessToken } = useAuth();
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    useEffect(() => {
        const showKeyboardSub = Keyboard.addListener('keyboardDidShow', (e) => {
            const { startCoordinates: { height } } = e;
            if (Platform.OS === 'ios') {
                setKeyboardHeight(height + 65);
            }
        });

        const hideKeyboardSub = Keyboard.addListener('keyboardDidHide', (e) => {
            setKeyboardHeight(0);
        });

        return () => {
            showKeyboardSub.remove();
            hideKeyboardSub.remove();
        };
    }, []);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            const { message } = formValue;
            setKeyboardHeight(0);
            Keyboard.dismiss();

            await chatMessageController.sendText(accessToken, chatId, message);

            formik.handleReset();

            try {
            } catch (e) {
                console.error(e);
            }
        }
    });

    return (
        <View style={ [styles.content, { bottom: keyboardHeight }] }>
            <SendMedia chatId={ chatId }/>
            <View style={ styles.inputContainer }>
                <Input
                    placeholder={ copies.sendMessage }
                    style={ styles.input }
                    variant={ 'unstyled' }
                    value={ formik.values.message }
                    onChangeText={ (text) => formik.setFieldValue('message', text) }
                    onEndEditing={ !formik.isSubmitting && formik.handleSubmit }
                />
                <IconButton
                    icon={ <Icon as={ MaterialCommunityIcons } name={ 'send' }/> }
                    padding={ 0 }
                    style={ styles.iconSend }
                    onPress={ !formik.isSubmitting && formik.handleSubmit }
                />
            </View>
        </View>
    );
}
