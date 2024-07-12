import * as Yup from 'yup';

export function initialValues() {
    return {
        email: '',
        password: ''
    };
}

export function validateSchema() {
    return Yup.object({
        email: Yup.string().email().required(true),
        password: Yup.string().required(true)
    });
}
