import { ILocale } from "../webparts/spoI18N/models/ILocale";

export function downloadCSV(csv: string, filename: string) {
  var blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
  var url = URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function convertObjectToCSV(objArray: any[]) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let header = '';
  let csv = '';
  
  const keys = Object.keys(array[0])
  // Extract header from first object in array
  header = keys.join(',') + '\n';
  csv += header;

  // Extract data from each object and append to csv string
  array.forEach((obj: any) => {
    const values = keys.reduce( 
      (a, k) => [ ...a, obj[k] || "" ], 
      []
    );

    const row = values.join(',') + '\n';
    csv += row;
  });

  return csv;
}

export class CsvWriter {
  private localesInfo: ILocale[];
  private locales    : string[];
  private csvResult  : any[] = [];

  get result() {
    return this.csvResult;
  }

  constructor(localesInfo: ILocale[]) {
    this.localesInfo = localesInfo;
    this.locales = localesInfo.map(li => li.label);
  }

  private getHeader(locales: ILocale[]) {
    const header: any = {
      key: 'ExportedLanguage'
    };

    for(const locale of locales) {
      const { label: lang, code } = locale;

      const commentKey = `Comment.${lang}`;

      header[lang] = code;
      header[commentKey] = commentKey;
    }

    return header;
  }

  private newRow(key: string, value: string, isMultiLine: boolean) {
    const comment = isMultiLine 
      ? "Multiple lines of text"
      : "Single line of text";

    const result: any = {
      key
    };

    for(const locale of this.locales) {
      const commentKey = `Comment.${locale}`;

      result[commentKey] = comment;
      result[locale]     = value;
    }

    return result;
  }

  addHeader() {
    this.csvResult.push(this.getHeader(this.localesInfo))
  }

  addRow(key: string, value: string, isMultiLine: boolean = false) {
    this.csvResult.push(this.newRow(key, value, isMultiLine));
  }


}
