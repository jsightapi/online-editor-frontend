import {useContext} from 'react';
import {JDocContext} from 'store';

export function useExport() {
  const jdocData = useContext(JDocContext);

  const renderHtml: () => Promise<string | null> = async () => {
    if (process.env.NODE_ENV === 'production') {
      const hostName = window.location.protocol + '//' + window.location.host;
      const htmlLink = hostName + '/index-template.html';

      const html = await fetch(htmlLink).then(async (response) => {
        if (response.ok) {
          return await response.text();
        }
        return '';
      });

      return html
        .replace('{{ jdoc }}', JSON.stringify(jdocData))
        .replaceAll('../../', `${hostName}/`);
    } else {
      console.log('Export does not work in development mode');
      return null;
    }
  };

  const saveHtml = async () => {
    const documentHtml = await renderHtml();
    if (documentHtml) {
      const htmlContent = [documentHtml];
      const bl = new Blob(htmlContent, {type: 'text/html'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(bl);
      a.download = 'jsight-document.html';
      a.hidden = true;
      document.body.appendChild(a);
      a.click();
    }
  };

  return [saveHtml];
}
