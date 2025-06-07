import React, {FC, ReactNode, useState} from 'react';

import './HeaderPanel.scss'
import ButtonRect from "../../atoms/ButtonRect/ButtonRect";
import PlusIcon from "../../icons/PlusIcon";
import SaveIcon from "../../icons/SaveIcon";
import CloseIcon from "../../icons/CloseIcon";
import ModalMini from "../../atoms/ModalMini/ModalMini";

interface IHeaderPanel{
    title: ReactNode;
    addUrl?: string;
    onSave?: ()=>void;
    onDelete?: ()=>void;
    additionalButtons?: ReactNode;
}

const HeaderPanel:FC<IHeaderPanel> = ({title,addUrl,onSave,onDelete,additionalButtons}) => {
    const [openModal, setOpenModal] = useState(false);

    const onDeleteEx = ()=>{
        if(onDelete) onDelete();
        setOpenModal(false)
    }

    return (
        <div className={'header-panel'}>
            <div className="header-panel__title">{title}</div>
            <div className="header-panel__controls">
                {onDelete ? <>
                    <ModalMini active={openModal} onAccept={onDeleteEx} onCancel={()=>setOpenModal(false)} onClose={()=>setOpenModal(false)} header={'Видалити'}>
                        Ви дійсно бажаєте видалити цей товар?
                    </ModalMini>
                    <ButtonRect onClick={()=>setOpenModal(true)} colorType={'red'} name={<CloseIcon/>}/>
                </>
                 : ""}
                {additionalButtons}
                {addUrl ? <ButtonRect title={'Add'}  href={addUrl} name={<PlusIcon/>} />: ""}
                {onSave ? <ButtonRect title={'Save'}  className={'header-panel__white'} onClick={onSave} href={'#'} name={<SaveIcon/>} />: ""}

            </div>
        </div>
    );
};

export default HeaderPanel;