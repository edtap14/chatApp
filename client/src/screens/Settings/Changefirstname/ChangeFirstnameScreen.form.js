import * as Yup from 'yup';

export function initialValues() {
    return {
        firstname: ''
    };
}

export function validationScheme() {
    return Yup.object({
        firstname: Yup.string().required(true)
    });
}
