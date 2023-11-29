import { BASEAPI_EXTENSION } from '../../enums';
export const QuarterlyDateFormatter = (year: any, quarterDate: any): string => {
    const formattedDateString = `${year}-${quarterDate}`;
    return formattedDateString;
};

export const monthlyDateFormatter = (year: any, month?: any): string => {
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDateString = `${year}-${formattedMonth}-${'01'}`;
    return formattedDateString;
};

export const getCurrentDateAndTime = () => {
    const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const currentDate = new Date();

    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();
    const year = currentDate.getFullYear();

    let hours = currentDate.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert to 12-hour format
    const minutes = currentDate.getMinutes();

    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year} ${hours}:${minutes}${ampm}`;

    return formattedDate;
};

export const removeFirstFiveCharacters = (sheetName: string) => {
    // Check if the input string is long enough
    if (sheetName.length > 5) {
        // Use substring to remove the first five characters
        return sheetName.substring(5);
    } else {
        // Handle cases where the string is too short
        console.error('Input string is too short!');
        return null; // or any other appropriate value
    }
};

export const replaceDot = (sheetName: string) => {
    const replacedString = sheetName.replace('.', '_');
    return replacedString;
};

export const specialReportSheets = [
    'MDFIR292.1',
    'MDFIR292.2',
    'MDFIR292.3',
    'MDFIR371.1',
    'MDFIR371.2',
    'MDFIR371.3',
    'MDFIR400.1',
    'MDFIR400.2',
    'MDFIR400.3',
    'MDFIR400.4',
    'MDFIR400.5',
    'MDFIR400.6',
    'MDFIR400.8',
    'MDFIR400.10',
    'MDFIR400.11',
    'MDFIR400.12',
    'MDFIR400.13',
    'MDFIR400.14',
    'MDFIR400.15',
    'MDFIR450.1',
    'MDFIR450.2',
    'MDFIR450.3',
    'MDFIR450.4',
    'MDFIR450.5',
    'MDFIR450.6',
    'MDFIR450.8',
    'MDFIR450.9',
    'MDFIR450.10',
    'MDFIR450.11',
    'MDFIR450.12',
    'MDFIR450.13',
    'MDFIR450.14',
    'MDFIR450.15',
    'QDFIR292.1',
    'QDFIR292.2',
    'QDFIR292.3',
    'QDFIR371.1',
    'QDFIR371.2',
    'QDFIR371.3',
    'QDFIR400.1',
    'QDFIR400.2',
    'QDFIR400.3',
    'QDFIR400.4',
    'QDFIR400.5',
    'QDFIR400.6',
    'QDFIR400.8',
    'QDFIR400.10',
    'QDFIR400.11',
    'QDFIR400.12',
    'QDFIR400.13',
    'QDFIR400.14',
    'QDFIR400.15',
    'QDFIR450.1',
    'QDFIR450.2',
    'QDFIR450.3',
    'QDFIR450.4',
    'QDFIR450.5',
    'QDFIR450.6',
    'QDFIR450.8',
    'QDFIR450.9',
    'QDFIR450.10',
    'QDFIR450.11',
    'QDFIR450.12',
    'QDFIR450.13',
    'QDFIR450.14',
    'QDFIR450.15',
];

//columns that need to be separated by comma
export const commaSeparatedColumns = [
    'from_1_to_100000',
    'from_100001_to_200000',
    'from_200001_to_500000',
    'over_500000',
    'current_month',
    'year_to_date',
    'value_1',
    'number_1',
    'number_2',
    'value_2',
    'amount_claimed_1',
    'amount_claimed_2',
    'amount_refunded_1',
    'amount_refunded_2',
    'principal_granted',
    'principal_outstanding',
    'upfront_interest',
    'interest_payable',
    'unpaid_principal_interest',
    'amount',
    'amount_invested',
    'fair_value_gain_or_loss',
    'notional_amount',
    'carrying_value',
    'upfront_interest_received',
    'accrued_interest_receivable',
    'upfrontInterestReceived',
    'accruedInterestReceivable',
    'carrying_value_unquoted_eq_inv',
    'fair_value_gains',
    'impairment',
    'carrying_value_unquoted_eq_inv',
    'quoted_1',
    'unquoted_1',
    'quoted_2',
    'unquoted_2',
    'quoted_3',
    'unquoted_3',
    'net_amount',
    'other_investments',
    'purchase_cost',
    'current_book_value',
    'current_market_value',
    'revaluation_gain_or_loss',
    'approved_limit',
    'amount_drawn',
    'unutilised_credit',
    'outstanding_credit',
    'debt_instruments',
    'total',
    'amount_recovered',
    'actual_loss',
    'amount_involved',
    'total_credit',
    'principal_payment_due_and_unpaid',
    'accrued_interest_unpaid',
    'total_outstanding_credits',
    'watch_list',
    'substandard',
    'doubtful',
    'very_doubtful',
    'lost',
    'dfi_provision',
    'total_impaired_credits',
    'total_other_assets',
    'total_non_other_performing_assets',
    'total_value_of_contingent_liability',
    'total_impaired_contingent_liability',
    'impairment',
    'loan_or_facilities_type',
    'aggregate_amt_principal',
    'aggregate_amt_accrued_interest',
    'aggregate_amt_total_outstanding',
    'amount_granted',
    'total_outstanding_credit',
    'performing',
    'non_performing',
    'value',
    'investment',
    'liabilities',
    'total_exposure',
    'amount_refunded_2',
];
