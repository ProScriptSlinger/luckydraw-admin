import  './ButtonRect.scss';
import {FC, ReactNode} from 'react';
import {Link} from "react-router-dom";


interface IRectButton{
    colorType?: "red" | "green";
    type?: 'link' | 'button' | "htmlLink";
    name: ReactNode;
    className?: string;
    onClick?: ()=>void
    href?:string;
    title?: string;
}

const ButtonRect:FC<IRectButton> = ({title='',colorType='green',type="link",name,className='', onClick, href}) => {
    return (
        <div title={title} className={`btn-rect ${className} btn-rect--${colorType}`}>
            {
            type === 'htmlLink' ? <a onClick={onClick} className={`btn-rect__wrapper`} target={"_blank"} href={href as string}>{name}</a>
            :
            type === 'button' ?
            <button type={'submit'} onClick={onClick} className={`btn-rect__wrapper`}>
                <span> {name}</span>
            </button>
            :
            <Link onClick={onClick} className={`btn-rect__wrapper`} to={href as string}>
                <span>{name}</span>
            </Link>
            }
        </div>
    );
};

export default ButtonRect;