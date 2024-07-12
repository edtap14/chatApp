import { useState } from 'react';
import { Text } from 'react-native';
import { AlertDialog, Button } from 'native-base';
import { styles } from './AlertConfirm.styles';
import { copies } from '../../../Global/copies';

export function AlertConfirm({
                                 show,
                                 onConfirm,
                                 onClose,
                                 textConfirm,
                                 title,
                                 isDanger,
                                 message
                             }) {

    const [loading, setLoading] = useState(false);

    const onConfirmWrapper = () => {
        setLoading(true);
        onConfirm();
    };

    return (
        <AlertDialog isOpen={ show } onClose={ onClose }>
            <AlertDialog.Content>
                <AlertDialog.CloseButton/>

                <AlertDialog.Header style={ styles.header }>
                    <Text style={ styles.titleText }>{ title }</Text>
                </AlertDialog.Header>

                <AlertDialog.Body style={ styles.body }>
                    <Text style={ styles.messageText }>{ message }</Text>
                </AlertDialog.Body>

                <AlertDialog.Footer style={ styles.footer }>
                    <Button.Group space={ 2 }>
                        <Button variant={ 'unstyled' } onPress={ onClose }
                                _text={ styles.cancel }>{ copies.cancel }</Button>
                        <Button colorScheme={ isDanger ? 'danger' : 'cyan' } onPress={ onConfirmWrapper }
                                isLoading={ loading }>{ textConfirm }</Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    );
}
