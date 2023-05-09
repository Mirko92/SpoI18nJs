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
  
  // Extract header from first object in array
  header = Object.keys(array[0]).join(',') + '\n';
  csv += header;

  // Extract data from each object and append to csv string
  array.forEach((obj: any) => {
    const row = Object.values(obj).join(',') + '\n';
    csv += row;
  });

  return csv;
}
