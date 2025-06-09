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
        dispatch(asyncGetParticipantAction(participantID as string));
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
            points: participant?.points,
            tickets:participant?.tickets,
            dailyStreak:participant?.dailyStreak,
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
                points: participant?.points,
                tickets:participant?.tickets,
                dailyStreak:participant?.dailyStreak,
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
                <HeaderPanel title={`Participant ID:${participant?.id} ${participant?.name} (TG_ID: ${participant?.telegram_id}) @${telegram_username?.username}`} onSave={handleSubmit}  />
                {!isLoading  ?
                    <>
                        <div className="form-product">
                            <div className="form-product__wrapper">
                                <div className="form-product__block">
                                    <div className="form-product__images">

                                    </div>
                                    <div className="form-product__inner">
                                        <div className="form-product__input">
                                            <Input disabled={true} className={errors.name && touched.name ? "error": ""} value={values.name} onBlur={handleBlur} onChange={handleChange} name={'name'} placeholder={'Name'} />
                                            <ErrorMessage message={errors.name && touched.name && errors.name}/>
                                        </div>
                                        <div className="form-product__input">
                                            <Input className={errors.points && touched.points ? "error": ""} value={values.points} onBlur={handleBlur} onChange={handleChange} name={'points'} placeholder={'Points'} />
                                            <ErrorMessage message={errors.points && touched.points && errors.points}/>
                                        </div>
                                        <div className="form-product__input">
                                            <Input className={errors.tickets && touched.tickets ? "error": ""} value={values.tickets} onBlur={handleBlur} onChange={handleChange} name={'tickets'} placeholder={'Tickets'} />
                                            <ErrorMessage message={errors.tickets && touched.tickets && errors.tickets}/>
                                        </div>
                                        <div className="form-product__input">
                                            <Input disabled={true} className={errors.dailyStreak && touched.dailyStreak ? "error": ""} value={values.dailyStreak} onBlur={handleBlur} onChange={handleChange} name={'dailyStreak'} placeholder={'Daily Streak'} />
                                            <ErrorMessage message={errors.dailyStreak && touched.dailyStreak && errors.dailyStreak}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-product__block">
                                    <div className="form-product__inner">
                                        <div className="form-product__input">
                                            <Input disabled={true} value={values.referralId} name={'referralId'} placeholder={'Referral ID'} />
                                        </div>
                                        <div className="form-product__input">
                                            <Input className={errors.invitedByReferralId && touched.invitedByReferralId ? "error": ""} value={values.invitedByReferralId} onBlur={handleBlur} onChange={handleChange} name={'invitedByReferralId'} placeholder={'Invited By Referral ID'} />
                                            <ErrorMessage message={errors.invitedByReferralId && touched.invitedByReferralId && errors.invitedByReferralId}/>
                                        </div>
                                        <div className="form-product__input">
                                            <Input disabled={true}  value={participant?.telegram_user}  placeholder={'Telegram Object'} />
                                        </div>
                                        <div className="form-product__input">
                                            <Input disabled={true} value={participant?.ip}  placeholder={'IP address'} />
                                        </div>
                                        <div className="form-product__input">
                                            <Input disabled={true} value={participant?.country}  placeholder={'Country Code'} />
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