import {ChangeEvent,FocusEvent, FC} from 'react';
import './Input.scss'
interface IInput {
    className?: string;
    classError?: string;
    name?: string;
    type?: "text" | "password" | "email" | "hex";
    placeholder: string;
    message?: string | undefined | false | any;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    value?: string | number;
    disabled?: boolean;
}
const Input:FC<IInput> = ({disabled= false,name,className,classError,type="text",placeholder,onBlur,onChange,value,message}) => {
    return (
        <div className={`input ${className ? className: ""}`}>
            <label>
                <input disabled={disabled} placeholder={' '} type={type === 'hex' ? 'text' : type} onChange={onChange} onBlur={onBlur} name={name} value={value} />
                <span className="input__label">{placeholder}</span>
            </label>
        </div>
    );
};

export default Input;