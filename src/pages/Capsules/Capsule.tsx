import React, {useEffect, useState} from 'react';
import {useDispatchEx, useSelectorEx} from "../../hooks/redux";
import {useFormik} from "formik";
import {valSchemaSettings} from "../../helpers/schemas";
import {useParams} from "react-router";
import HeaderPanel from "../../components/molecules/HeaderPanel/HeaderPanel";
import PreloaderContent from "../../components/atoms/PreloaderContent/PreloaderContent";
import {useTranslation} from "react-i18next";
import {asyncGetCapsuleAction, asyncUpdateCapsuleAction} from "../../redux/slices/capsules/capsulesAction.ts";
import FormCapsule from "../../components/molecules/FormCapsule/FormCapsule.tsx";

const Capsule = () => {
    let {categoryID} = useParams();
    const dispatch = useDispatchEx();
    const {capsule, isLoadingCapsule} = useSelectorEx(state => state.capsules);
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
        dispatch(asyncUpdateCapsuleAction({...value,id:Number(categoryID)}));
    };
    useEffect(()=>{
        dispatch(asyncGetCapsuleAction(Number(categoryID)));
    },[]);


    useEffect(()=>{
        if(capsule){
            config.setFieldValue('title',capsule?.title);
            config.setFieldValue('energy',capsule?.energy);
            config.setFieldValue('maxEnergy',capsule?.maxEnergy);
            config.setFieldValue('coins',capsule?.coins);
        }
    },[capsule]);

    const { t } = useTranslation();
    return (
        <>
            <div className="container">
                <HeaderPanel title={t('capsules_pages.page.title')} onSave={()=>config.handleSubmit()}  />
                {!isLoadingCapsule ?
                    <>
                        <FormCapsule
                            config={config}
                        />
                    </>
                    :
                    <PreloaderContent/>
                }


            </div>
         </>
    );
};

export default Capsule;