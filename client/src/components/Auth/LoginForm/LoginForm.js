import { View } from 'react-native';
import { Input, Button } from 'native-base';
import { useFormik } from 'formik';
import { Auth } from '../../../api';
import { useAuth } from '../../../hooks';
import { initialValues, validationSchema } from './LoginForm.form';
import { styles } from './LoginForm.styles';
import { copies } from '../../../Global/copies';

const authController = new Auth();

export function LoginForm() {
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            const {
                email,
                password
            } = formValues;
            try {
                const response = await authController.login(email, password);
                const {
                    access,
                    refresh
                } = response;
                await authController.setAccessToken(access);
                await authController.setRefreshToken(refresh);
                await login(access);
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
                    autoCapitalize="none"
                    value={ formik.values.email }
                    onChangeText={ (text) => formik.setFieldValue('email', text) }
                    style={ [styles.input, formik.errors.email && styles.inputError] }
                />
            </View>
            <Input
                placeholder={ copies.password }
                variant="unstyled"
                secureTextEntry
                value={ formik.values.password }
                onChangeText={ (text) => formik.setFieldValue('password', text) }
                style={ [styles.input, formik.errors.password && styles.inputError] }
            />
            <Button style={ styles.btn } onPress={ formik.handleSubmit }
                    isLoading={ formik.isSubmitting }>{ copies.send }</Button>
        </View>
    );
}

