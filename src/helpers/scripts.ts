
import htmlToDraft from "html-to-draftjs";

import { ContentState, EditorState } from 'draft-js';


export function getTimeDate(dateString: string) {
    const date = new Date(dateString);
    return ("0" + (date.getDate())).slice(-2) + '.' +
        ("0" + (date.getMonth() + 1)).slice(-2) + '.' +
        date.getFullYear() + '/' +
        ("0" + (date.getHours())).slice(-2) + ':' +
        ("0" + (date.getMinutes())).slice(-2);
}


export const htmlToDraftBlocks = (html:string) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    return EditorState.createWithContent(contentState);
};





export function getRandomColor(name: string | undefined): string {
    const initial = name?.charAt(0).toUpperCase();
    const colors: string[] = [
        '#e8684d',
        '#7faad2',
        '#e8b34d', // purple
        '#0f524e', // deep purple

    ];
    const index: number = initial ? initial.charCodeAt(0) % colors.length : 0;
    return colors[index];
}

export function getColorById(num: number): any {
    const orderStatuses: { [key: number]: any } = {
        1: { color: 'rgba(151, 151, 151, 0.13)', textColor: "#8b8b8b" },
        2: { color: 'rgba(255, 115, 13, 0.13)', textColor: "#ff730d" },
        3: { color: 'rgba(42, 185, 95, 0.13)', textColor: "#2ab95f" },
        4: { color: 'rgba(39, 125, 255, 0.13)', textColor: "#277dff" },
        5: { color: 'rgba(209, 0, 0, 0.13)', textColor: "#d10000" }
    };
    return orderStatuses[num] ? orderStatuses[num] : { name: 'error', color: '#808080', textColor: "#fffffff" };
}

export const toastSetting: any = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}