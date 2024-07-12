import { Text, View } from 'react-native';
import { Input, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { Auth } from '../../../api';
import { initialValues, validateSchema } from './RegisterForm.form';
import { styles } from './RegisterForm.styles';
import { copies } from '../../../Global/copies';

const authController = new Auth();

export function RegisterForm() {
    const navigation = useNavigation();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validateSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await authController.register(formValue.email, formValue.password);
                navigation.goBack();
            } catch (e) {
                console.log(e);
            }
        }
    });

    return (
        <View>
            <View style={ styles.viewInput }>
                <Input
                    placeholder={ copies.email }
                    variant="unstyled"
                    autoCapitalize={ 'none' }
                    value={ formik.values.email }
                    onChangeText={ (text) => formik.setFieldValue('email', text) }
                    style={ [styles.input, formik.errors.email && styles.inputError] }
                />
            </View>
            <Input
                placeholder={ copies.password }
                variant="unstyled"
                value={ formik.values.password }
                onChangeText={ (text) => formik.setFieldValue('password', text) }
                secureTextEntry={ true }
                style={ [styles.input, formik.errors.password && styles.inputError] }

            />
            <Button
                style={ styles.btn }
                onPress={ formik.handleSubmit }
                isLoading={ formik.isSubmitting }>
                { copies.createAccount }
            </Button>
        </View>
    );
}
