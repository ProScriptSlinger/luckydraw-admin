import {FC} from 'react';

interface IErrorMessage {
    message?:any
}

const ErrorMessage:FC<IErrorMessage> = ({message=''}) => {
    return (
        message ? <p style={{color:"#ff0000"}}>{message}</p> : <></>
    );
};

export default ErrorMessage;