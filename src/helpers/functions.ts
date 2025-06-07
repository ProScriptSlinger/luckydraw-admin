export function replaceEnterWithBr(text:string) {
    return text.replace(/\n/g, '<br/>');
}

export function replaceBrWithEnter(text:string) {
    return text.replace(/<br\s*\/?>/g, '\n');
}

function transliterate(text: string): string {
    const cyrillicToLatinMap: { [key: string]: string } = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh', 'з': 'z',
        'и': 'i', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
        'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
        'ю': 'yu', 'я': 'ya', 'ь': '', 'ъ': '', 'э': 'e', 'ы': 'y',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Ґ': 'G', 'Д': 'D', 'Е': 'E', 'Є': 'Ye', 'Ж': 'Zh', 'З': 'Z',
        'И': 'I', 'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P',
        'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
        'Ю': 'Yu', 'Я': 'Ya', 'Ь': '', 'Ъ': '', 'Э': 'E', 'Ы': 'Y'
    };

    return text.split('').map(char => cyrillicToLatinMap[char] || char).join('');
}

export function generateSlug(text:string) {
    return transliterate(text)
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')           // Заменяет пробелы на дефисы
        .replace(/[^\w\-]+/g, '')       // Удаляет все не буквенно-цифровые символы кроме дефисов
        .replace(/\-\-+/g, '-')         // Удаляет лишние дефисы
        .replace(/^-+/, '')             // Удаляет дефисы в начале строки
        .replace(/-+$/, '');            // Удаляет дефисы в конце строки
}

export function calculatePercentageGrowth(dailyIncrease:number, total:number) {
    let percentageGrowth = (dailyIncrease / total) * 100;
    return percentageGrowth.toFixed(2); // Округляем до 2 знаков после запятой
}



