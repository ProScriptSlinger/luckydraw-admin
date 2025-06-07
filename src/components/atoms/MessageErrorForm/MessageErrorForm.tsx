import './MessageErrorForm.scss';

import {FC, ReactNode} from 'react';

interface IMessageErrorForm{
    error: ReactNode;
}

const MessageErrorForm:FC<IMessageErrorForm> = ({error}) => {
    return (
        <>
            {error && <p style={{color:"#ff0000"}}>{error}</p>}
        </>
    );
};

export default MessageErrorForm;