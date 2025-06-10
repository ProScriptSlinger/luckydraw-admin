import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.scss';

const LanguageSelector: FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('lang', lng);
    };

    return (
        <div className="language-selector">
            <button
                className={`language-selector__btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
            >
                EN
            </button>
            <button
                className={`language-selector__btn ${i18n.language === 'ru' ? 'active' : ''}`}
                onClick={() => changeLanguage('ru')}
            >
                RU
            </button>
        </div>
    );
};

export default LanguageSelector; 