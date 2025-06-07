import { FC, useRef, useEffect } from 'react';
import './SelectMenu.scss';

type ISelectMenuItem = {
    name: string;
    value: string;
}

interface ISelectMenu {
    currentItem: any;
    items: ISelectMenuItem[];
    onChange?: (value: string) => void;
}

const SelectMenu: FC<ISelectMenu> = (
    {
        currentItem = null,
        items = [],
        onChange = () => {}
    }
) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const handleWheel = (e: WheelEvent) => {
            // Проверяем, находится ли курсор над контейнером
            if (e.deltaY === 0) return;
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY;
        };

        scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            scrollContainer.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div className='select-menu' ref={scrollContainerRef}>
            {
                items.length
                    ? items.map((item, index) => (
                        <div
                            key={index}
                            className={`select-menu__item ${currentItem === item.value ? "active" : ""}`}
                        >
                            <a onClick={() => onChange(item.value)}>{item.name}</a>
                        </div>
                    ))
                    : null
            }
        </div>
    );
};

export default SelectMenu;
