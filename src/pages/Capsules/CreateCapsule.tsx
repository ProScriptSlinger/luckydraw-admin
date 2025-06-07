import React, {useState} from 'react';
import {useDispatchEx} from "../../hooks/redux";
import {useFormik} from "formik";
import {valSchemaSettings} from "../../helpers/schemas";

import HeaderPanel from "../../components/molecules/HeaderPanel/HeaderPanel";

import {useTranslation} from "react-i18next";
import {asyncCreateCapsuleAction} from "../../redux/slices/capsules/capsulesAction.ts";
import FormCapsule from "../../components/molecules/FormCapsule/FormCapsule.tsx";

const CreateCapsule = () => {
    const dispatch = useDispatchEx();

    const config = useFormik({
        initialValues: {
            title: '',
            energy: 0,
            maxEnergy: 0,
            coins: 0,
        },
        validationSchema:valSchemaSettings,
        onSubmit: (value) => formHandle(value),
    });

    const formHandle = (value: any)=>{
        dispatch(asyncCreateCapsuleAction(value));
        config.resetForm();
    };
    const { t } = useTranslation();
    return (
        <>
            <div className="container">
                <HeaderPanel title={t('capsules_pages.create.title')} onSave={()=>config.handleSubmit()}  />
                <FormCapsule
                    config={config}
                />

            </div>

        </>
    );
};

export default CreateCapsule;