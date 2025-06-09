import React, { FC } from 'react';
import { FormikValues } from "formik";
import './FormCampaign.scss';
import Input from "../../atoms/Input/Input";
import ErrorMessage from "../../atoms/ErrorMessage/ErrorMessage";
import { useTranslation } from "react-i18next";
import Switch from "../../atoms/Switch/Switch";
import ImageUpload from '../../atoms/ImageUpload/ImageUpload';
import ImageUploadService from '../../../api/ImageUploadService';
import TextArea from '../../atoms/TextArea/TextArea';
import { MultilingualContent } from '../../../helpers/types';

interface IFormCampaign {
    config: FormikValues;
}

interface MultilingualFieldProps {
    fieldName: string;
    values: MultilingualContent;
    errors: any;
    touched: any;
    handleBlur: (e: React.FocusEvent) => void;
    setFieldValue: (field: string, value: any) => void;
    placeholderRu: string;
    placeholderUz: string;
    type?: 'text' | 'textarea';
}

const MultilingualField: FC<MultilingualFieldProps> = ({
    fieldName,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    placeholderRu,
    placeholderUz,
    type = 'text'
}) => {
    const InputComponent = type === 'textarea' ? TextArea : Input;
    const hasError = errors[fieldName] && touched[fieldName];
    const errorMessage = errors[fieldName];

    const handleChange = (lang: 'ru' | 'uz', value: string) => {
        setFieldValue(fieldName, {
            ...values,
            [lang]: value
        });
    };

    return (
        <>
            <div className="form-campaign__input">
                <InputComponent
                    className={hasError ? "error" : ""}
                    value={values.ru}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange('ru', e.target.value)}
                    name={`${fieldName}.ru`}
                    placeholder={placeholderRu}
                />
                {hasError && errorMessage && <ErrorMessage message={errorMessage["ru"]} />}
            </div>
            <div className="form-campaign__input">
                <InputComponent
                    className={hasError ? "error" : ""}
                    value={values.uz}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange('uz', e.target.value)}
                    name={`${fieldName}.uz`}
                    placeholder={placeholderUz}
                />
                {hasError && errorMessage && <ErrorMessage message={errorMessage["uz"]} />}
            </div>
        </>
    );
};

