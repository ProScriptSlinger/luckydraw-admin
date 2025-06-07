import {FC, ReactNode} from 'react';
import CloseIcon from "../../icons/CloseIcon";
import Button from "../Button/Button";

import './ModalMini.scss'

interface IModal {
    header?: ReactNode;
    children: ReactNode;
    active: boolean;
    onAccept?: () => void;
    onCancel?: () => void;
    onClose: () => void;
}

const ModalMini:FC<IModal> = ({active,header,children,onClose,onAccept,onCancel}) => {
    return (
        <div className={`modal-mini ${active ? "active": ""}`}>
            <div className="modal-mini__wrap">
                <div className="modal-mini__close" onClick={onClose}><CloseIcon/></div>
                <div className="modal-mini__title">{header}</div>
                <div className="modal-mini__body">
                    <div className="modal-mini__description">
                        {children}
                    </div>
                    <div className="modal-mini__content">
                        <div className="modal-mini__info">
                            <div className="modal-mini__buttons">
                                <div className="modal-mini__confirm">
                                    <Button onClick={onAccept} className={'btn--primary modal__btn'} name={'Так'}/>
                                    <Button onClick={onCancel} className={'btn--primary modal__btn'} name={'Скасувати'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalMini;