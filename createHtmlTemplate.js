// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

(async () => {
  const scriptText = fs.readFileSync('build/static/js/export-main.js');
  const cssText = fs.readFileSync('build/static/css/export-main.css');

  fs.writeFile(
    'build/index-template.html',
    `<!DOCTYPE html>
        <html lang="en">
          <head>
            <base href=".">
            <meta charset="utf-8"/>
            <link rel="icon" href="https://editor.jsight.io/favicon.png'}"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="theme-color" content="#000000"/>
            <meta name="description" content="Welcome to JSight"/>
            <link rel="apple-touch-icon-precomposed" sizes="512x512" href="https://editor.jsight.io/apple-touch-icon-512x512.png" />
            <link rel="apple-touch-icon-precomposed" sizes="180x180" href="https://editor.jsight.io/apple-touch-icon-152x152.png" />
            <meta name="application-name" content="&nbsp;"/>
            <meta name="msapplication-TileColor" content="#FFFFFF"/>
            <meta name="msapplication-TileImage" content="https://editor.jsight.io/mstile-144x144.png"/>
        
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
            <link rel="manifest" href="https://editor.jsight.io/manifest.json" />
            <title>JSight Online Editor</title>
            <script>
                window.isExport = true;
                var jdoc = {{ jdoc }}
            </script>
            <script type="module">
                ${scriptText}
            </script>
            ${cssText ? `<style>${cssText}</style>` : ''}
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>`,
    function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    }
  );
})();