const FormCampaign: FC<IFormCampaign> = ({ config }) => {
    const { values, errors, touched, handleBlur, handleChange, setFieldValue } = config;
    const { t } = useTranslation();
    const imageUploadService = ImageUploadService.getInstance();

    const handleSetImageFile = async (file: File | null) => {
        if (file) {
            const imageUrl = await imageUploadService.uploadImage(file);
            setFieldValue('imageUrl', imageUrl);
        }
    }

    const handleSetBrandLogoFile = async (file: File | null) => {
        if (file) {
            const imageUrl = await imageUploadService.uploadImage(file);
            setFieldValue('brandLogoUrl', imageUrl);
        }
    }

    return (
        <div className="form-campaign">
            <div className="form-campaign__wrapper">
                <div className="form-campaign__block">
                    <div className="form-campaign__inner">
                        <h3>{t('campaigns_pages.sections.basic_info')}</h3>
                        <MultilingualField
                            fieldName="name"
                            values={values.name}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            placeholderRu={t('campaigns_pages.fields.name_ru')}
                            placeholderUz={t('campaigns_pages.fields.name_uz')}
                        />
                        <MultilingualField
                            fieldName="productName"
                            values={values.productName}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            placeholderRu={t('campaigns_pages.fields.product_name_ru')}
                            placeholderUz={t('campaigns_pages.fields.product_name_uz')}
                        />
                        <MultilingualField
                            fieldName="productDescription"
                            values={values.productDescription}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            placeholderRu={t('campaigns_pages.fields.product_description_ru')}
                            placeholderUz={t('campaigns_pages.fields.product_description_uz')}
                            type="textarea"
                        />
                    </div>

                    <div className="form-campaign__inner">
                        <h3>{t('campaigns_pages.sections.dates_price')}</h3>
                        <div className="form-campaign__input">
                            <Input
                                className={errors.startDate && touched.startDate ? "error" : ""}
                                value={values.startDate}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="datetime-local"
                                name="startDate"
                                placeholder={t('campaigns_pages.fields.start_date')}
                            />
                            {errors.startDate && touched.startDate && <ErrorMessage message={errors.startDate} />}
                        </div>
                        <div className="form-campaign__input">
                            <Input
                                className={errors.endDate && touched.endDate ? "error" : ""}
                                value={values.endDate}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="datetime-local"
                                name="endDate"
                                placeholder={t('campaigns_pages.fields.end_date')}
                            />
                            {errors.endDate && touched.endDate && <ErrorMessage message={errors.endDate} />}
                        </div>
                        <div className="form-campaign__input">
                            <Input
                                className={errors.maxParticipants && touched.maxParticipants ? "error" : ""}
                                value={values.maxParticipants}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="maxParticipants"
                                type='number'
                                placeholder={t('campaigns_pages.fields.max_participants')}
                            />
                            {errors.maxParticipants && touched.maxParticipants && <ErrorMessage message={errors.maxParticipants} />}
                        </div>
                        <div className="form-campaign__input">
                            <Input
                                className={errors.productPrice && touched.productPrice ? "error" : ""}
                                value={values.productPrice}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="productPrice"
                                type='number'
                                placeholder={t('campaigns_pages.fields.product_price')}
                            />
                            {errors.productPrice && touched.productPrice && <ErrorMessage message={errors.productPrice} />}
                        </div>
                    </div>

                    <div className="form-campaign__inner">
                        <h3>{t('campaigns_pages.sections.settings')}</h3>
                        <div className="form-campaign__checkboxs">
                            <div className="form-campaign__checkbox">
                                <span>{t('campaigns_pages.fields.is_popular')}</span>
                                <Switch
                                    isChecked={values.isPopular}
                                    onChange={(value) => setFieldValue('isPopular', value)}
                                    label="isPopular"
                                />
                            </div>
                            <div className="form-campaign__checkbox">
                                <span>{t('campaigns_pages.fields.is_new')}</span>
                                <Switch
                                    isChecked={values.isNew}
                                    onChange={(value) => setFieldValue('isNew', value)}
                                    label="isNew"
                                />
                            </div>
                            <div className="form-campaign__checkbox">
                                <span>{t('campaigns_pages.fields.is_final')}</span>
                                <Switch
                                    isChecked={values.isFinal}
                                    onChange={(value) => setFieldValue('isFinal', value)}
                                    label="isFinal"
                                />
                            </div>
                            <div className="form-campaign__checkbox">
                                <span>{t('campaigns_pages.fields.is_cool_prize')}</span>
                                <Switch
                                    isChecked={values.isCoolPrize}
                                    onChange={(value) => setFieldValue('isCoolPrize', value)}
                                    label="isCoolPrize"
                                />
                            </div>
                            <div className="form-campaign__checkbox">
                                <span>{t('campaigns_pages.fields.allow_donation')}</span>
                                <Switch
                                    isChecked={values.allowDonation}
                                    onChange={(value) => setFieldValue('allowDonation', value)}
                                    label="allowDonation"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-campaign__block">
                    <div className="form-campaign__inner">
                        <h3>{t('campaigns_pages.sections.media')}</h3>
                        <div className="form-campaign__input">
                            <ImageUpload
                                handleSetImageFile={handleSetImageFile}
                                imageUrl={values.imageUrl}
                                label={t('campaigns_pages.fields.image_url')}
                            />
                            {errors.imageUrl && touched.imageUrl && <ErrorMessage message={errors.imageUrl} />}
                        </div>
                        <div className="form-campaign__input">
                            <ImageUpload
                                handleSetImageFile={handleSetBrandLogoFile}
                                imageUrl={values.brandLogoUrl}
                                label={t('campaigns_pages.fields.brand_logo_url')}
                            />
                            {errors.brandLogoUrl && touched.brandLogoUrl && <ErrorMessage message={errors.brandLogoUrl} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormCampaign; 