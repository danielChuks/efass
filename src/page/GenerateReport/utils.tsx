 export const QuarterlyDateFormatter = (year: any, quarterDate: any): string => {
    const formattedDateString = `${year}-${quarterDate}`;
    return formattedDateString;
};

export const monthlyDateFormatter = (year: any, month?: any): string => {
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDateString = `${year}-${formattedMonth}-${'01'}`;
    return formattedDateString;
};

// downloadXmlReports(): void {
//     let selectedReport = [];
//     this.tableData.forEach((e) => {
//       selectedReport.push(e.return_code)
//  });
//  //let endpoint = `${environment.baseUrl}/download/MDFIR1200`;
//     let endpoint = `${environment.baseUrl}/download/`;
//     selectedReport.filter((item) => !item.startsWith("QDFIR400"))
//     .filter((item) => !item.startsWith("QDFIR450"))
//     .filter((item) => !item.startsWith("MDFIR450"))
//     .filter((item) => !item.startsWith("MDFIR400"))
//     .forEach((item) => {
//       // console.log(item);
//       endpoint += item;
//       endpoint += ',';
//     });

//     console.log(endpoint)

//     if (this.reportService.getReportGroup() === "Q") {
//       endpoint += "QDFIR400";
//       endpoint += ", QDFIR450";

//     }

//     if (this.reportService.getReportGroup() === "M") {
//       endpoint += "MDFIR400";
//       endpoint += ",MDFIR450";
//     }

//     console.log(endpoint);
//     this.download(endpoint)
//       .subscribe(blob => {
//         const a = document.createElement('a');
//         const objectUrl = URL.createObjectURL(blob);
//         a.href = objectUrl;
//         a.download = 'Reports downloaded for ' + this.reportSelectedDate + '.zip';
//         a.click();
//         URL.revokeObjectURL(objectUrl);
//       });
//   }

//  download(url: string): Observable<Blob> {
//     return this.http.get(url, {
//       responseType: 'blob'
//     });
//   }


// postReportDate(date: any): Observable<any> {
//     return  this.http.post(`${environment.baseApi}/` + 'date', date, {responseType: 'text'});
//    }



//    postCbnDate(date: any): Observable<any> {
//     return  this.http.post(`${environment.baseApi}/` + 'cbnDate', date, {responseType: 'text'});
//    }



//   // tslint:disable-next-line:typedef
//   deleteReportHistory(id: any) {
//     return this.http.delete<any>(`${environment.baseApi}/` + 'activity/' + id);
//   }
