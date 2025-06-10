import { FC } from 'react';
import { FormikProps, FormikErrors, FormikTouched } from 'formik';
import { useTranslation } from 'react-i18next';
import { IUpdatePurchaseDto } from '../../../helpers/types';
import Input from '../../atoms/Input/Input';
import Select from '../../atoms/Select/Select';
import Switch from '../../atoms/Switch/Switch';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';
import './FormPurchase.scss';

interface IFormPurchase {
    config: FormikProps<IUpdatePurchaseDto>;
}

const FormPurchase: FC<IFormPurchase> = ({ config }) => {
    const { t } = useTranslation();
    const { values, handleChange, handleBlur, setFieldValue, errors, touched } = config;

    const getNestedError = (field: string) => {
        const fieldParts = field.split('.');
        let currentError: any = errors;
        let currentTouched: any = touched;
        
        for (const part of fieldParts) {
            if (currentError && typeof currentError === 'object') {
                currentError = currentError[part];
            }
            if (currentTouched && typeof currentTouched === 'object') {
                currentTouched = currentTouched[part];
            }
        }
        
        return currentError && currentTouched ? currentError : undefined;
    };

    return (
        <div className="form-purchase">
            <div className="form-purchase__section">
                <h3>{t('purchases_pages.sections.basic_info')}</h3>
                <div className="form-purchase__row">
                    <div className="form-purchase__field">
                        <Input
                            type="number"
                            name="totalPrice"
                            value={values.totalPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('purchases_pages.fields.total_price')}
                            className={errors.totalPrice && touched.totalPrice ? "error" : ""}
                            disabled={true}
                        />
                        {errors.totalPrice && touched.totalPrice && <ErrorMessage message={errors.totalPrice} />}
                    </div>
                    <div className="form-purchase__field">
                        <Select
                            name="paymentMethod"
                            defaultValue={values.paymentMethod}
                            onChange={(value) => setFieldValue('paymentMethod', value)}
                            placeholder={t('purchases_pages.fields.payment_method')}
                            className={errors.paymentMethod && touched.paymentMethod ? "error" : ""}
                            items={[
                                { value: 'payme', name: 'Payme' },
                                { value: 'click', name: 'Click' }
                            ]}
                        />
                        {errors.paymentMethod && touched.paymentMethod && <ErrorMessage message={errors.paymentMethod} />}
                    </div>
                </div>
                <div className="form-purchase__row">
                    <div className="form-purchase__field">
                        <Select
                            name="status"
                            defaultValue={values.status}
                            onChange={(value) => setFieldValue('status', value)}
                            placeholder={t('purchases_pages.fields.status')}
                            className={errors.status && touched.status ? "error" : ""}
                            items={[
                                { value: 'pending', name: 'Pending' },
                                { value: 'completed', name: 'Completed' },
                                { value: 'canceled', name: 'Canceled' },
                                { value: 'failed', name: 'Failed' }
                            ]}
                        />
                        {errors.status && touched.status && <ErrorMessage message={errors.status} />}
                    </div>
                    <div className="form-purchase__field">
                        <div className="form-purchase__checkbox">
                            <span>{t('purchases_pages.fields.is_donating')}</span>
                            <Switch
                                isChecked={values.isDonating}
                                onChange={(value) => setFieldValue('isDonating', value)}
                                label="isDonating"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-purchase__section">
                <h3>{t('purchases_pages.sections.delivery_address')}</h3>
                <div className="form-purchase__row">
                    <div className="form-purchase__field">
                        <Input
                            name="deliveryAddress.city"
                            value={values.deliveryAddress?.city || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('purchases_pages.fields.city')}
                            className={getNestedError('deliveryAddress.city') ? "error" : ""}
                            disabled={true}
                        />
                        {getNestedError('deliveryAddress.city') && <ErrorMessage message={getNestedError('deliveryAddress.city')} />}
                    </div>
                    <div className="form-purchase__field">
                        <Input
                            name="deliveryAddress.district"
                            value={values.deliveryAddress?.district || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('purchases_pages.fields.district')}
                            className={getNestedError('deliveryAddress.district') ? "error" : ""}
                            disabled={true}
                        />
                        {getNestedError('deliveryAddress.district') && <ErrorMessage message={getNestedError('deliveryAddress.district')} />}
                    </div>
                </div>
                <div className="form-purchase__row">
                    <div className="form-purchase__field">
                        <Input
                            name="deliveryAddress.house"
                            value={values.deliveryAddress?.apartment || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('purchases_pages.fields.house')}
                            className={getNestedError('deliveryAddress.house') ? "error" : ""}
                            disabled={true}
                        />
                        {getNestedError('deliveryAddress.house') && <ErrorMessage message={getNestedError('deliveryAddress.house')} />}
                    </div>
                    <div className="form-purchase__field">
                        <Input
                            name="deliveryAddress.apartment"
                            value={values.deliveryAddress?.apartment || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('purchases_pages.fields.apartment')}
                            className={getNestedError('deliveryAddress.apartment') ? "error" : ""}
                            disabled={true}
                        />
                        {getNestedError('deliveryAddress.apartment') && <ErrorMessage message={getNestedError('deliveryAddress.apartment')} />}
                    </div>
                </div>
                <div className="form-purchase__row">
                    <div className="form-purchase__field">
                        <Input
                            name="deliveryAddress.landmark"
                            value={values.deliveryAddress?.landmark || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('purchases_pages.fields.landmark')}
                            className={getNestedError('deliveryAddress.landmark') ? "error" : ""}
                        />
                        {getNestedError('deliveryAddress.landmark') && <ErrorMessage message={getNestedError('deliveryAddress.landmark')} />}
                    </div>
                </div>
            </div>

            <div className="form-purchase__section">
                <h3>{t('purchases_pages.sections.payment_info')}</h3>
                <div className="form-purchase__row">
                    <div className="form-purchase__field">
                        <Input
                            name="paymentId"
                            value={values.paymentId || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('purchases_pages.fields.payment_id')}
                            className={errors.paymentId && touched.paymentId ? "error" : ""}
                        />
                        {errors.paymentId && touched.paymentId && <ErrorMessage message={errors.paymentId} />}
                    </div>
                    <div className="form-purchase__field">
                        <Input
                            name="receiptNumber"
                            value={values.receiptNumber || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('purchases_pages.fields.receipt_number')}
                            className={errors.receiptNumber && touched.receiptNumber ? "error" : ""}
                        />
                        {errors.receiptNumber && touched.receiptNumber && <ErrorMessage message={errors.receiptNumber} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormPurchase; 