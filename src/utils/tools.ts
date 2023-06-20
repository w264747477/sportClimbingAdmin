export const toDownloadFile = (response) => {
  const blob = new Blob([response.data]);
  let link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  let name;
  const contentDisposition = response.headers['content-disposition'];
  name = contentDisposition.split('filename=')[1];
  link.download = decodeURIComponent(name);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}
