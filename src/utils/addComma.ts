// export const addComma = (str: string) => {
//     if (!str) return '0';

//     str = String(str);

//     if (str.trim().length === 0) {
//         return '0';
//     }

//     str = str.trim().replace(',', '');
//     let commaAdded = parseFloat(str).toLocaleString('en-US');

//     const indexOfDotInOriginalString = str.indexOf('.');

//     if (indexOfDotInOriginalString !== -1) {
//         const indexOfDotInCommaAdded = commaAdded.indexOf('.');
//         commaAdded = indexOfDotInCommaAdded === -1? commaAdded : commaAdded.substring(0, indexOfDotInCommaAdded);
//         commaAdded = commaAdded + str.substring(indexOfDotInOriginalString);
//     }

//     return commaAdded;
// };

// export const removeComma = (str: string) => {
//     if (!str) return '0';
//     str = str.toString();
//     return str.replace(/,/g, '');
// };

// export const formatValueIfNumber = (value: any) => {
//     const stringValue = String(value);
//     const numerifiedValue = parseFloat(stringValue);

//     if (isNaN(numerifiedValue) || stringValue.includes('-') || stringValue.includes('_')) {
//         return value;
//     } else {
//         return addComma(stringValue);
//     }
// };

export const addComma = (str: string) => {
    if (!str) return '0';

    str = String(str);

    if (str.trim().length === 0) {
        return '0';
    }

    str = str.trim().replace(',', '');

    let isNegative = false;
    if (str.startsWith('-')) {
        isNegative = true;
        str = str.slice(1); // Remove the negative sign for processing
    }

    let commaAdded = parseFloat(str).toLocaleString('en-US');

    const indexOfDotInOriginalString = str.indexOf('.');

    if (indexOfDotInOriginalString !== -1) {
        const indexOfDotInCommaAdded = commaAdded.indexOf('.');
        commaAdded =
            indexOfDotInCommaAdded === -1
                ? commaAdded
                : commaAdded.substring(0, indexOfDotInCommaAdded);
        commaAdded = commaAdded + str.substring(indexOfDotInOriginalString);
    }

    return isNegative ? '-' + commaAdded : commaAdded;
};

export const removeComma = (str: string) => {
    if (!str) return '0';
    str = str.toString();
    return str.replace(/,/g, '');
};

export const formatValueIfNumber = (value: any) => {
    const stringValue = String(value).replace(/_/g, ''); // Remove underscores
    const numerifiedValue = parseFloat(stringValue);

    if (isNaN(numerifiedValue)) {
        return value;
    } else {
        return addComma(stringValue);
    }
};
