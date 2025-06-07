import {FC} from 'react';

import "./PreloaderContent.scss"

interface IPreloader {
    type?: "relative" | "absolute"
}

const PreloaderContent:FC<IPreloader> = ({type="absolute"}) => {
    return (
        <div className={`preloader-content ${type ? type : ""}`}>
            <div className="loader"></div>
        </div>
    );
};

export default PreloaderContent;