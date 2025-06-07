import {FC, ReactNode, useEffect, useRef, useState} from 'react';
import './Select.scss'
import {useTranslation} from "react-i18next";
interface IItem{
    value: string;
    name: string;
}

interface ISelect {
    name?: string;
    placeholder?: string;
    className?: string;
    items: IItem[];
    defaultValue?: string;
    onChange?: (value:string)=> void;
    type?: "default" | "search";
}

const Select:FC<ISelect> = ({type='default',name,placeholder,className,items, defaultValue, onChange= ()=>{}}) => {
    const [open,setOpen] = useState(false);




    const [select, setSelect] = useState('');

    const [filter, setFilter] = useState('');


    const filteredItems = items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelect(defaultValue ? items.filter(item=>item.value === defaultValue)[0]?.name : '')
    }, [defaultValue]);
    const onSelect = (value:IItem)=>{
        onChange(value.value);
        setSelect(value.name);
        setOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setOpen(false); // Закрываем список, если клик вне компонента
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const { t } = useTranslation();
    return (
        <div ref={selectRef} className={`select ${open ? 'active' : ''} ${className ? className : ''}`}>
            <div className={`select__active`} onClick={type !== 'search' ? ()=>setOpen(!open) : (!open ?  ()=>setOpen(true): ()=>{})}>
                <div className={'select__label'}>{placeholder ? placeholder : t('elements.select')}</div>
                <div className={'select__current'}>
                    {open && type === 'search' ?
                        <input
                            type="text"
                            placeholder={`${t('elements.search')}`}
                            className="select__search"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        :
                        <>

                            {select ? select : t('elements.select')}
                        </>}

                </div>
                <div className="select__arrow">
                    <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5 1L6.5 6L1.5 1" stroke="#C3C4C5" strokeWidth="1.06667" strokeLinecap="square"/>
                    </svg>
                </div>
            </div>
            <div className="select__items">
                {filteredItems && filteredItems.map((item,index)=><div key={index} className={`select__item ${item.value === defaultValue ? 'active' : ''}`} onClick={()=>onSelect(item)}>{item.name}</div>)}
            </div>
        </div>
    );
};

export default Select;