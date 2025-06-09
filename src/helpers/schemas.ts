import * as yup from "yup";
export const valSchemaLogin = yup.object().shape({
    email: yup.string().email('Wrong email').required('This field is required').min(3,'The field must be at least 3 characters long'),
    password: yup.string().typeError('This field only accepts text').required('This field is required').min(6,'The field must be at least 6 characters long'),
});


export const valSchemaSettings = yup.object().shape({

});

export const valSchemaUser = yup.object().shape({

});

export const valSchemaCampaign = yup.object({
    name: yup.object({
        ru: yup.string().required('Required'),
        uz: yup.string().required('Required')
    }).required('Required'),
    productName: yup.object({
        ru: yup.string().required('Required'),
        uz: yup.string().required('Required')
    }).required('Required'),
    productDescription: yup.object({
        ru: yup.string().required('Required'),
        uz: yup.string().required('Required')
    }),
    imageUrl: yup.string().url('Must be a valid URL'),
    brandLogoUrl: yup.string().url('Must be a valid URL'),
    startDate: yup.date().required('Required'),
    endDate: yup.date().required('Required').min(yup.ref('startDate'), 'End date must be after start date'),
    maxParticipants: yup.number().min(0),
    categories: yup.array().of(yup.string()),
    isPopular: yup.boolean(),
    isNew: yup.boolean(),
    isFinal: yup.boolean(),
    isCoolPrize: yup.boolean(),
    productPrice: yup.number().required('Required').min(0),
    allowDonation: yup.boolean(),
    availableCities: yup.array().of(yup.string()),
    deliveryPrices: yup.object().test(
        'is-delivery-prices',
        'Delivery prices must be a map of city names to numbers',
        (value) => {
            if (!value) return true;
            return Object.values(value).every(price => typeof price === 'number' && price >= 0);
        }
    )
});