import { FC } from 'react';
import { FormikValues } from "formik";
import './FormTask.scss';
import Input from "../../atoms/Input/Input";
import ErrorMessage from "../../atoms/ErrorMessage/ErrorMessage";
import { useTranslation } from "react-i18next";
import Switch from "../../atoms/Switch/Switch";
import Select from "../../atoms/Select/Select";

interface TaskFormValues {
    name: string;
    nameUz: string;
    description: string;
    descriptionUz: string;
    type: 'channel_subscription' | 'referral';
    rewardPoints: number;
    isActive: boolean;
    channelId: string;
    referralCode: string;
}

interface IFormTask {
    config: {
        values: TaskFormValues;
        errors: any;
        touched: any;
        handleBlur: (e: React.FocusEvent) => void;
        handleChange: (e: React.ChangeEvent) => void;
        setFieldValue: (field: string, value: any) => void;
    };
}

const FormTask: FC<IFormTask> = ({ config }) => {
    const { values, errors, touched, handleBlur, handleChange, setFieldValue } = config;
    const { t } = useTranslation();

    return (
        <div className="form-task">
            <div className="form-task__wrapper">
                <div className="form-task__block">
                    <div className="form-task__inner">
                        <div className="form-task__input">
                            <Input
                                className={errors.name && touched.name ? "error" : ""}
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="name"
                                placeholder={t('tasks_pages.fields.name')}
                            />
                            <ErrorMessage message={errors.name && touched.name && errors.name} />
                        </div>
                        <div className="form-task__input">
                            <Input
                                className={errors.nameUz && touched.nameUz ? "error" : ""}
                                value={values.nameUz}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="nameUz"
                                placeholder={t('tasks_pages.fields.name_uz')}
                            />
                            <ErrorMessage message={errors.nameUz && touched.nameUz && errors.nameUz} />
                        </div>
                        <div className="form-task__input">
                            <Input
                                value={values.description}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="description"
                                placeholder={t('tasks_pages.fields.description')}
                            />
                        </div>
                        <div className="form-task__input">
                            <Input
                                value={values.descriptionUz}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="descriptionUz"
                                placeholder={t('tasks_pages.fields.description_uz')}
                            />
                        </div>
                    </div>

                    <div className="form-task__inner">
                        <div className="form-task__input">
                            <Input
                                className={errors.rewardPoints && touched.rewardPoints ? "error" : ""}
                                value={values.rewardPoints}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="rewardPoints"
                                type="number"
                                placeholder={t('tasks_pages.fields.reward_points')}
                            />
                            <ErrorMessage message={errors.rewardPoints && touched.rewardPoints && errors.rewardPoints} />
                        </div>
                    </div>

                    <div className="form-task__inner">
                        <div className="form-task__input">
                            <Input
                                className={errors.channelId && touched.channelId ? "error" : ""}
                                value={values.channelId}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="channelId"
                                placeholder={t('tasks_pages.fields.channel_id')}
                            />
                            <ErrorMessage message={errors.channelId && touched.channelId && errors.channelId} />
                        </div>
                        <div className="form-task__checkbox">
                            <span>{t('tasks_pages.fields.is_active')}</span>
                            <Switch
                                isChecked={values.isActive}
                                onChange={(value) => setFieldValue('isActive', value)}
                                label="isActive"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormTask; 