import React, {FC, useEffect, useState} from 'react';

import './Switch.scss'
interface SwitchProps {
    className?: string;
    label: string;
    isChecked?: boolean;
    onChange?: (isChecked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({className, label, isChecked=false, onChange=()=>{} }) => {
    const [checked, setChecked] = useState<boolean>(isChecked);

    useEffect(() => {
        setChecked(isChecked)
    }, [isChecked]);

    const handleChange = () => {
        setChecked(!checked);
        onChange(!checked);
    };

    return (
        <div className={`switch ${className ? className : ""}`}>

            <input name={label} checked={checked} onChange={handleChange} type="checkbox" />
            <label onClick={handleChange} htmlFor={label}>
                <div className="switch__marks">
                    <div className="switch__mark-active">

                    </div>
                    <div className="switch__mark-disabled"></div>
                </div>
            </label>
        </div>
    );
};

export default Switch;