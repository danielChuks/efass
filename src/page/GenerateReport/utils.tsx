 export const QuarterlyDateFormatter = (year: any, quarterDate: any): string => {
    const formattedDateString = `${year}-${quarterDate}`;
    return formattedDateString;
};

export const monthlyDateFormatter = (year: any, month?: any): string => {
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDateString = `${year}-${formattedMonth}-${'01'}`;
    return formattedDateString;
};
