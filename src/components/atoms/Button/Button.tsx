import  './Button.scss';
import {FC, ReactNode} from 'react';
import {Link} from "react-router-dom";


interface IRectButton{
    colorType?: "red" | "primary";
    type?: 'link' | 'button' | "htmlLink";
    name: ReactNode;
    className?: string;
    onClick?: ()=>void
    href?:string;
}

const Button:FC<IRectButton> = ({colorType='primary',type="link",name,className='', onClick, href}) => {
    return (
        <div className={`btn ${className} btn--${colorType}`}>
            {
            type === 'htmlLink' ? <a onClick={onClick} className={`btn__wrapper`} target={"_blank"} href={href as string}>{name}</a>
            :
            type === 'button' ?
            <button type={'submit'} onClick={onClick} className={`btn__wrapper`}>
                <span> {name}</span>
            </button>
            :
            <Link onClick={onClick} className={`btn__wrapper`} to={href as string}>
                <span>{name}</span>
            </Link>
            }
        </div>
    );
};

export default Button;