import React, {FC, useEffect, useState} from 'react';
import { FormikValues} from "formik";
import './FormCapsule.scss'
import Input from "../../atoms/Input/Input";
import ErrorMessage from "../../atoms/ErrorMessage/ErrorMessage";
import {useTranslation} from "react-i18next";

interface IProductForm {
    config: FormikValues;

}

const FormCapsule:FC<IProductForm> = ({ config}) => {
    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm} = config;

    const { t } = useTranslation();

    return (
        <div className="form-product">
            <div className="form-product__wrapper">
                <div className="form-product__block">
                    <div className="form-product__inner">

                        <div className="form-product__input">
                            <Input className={errors.title && touched.title ? "error": ""} value={values.title} onBlur={handleBlur} onChange={handleChange} name={'title'} placeholder={t('capsules_pages.fields.title')} />
                            <ErrorMessage message={errors.title && touched.title && errors.title}/>
                        </div>
                        <div className="form-product__input">
                            <Input className={errors.energy && touched.energy ? "error": ""} value={values.energy} onBlur={handleBlur} onChange={handleChange} name={'energy'} placeholder={t('capsules_pages.fields.energy')} />
                            <ErrorMessage message={errors.energy && touched.energy && errors.energy}/>
                        </div>
                        <div className="form-product__input">
                            <Input className={errors.maxEnergy && touched.maxEnergy ? "error": ""} value={values.maxEnergy} onBlur={handleBlur} onChange={handleChange} name={'maxEnergy'} placeholder={t('capsules_pages.fields.maxEnergy')} />
                            <ErrorMessage message={errors.maxEnergy && touched.maxEnergy && errors.maxEnergy}/>
                        </div>
                        <div className="form-product__input">
                            <Input className={errors.coins && touched.coins ? "error": ""} value={values.coins} onBlur={handleBlur} onChange={handleChange} name={'coins'} placeholder={t('capsules_pages.fields.coins')} />
                            <ErrorMessage message={errors.coins && touched.coins && errors.coins}/>
                        </div>
                    </div>

                </div>
                <div className="form-product__block">
                    <div className="form-product__input">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormCapsule;