import {FC} from 'react';

import './Placeholder.scss'

interface IPlaceholder {
    className?: string;
    header:string;
    message:string;
}

const Placeholder:FC<IPlaceholder> = ({className='',header,message}) => {
    return (
        <div className={`placeholder ${className}`}>
            <i className="fa fa-shopping-cart" aria-hidden="true"/>
            <b>{header}</b>
            <p>{message}</p>
        </div>
    );
};

export default Placeholder;
