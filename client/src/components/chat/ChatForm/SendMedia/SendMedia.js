import { useState } from 'react';
import { IconButton, AddIcon, Actionsheet } from 'native-base';
import { styles } from './SendMedia.styles';
import { copies } from '../../../../Global/copies';
import { GalleryOptions, CameraOptions } from './options';
import { useAuth } from '../../../../hooks';

export function SendMedia({ chatId }) {
    const [show, setShow] = useState(false);
    const { accessToken } = useAuth();

    const onOpenClose = () => {
        setShow((prevState) => !prevState);
    };
    return (
        <>
            <IconButton icon={ <AddIcon/> } padding={ 0 } onPress={ onOpenClose }/>
            <Actionsheet isOpen={ show } onClose={ onOpenClose }>
                <Actionsheet.Content style={ styles.itemsContainer }>
                    <CameraOptions onClose={ onOpenClose } chatId={ chatId }/>
                    <GalleryOptions chatId={ chatId } onClose={ onOpenClose } accessToken={ accessToken }/>
                    <Actionsheet.Item style={ [styles.option, styles.cancel] } _text={ styles.cancelText }
                                      onPress={ onOpenClose }>
                        { copies.cancel }
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}
