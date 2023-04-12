import { privateRequest } from './apiRequest';

const downloadExcelFile = async (requestId, searchTerm) => {
  const response = await privateRequest.get(`/api/download/${requestId}`, { responseType: 'blob' });

  const blob = await response.data;

  if (blob) {
    const fileName = `${searchTerm}.xlsx`;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a); // append the element to the dom
    a.click();
    a.remove(); // afterwards, remove the element
  }
};

export default downloadExcelFile;
