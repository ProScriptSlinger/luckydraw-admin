import {FC, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from "../../components/atoms/ErrorMessage/ErrorMessage";
import {useDispatchEx, useSelectorEx} from "../../hooks/redux";
import {useFormik} from "formik";
import { valSchemaUser} from "../../helpers/schemas";
import {IParticipant, IUser} from "../../helpers/types";
import {asyncGetUserAction, asyncGetUserRolesAction, asyncUserUpdateAction} from "../../redux/slices/users/usersAction";
import HeaderPanel from "../../components/molecules/HeaderPanel/HeaderPanel";
import PreloaderContent from "../../components/atoms/PreloaderContent/PreloaderContent";
import Input from "../../components/atoms/Input/Input";
import Select from "../../components/atoms/Select/Select";
import {useTranslation} from "react-i18next";
import Switch from "../../components/atoms/Switch/Switch";
import {
    asyncGetParticipantAction,
    asyncUpdateParticipantAction
} from "../../redux/slices/participants/participantsAction.ts";

const Participant:FC = () => {
    let {participantID} = useParams();
    const dispatch = useDispatchEx();
    const {participant, isLoading} = useSelectorEx(state => state.participants);

    useEffect(()=>{
        dispatch(asyncGetParticipantAction(Number(participantID)));
    },[participantID]);


    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        setValues
    } = useFormik({
        initialValues: {
            name: participant?.name,
            energy: participant?.energy,
            maxEnergy:participant?.maxEnergy,
            coins: participant?.coins,
            referralId: participant?.referralId,
            invitedByReferralId: participant?.invitedByReferralId,
        },
        validationSchema:valSchemaUser,
        onSubmit: values => formHandle(values),
    });



    const formHandle = (values: any)=>{
        dispatch(asyncUpdateParticipantAction({
            id: participant?.id,
            ...values
        }))
    };



    useEffect(()=>{
        if(participant){
            setValues({
                name: participant?.name,
                energy: participant?.energy,
                maxEnergy:participant?.maxEnergy,
                coins: participant?.coins,
                referralId: participant?.referralId,
                invitedByReferralId: participant?.invitedByReferralId,
            });
        }

    },[participant,isLoading]);

    const telegram_username = participant?.telegram_user ? JSON.parse(participant?.telegram_user) : ""

    const { t } = useTranslation();
    return (
        <>
            <div className="container">
                <HeaderPanel title={`Участник ID:${participant?.id} ${participant?.name} (TG_ID: ${participant?.telegram_id}) @${telegram_username?.username}`} onSave={handleSubmit}  />
                {!isLoading  ?
                    <>
                        <div className="form-product">
                            <div className="form-product__wrapper">
                                <div className="form-product__block">
                                    <div className="form-product__images">

                                    </div>
                                    <div className="form-product__inner">
                                        <div className="form-product__input">
                                            <Input disabled={true} className={errors.name && touched.name ? "error": ""} value={values.name} onBlur={handleBlur} onChange={handleChange} name={'name'} placeholder={'Имя'} />
                                            <ErrorMessage message={errors.name && touched.name && errors.name}/>
                                        </div>
                                        <div className="form-product__input">
                                            <Input className={errors.energy && touched.energy ? "error": ""} value={values.energy} onBlur={handleBlur} onChange={handleChange} name={'energy'} placeholder={'Енергия'} />
                                            <ErrorMessage message={errors.energy && touched.energy && errors.energy}/>
                                        </div>
                                        <div className="form-product__input">
                                            <Input className={errors.maxEnergy && touched.maxEnergy ? "error": ""} value={values.maxEnergy} onBlur={handleBlur} onChange={handleChange} name={'maxEnergy'} placeholder={'Макс. Енергия'} />
                                            <ErrorMessage message={errors.maxEnergy && touched.maxEnergy && errors.maxEnergy}/>
                                        </div>
                                        <div className="form-product__input">
                                            <Input className={errors.coins && touched.coins ? "error": ""} value={values.coins} onBlur={handleBlur} onChange={handleChange} name={'coins'} placeholder={'Монеты'} />
                                            <ErrorMessage message={errors.coins && touched.coins && errors.coins}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-product__block">
                                    <div className="form-product__inner">
                                        <div className="form-product__input">
                                            <Input disabled={true} value={values.referralId} name={'referralId'} placeholder={'Реферал ID'} />
                                        </div>
                                        <div className="form-product__input">
                                            <Input className={errors.invitedByReferralId && touched.invitedByReferralId ? "error": ""} value={values.invitedByReferralId} onBlur={handleBlur} onChange={handleChange} name={'invitedByReferralId'} placeholder={'ID реферала пригласившего'} />
                                            <ErrorMessage message={errors.invitedByReferralId && touched.invitedByReferralId && errors.invitedByReferralId}/>
                                        </div>
                                        <div className="form-product__input">
                                            <Input disabled={true}  value={participant?.telegram_user}  placeholder={'Обьект телеграм'} />
                                        </div>
                                        <div className="form-product__input">
                                            <Input disabled={true} value={participant?.ip}  placeholder={'IP адрес регистрации'} />
                                        </div>
                                        <div className="form-product__input">
                                            <Input disabled={true} value={participant?.country}  placeholder={'Код страны'} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <PreloaderContent/>
                }

            </div>
        </>
    );
};

export default Participant;