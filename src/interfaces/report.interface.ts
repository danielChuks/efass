export interface ReportData {
    bank_code: string;
    bank_name: string;
    return_code: string;
    return_name: string;
    serial_number: number;
    sheet_number: string;
}
export interface Report {
    data: ReportData[];
    responseCode: number;
    responseMessage: string;
    tableSheet: ReportData[];
}
