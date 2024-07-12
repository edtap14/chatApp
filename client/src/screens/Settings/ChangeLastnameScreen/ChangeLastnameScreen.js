import { View } from 'react-native';
import { Input, Button } from 'native-base';
import { initialValues, validationScheme } from './ChangeLastnameScreen.forms';
import { styles } from './ChangeLastnameScreen.styles';
import { copies } from '../../../Global/copies';
import { useFormik } from 'formik';
import { User } from '../../../api';
import { useAuth } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';

const userController = new User();

export function ChangeLastnameScreen() {
    const navigation = useNavigation();
    const {
        accessToken,
        updateUser
    } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationScheme(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                const dataUser = { lastname: formValues.lastname };
                await userController.updateUser(accessToken, dataUser);
                updateUser('lastname', formValues.lastname);
                navigation.goBack();
            } catch (e) {
                console.log(e);
            }
        }
    });
    return (
        <View style={ styles.content }>
            <Input placeholder={ copies.lastname } variant={ 'unstyled' } autoFocus value={ formik.values.lastname }
                   onChangeText={ (text) => formik.setFieldValue('lastname', text) }
                   style={ [styles.input, formik.errors.lastname && styles.inputError] }/>
            <Button style={ styles.btn } onPress={ formik.handleSubmit }
                    isLoading={ formik.isLoading }>{ copies.change }</Button>
        </View>
    );
}
