import * as yup from "yup";
export const valSchemaLogin = yup.object().shape({
    email: yup.string().email('Wrong email').required('This field is required').min(3,'The field must be at least 3 characters long'),
    password: yup.string().typeError('This field only accepts text').required('This field is required').min(6,'The field must be at least 6 characters long'),
});


export const valSchemaSettings = yup.object().shape({

});

export const valSchemaUser = yup.object().shape({

});