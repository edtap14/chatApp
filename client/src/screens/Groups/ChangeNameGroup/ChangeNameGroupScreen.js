import { View, Text } from 'react-native';
import { Button, Input } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { Group } from '../../../api';
import { useAuth } from '../../../hooks';
import { initialValues, validationSchema } from './ChangeNameGroupScreen.form';
import { styles } from './ChangeNameGroupScreen.styles';
import { copies } from '../../../Global/copies';

const groupController = new Group();

export function ChangeNameGroupScreen() {
    const navigation = useNavigation();
    const {
        params: {
            groupName,
            groupId
        }
    } = useRoute();
    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(groupName),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async ({ name }) => {
            try {
                await groupController.updateGroup(accessToken, groupId, {
                    name
                });
                navigation.goBack();
                navigation.goBack();
                navigation.goBack();
            } catch (e) {
                console.error(e);
            }
        }
    });

    return (
        <View style={ styles.content }>
            <Input
                placeholder={ copies.groupName }
                variant={ 'unstyled' }
                value={ formik.values.name }
                onChangeText={ text => formik.setFieldValue('name', text) }
                style={ [styles.input, formik.errors.name && styles.inputError] }
            />
            <Button
                onPress={ formik.handleSubmit }
                style={ styles.btn }
                isLoading={ formik.isSubmitting }
            >
                { copies.change }
            </Button>
        </View>
    );
}
