import {useContext} from 'react';
import {find} from 'lodash';
import {JDocContext} from 'store';

export function useExport() {
  const jdocData = useContext(JDocContext);

  const renderHtml: () => Promise<string | null> = async () => {
    const styles = document.querySelectorAll('style');
    let stylesResult = '';
    for (let i = 0; i < styles.length; ++i) {
      stylesResult += `<style>${styles[i].innerHTML}</style>`;
    }

    const linkStyles = document.querySelectorAll('link');
    const linkStyle = find(linkStyles, (style) => style.href.indexOf('static/css') !== -1)?.href;
    const hostName = window.location.protocol + '//' + window.location.host;

    let script = '';
    if (process.env.NODE_ENV !== 'production') {
      const scripts = document.querySelectorAll('script');
      script = find(scripts, (script) => script.src.indexOf('static/js') !== -1)?.src || '';
    } else {
      script = hostName + '/static/js/export-main.js';
    }

    if (script) {
      const scriptText = await fetch(script).then(async (response) => {
        if (response.ok) {
          return await response.text();
        }
      });

      let cssText: string | undefined = '';
      if (linkStyle) {
        cssText = await fetch(linkStyle).then(async (response) => {
          if (response.ok) {
            return await response.text();
          }
        });
      }

      return `<!DOCTYPE html>
        <html lang="en">
          <head>
            <base href=".">
            <meta charset="utf-8"/>
            <link rel="icon" href="${hostName + '/favicon.png'}"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="theme-color" content="#000000"/>
            <meta name="description" content="Welcome to JSight"/>
            <link rel="apple-touch-icon-precomposed" sizes="512x512" href="${
              hostName + '/apple-touch-icon-512x512.png'
            }"/>
            <link rel="apple-touch-icon-precomposed" sizes="180x180" href="${
              hostName + '/apple-touch-icon-152x152.png'
            }"/>
            <meta name="application-name" content="&nbsp;"/>
            <meta name="msapplication-TileColor" content="#FFFFFF"/>
            <meta name="msapplication-TileImage" content="${hostName + '/mstile-144x144.png'}"/>
        
            <meta property="og:title" content="JSight — the Best API documentation language and tool"/>
            <meta property="og:description" content="Are you fed up of OpenAPI? JSight is the simplest, user-friendly, compact language for description of REST API. Feel the difference compared to Swagger!"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://editor.jsight.io"/>
            <meta property="og:image" content="https://editor.jsight.io/oggImage.png"/>
            <meta property="og:image:type" content="image/png">
            <meta property="og:image:width" content="1200">
            <meta property="og:image:height" content="720">
            <meta property="og:site_name" content="JSight.io">
            <meta property="fb:app_id" content="609425093466922">
        
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:site" content="@jsightapi">
            <meta name="twitter:creator" content="@jsightapi">
            <link rel="manifest" href="${hostName + '/manifest.json'}"/>
            <title>JSight Online Editor</title>
            <script>
                window.isExport = true;
                var jdoc = ${JSON.stringify(jdocData)}
            </script>
            <script type="module">
                ${scriptText}
            </script>
            <link href="${linkStyle}" rel="stylesheet">
            ${cssText ? `<style>${cssText}</style>` : ''}
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>
      `;
    }
    return null;
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
