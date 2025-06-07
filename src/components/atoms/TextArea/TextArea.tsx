import {ChangeEvent,FocusEvent, FC} from 'react';
import './TextArea.scss'
interface IInput {
    className?: string;
    classError?: string;
    name: string;
    placeholder: string;
    message?: string | undefined | false | any;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: any) => void;
    value?: string;
}
const TextArea:FC<IInput> = ({name,className,classError,placeholder,onBlur,onChange,onKeyDown,value,message}) => {
    return (
        <div className={`textarea ${className ? className: ""}`}>
            <label>
                <textarea placeholder={' '} onKeyDown={onKeyDown} onChange={onChange} onBlur={onBlur} name={name} value={value} />
                <span className="textarea__label">{placeholder}</span>
            </label>
        </div>
    );
};

export default TextArea;