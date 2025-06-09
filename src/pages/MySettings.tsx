import {FC} from 'react';

import {useDispatchEx, useSelectorEx} from "../hooks/redux";
import { useFormik} from "formik";
import { valSchemaSettings} from "../helpers/schemas";
import ErrorMessage from "../components/atoms/ErrorMessage/ErrorMessage";
import {asyncSettingsAction} from "../redux/slices/auth/authAction";
import {IUser} from "../helpers/types";
import HeaderPanel from "../components/molecules/HeaderPanel/HeaderPanel";
import Input from "../components/atoms/Input/Input";
import PreloaderContent from "../components/atoms/PreloaderContent/PreloaderContent";

const MySettings:FC = () => {

    const {user, isLoading} = useSelectorEx(state => state.auth)


    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue
    } = useFormik({
        initialValues: {
            fullName: user?.fullName as string,
            email: user?.email as string,
            phone:user?.phone as string,
            password: '',
            confirmPassword:'',
        },
        validationSchema:valSchemaSettings,
        onSubmit: values => formHandle(values),
    });

    const dispatch = useDispatchEx();

    const formHandle = (values: IUser)=>{
        const {email,fullName,password} = values;
        const formData = new FormData();

        formData.append('fullName', fullName as string);
        formData.append('email', email as string);

        if(password){
            formData.append('password', password );
        }




        dispatch(asyncSettingsAction(formData))
    };


/*
    useEffect(()=>{
        if(user?.avatar){
            setFileList([
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: `${process.env.REACT_APP_URL_AVATAR+user.avatar}`,
                }
            ])
        }

    },[user,isLoading])*/

 //   if(isLoading) return <Preloader/>;
    return (
        <>
            <div className="container">
                <HeaderPanel title={`Настройки`} onSave={handleSubmit}  />
                {!isLoading  ?
                    <>
                        <div className="form-product">
                            <div className="form-product__wrapper">
                                <div className="form-product__block">
                                    <div className="form-product__images">

                                    </div>
                                    <div className="form-product__inner">
                                        <form onSubmit={handleSubmit} >
                                            <div className="form-product__input">
                                                <Input className={errors.fullName && touched.fullName ? "error": ""} value={values.fullName} onBlur={handleBlur} onChange={handleChange} name={'fullName'} placeholder={'Full Name*'} />
                                                <ErrorMessage message={errors.fullName && touched.fullName && errors.fullName}/>
                                            </div>
                                            <div className="form-product__input">
                                                <Input className={errors.email && touched.email ? "error": ""} value={values.email} onBlur={handleBlur} onChange={handleChange} name={'email'} placeholder={'Email*'} />
                                                <ErrorMessage message={errors.email && touched.email && errors.email}/>
                                            </div>
                                            <div className="form-product__input">
                                                <Input className={errors.password && touched.password ? "error": ""} value={values.password} onBlur={handleBlur} onChange={handleChange} name={'password'} placeholder={'Password*'} />
                                                <ErrorMessage message={errors.password && touched.password && errors.password}/>
                                            </div>
                                            <div className="form-product__input">
                                                <Input className={errors.confirmPassword && touched.confirmPassword ? "error": ""} value={values.confirmPassword} onBlur={handleBlur} onChange={handleChange} name={'confirmPassword'} placeholder={'Confirm Password*'} />
                                                <ErrorMessage message={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}/>
                                            </div>
                                        </form>
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

export default MySettings;