import {FC, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from "../../components/atoms/ErrorMessage/ErrorMessage";
import {useDispatchEx, useSelectorEx} from "../../hooks/redux";
import {useFormik} from "formik";
import { valSchemaUser} from "../../helpers/schemas";
import {IUser} from "../../helpers/types";
import {asyncGetUserAction, asyncGetUserRolesAction, asyncUserUpdateAction} from "../../redux/slices/users/usersAction";
import HeaderPanel from "../../components/molecules/HeaderPanel/HeaderPanel";
import PreloaderContent from "../../components/atoms/PreloaderContent/PreloaderContent";
import Input from "../../components/atoms/Input/Input";
import Select from "../../components/atoms/Select/Select";
import {useTranslation} from "react-i18next";
import Switch from "../../components/atoms/Switch/Switch";

const User:FC = () => {
    let {userID} = useParams();
    const dispatch = useDispatchEx();
    const {user,rolesList, isLoading} = useSelectorEx(state => state.users);
    const [fileList, setFileList] = useState<any[]>([]);

    useEffect(()=>{
        dispatch(asyncGetUserAction(userID as string));
    },[userID]);

    const handleChangeImage:any = ({fileList}:any) => {
        setFileList(fileList);

        if(fileList.length === 0){
            setFieldValue("avatar", '');
        }
    };

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
            fullName: user?.fullName,
            email: user?.email,
            phone:user?.phone,
            password: '',
            confirmPassword:'',
            banReason: user?.banReason,
            isBan: !!user?.isBan,
            role: user?.roles[0]?.title
        },
        validationSchema:valSchemaUser,
        onSubmit: values => formHandle(values),
    });



    const formHandle = (values: IUser)=>{
        const {email,isBan,banReason,fullName,phone,avatar,role,password} = values;
        const formData = new FormData();

        formData.append('fullName', fullName as string);
        formData.append('phone', phone as string);
        formData.append('email', email as string);
        formData.append('banReason', banReason as string);
        formData.append('isBan', isBan ? 'true' : 'false');
        formData.append('role', role as string);

/*        if(typeof avatar === "string") formData.append('avatar', avatar as string);
        else formData.append('avatar', avatar as File, 'image.jpg');*/

        formData.append('password', password as string);

        dispatch(asyncUserUpdateAction({
            userID: user?.id,
            user: formData
        }))
    };



    useEffect(()=>{
        if(user){
            setValues({
                fullName: user?.fullName,
                email: user?.email,
                phone:user?.phone,
                password: '',
                confirmPassword:'',
                banReason: user?.banReason,
                isBan: user?.isBan,
                role: user?.roles[0]?.title
            });
        }


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

    },[user,isLoading]);

    useEffect(()=>{
        dispatch(asyncGetUserRolesAction());
    },[]);
    const onChangeRoles = (value:any)=>{
        setFieldValue('role', value);
    }
    const { t } = useTranslation();
    return (
        <>
            <div className="container">
                <HeaderPanel title={`Користувач ${user?.email}`} onSave={handleSubmit}  />
                {!isLoading  ?
                    <>
                        <div className="form-product">
                            <div className="form-product__wrapper">
                                <div className="form-product__block">
                                    <div className="form-product__images">

                                    </div>
                                    <div className="form-product__inner">
                                        <div className="form-product__input">
                                            <Input className={errors.fullName && touched.fullName ? "error": ""} value={values.fullName} onBlur={handleBlur} onChange={handleChange} name={'fullName'} placeholder={'Full Name*'} />
                                            <ErrorMessage message={errors.fullName && touched.fullName && errors.fullName}/>
                                        </div>
                                        <div className="form-product__input">
                                            <Input className={errors.email && touched.email ? "error": ""} value={values.email} onBlur={handleBlur} onChange={handleChange} name={'email'} placeholder={'Email*'} />
                                            <ErrorMessage message={errors.email && touched.email && errors.email}/>
                                        </div>
                                        <div className="form-product__input">
                                            {rolesList.length ?
                                                <Select
                                                   // type={'search'}
                                                    defaultValue={values.role?.toString()}
                                                    className={errors.role && touched.role ? "error": ""}
                                                    onChange={onChangeRoles}
                                                    placeholder={t('users_pages.fields.roles')}
                                                    items={rolesList.map((item:any)=>{

                                                        return {
                                                            value: item.title.toString(),
                                                            name: item.title as string
                                                        }
                                                    })}
                                                />
                                                : ''}


                                        </div>
                                        <div className="form-product__input">
                                            <Input className={errors.password && touched.password ? "error": ""} value={values.password} onBlur={handleBlur} onChange={handleChange} name={'password'} placeholder={'Password*'} />
                                            <ErrorMessage message={errors.password && touched.password && errors.password}/>
                                        </div>
                                        <div className="form-product__input">
                                            <Input className={errors.confirmPassword && touched.confirmPassword ? "error": ""} value={values.confirmPassword} onBlur={handleBlur} onChange={handleChange} name={'confirmPassword'} placeholder={'Confirm Password*'} />
                                            <ErrorMessage message={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-product__block">
                                    <div className="form-product__images">

                                    </div>
                                    <div className="form-product__inner">
                                        <div className="form-product__input">
                                            <div className="form-product__checkbox">
                                                <span>{t('users_pages.fields.isBan')}</span>
                                                <Switch isChecked={values.isBan} onChange={(value)=>setFieldValue('isBan', value)} label={'isBan'}/>
                                            </div>
                                        </div>
                                        <div className="form-product__input">
                                            <Input className={errors.banReason && touched.banReason ? "error": ""} value={values.banReason} onBlur={handleBlur} onChange={handleChange} name={'banReason'} placeholder={'Ban Reason'} />
                                            <ErrorMessage message={errors.banReason && touched.banReason && errors.banReason}/>
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

export default User;