import React from 'react';
import {ErrorMessage, Formik} from "formik";
import {Navigate, useLocation} from 'react-router-dom';
import { valSchemaLogin } from '../helpers/schemas';
import {useDispatchEx, useSelectorEx} from '../hooks/redux';
import {asyncLoginAction} from "../redux/slices/auth/authAction";
import Input from "../components/atoms/Input/Input";
import Button from "../components/atoms/Button/Button";



interface ILogin {
    email: string;
    password: string;
}

const Login = () => {
    const {error} = useSelectorEx(state => state.auth);
   // const token = localStorage.getItem('token');

    const dispatch = useDispatchEx();
    const location = useLocation();
    const loginHandle = (values: ILogin)=>{
        dispatch(asyncLoginAction(values));
    };
    const token = localStorage.getItem('token');
    if(token) return <Navigate to={'/'} state={{from: location}} replace />
    return (

        <section className={'login'}>
            <div className="login__wrap">
                <h1 className="h1">Login</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={valSchemaLogin}
                    onSubmit={loginHandle}
                >
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                        <form onSubmit={handleSubmit} >
                            <div className="login__input">
                                <Input name={'email'}  placeholder="Email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                                <ErrorMessage component={'p'} name="email" />
                            </div>
                            <div className="login__input">
                                <Input name={'password'} type={'password'} onChange={handleChange} onBlur={handleBlur} value={values.password}  placeholder="Password" />
                                <ErrorMessage component={'p'} name="password" />
                                <p style={{color:"#ff0000"}}>{errors.password && touched.password && errors.password}</p>
                                {error && <p style={{color:"#ff0000"}}>{error}</p>}
                            </div>
                            <div className="login__button">
                                <Button type={'button'} name={'Login'} />
                            </div>
                        </form>
                        )}
                </Formik>

            </div>
        </section>
    );
};

export default Login;