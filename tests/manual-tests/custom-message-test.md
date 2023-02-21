# Custom Message test

1. Create custom message, using some specific regex (add it to the file
   https://jsightapi.github.io/online-editor-custom-messages.json).
2. Check, that the editor does not show the message if the regex does not match the URL.
3. Check, that the editor shows the message if the regex matches the URL.
4. Check, that the "Cookies consent" window is opened before the custom message window.
5. Press the "Show later" button. Check, that the message appears again after the editor reload.
6. Press the "Close forever" button. Check, that the message doesnot appear again after the editor reload.
7. Check, that the editor works fine when REACT_APP_CUSTOM_MESSAGE_URL .env parameter is not defined.