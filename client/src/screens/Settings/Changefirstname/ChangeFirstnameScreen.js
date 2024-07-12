import { View } from 'react-native';
import { Input, Button } from 'native-base';
import { initialValues, validationScheme } from './ChangeFirstnameScreen.form';
import { styles } from './ChangeFirstnameScreen.styles';
import { copies } from '../../../Global/copies';
import { useFormik } from 'formik';
import { User } from '../../../api';
import { useAuth } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';

const userController = new User();

export function ChangeFirstnameScreen() {
    const navigation = useNavigation();
    const {
        accessToken,
        updateUser
    } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationScheme(),
        validateOnChang: false,
        onSubmit: async (formValues) => {
            try {
                const dataUser = { firstname: formValues.firstname };
                await userController.updateUser(accessToken, dataUser);
                updateUser('firstname', formValues.firstname);
                navigation.goBack();
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <View style={ styles.content }>
            <Input placeholder={ copies.name } variant={ 'unstyled' } autoFocus
                   value={ formik.values.firstname }
                   onChangeText={ (text) => formik.setFieldValue('firstname', text) }
                   style={ [styles.input, formik.errors.firstname && styles.inputError] }
            />
            <Button style={ styles.btn } onPress={ formik.handleSubmit }
                    isLoading={ formik.isLoading }>{ copies.change }</Button>
        </View>
    );
}
