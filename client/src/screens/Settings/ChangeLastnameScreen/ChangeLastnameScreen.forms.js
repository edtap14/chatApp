import * as Yup from 'yup';

export function initialValues() {
    return {
        lastname: ''
    };
}

export function validationScheme() {
    return Yup.object({
        lastname: Yup.string().required(true)
    });
}
