# Basic share test cases

## Share from scratch

1. Reload editor with a pure link https://editor.jsight.io.
2. Enter some good JSight code. Check, that documentation is properly rendered.
3. Click on the Share button.
  - Check the link in the popup window and in the browser address line.
  - Copy the link.
4. Check, that now the Share button is disabled.
5. Open the link in an other browser. Check that the code was properly saved.

## Share as a new version

1. Open an existing link.
2. Check that the Share button is disabled.
3. Change the JSight code. Check that the Share button is enabled.
4. Click on Share → Update API.
5. Check the new link (in the popup window and in the browser address line): the version number must
   be incremented. Copy the link.
6. Check, that now the Share button is disabled.
7. Open the new link in an other browser. Check that the new code was properly saved.

## Share as a new API

1. Open an existing link.
2. Check that the Share button is disabled.
3. Change the JSight code. Check that the Share button is enabled.
4. Click on Share → Save API.
5. Check the new link (in the popup window and in the browser address line): the key must be new,
   the version number must be `1`. Copy the link.
6. Check, that now the Share button is disabled.
7. Open the new link in an other browser. Check that the new code was properly saved.

# Share link without version number

1. Create a share link — link #1.
2. Update this link — get link #2.
3. Remove from the last link version number. Open this link without version number.
4. Check, that editor shows an API, that was saved under the link #2.

# Sharing together with Contents tab

1. Repeat all the basic share test cases, but before pressing the Share button, click on some item
   in Contents tab.
2. Open some shared link. Click on some item in the Contents tab. Copy the link in the browser
   address line (with the item path after the `#` symbol). Try to open this big link in another
   browser.
3. Make the previous test, but corrupt item path after the `#` symbol. Browser should open this link
   without errors.

# Extended share test cases

1. Repeat all the basic share test cases, but use a bad JSight code, with an error inside. Share
   functionality must work and show a code error any time.
2. Repeat 2nd and 3rd basic test cases, but use a share link without version number.
3. Repeat all the basic share test cases, but check if you can reset an example immediately after
   sharing a link and immediately after opening a link in a new browser.
4. Repeat all the basic share test cases, but try to close the browser window every time after
   changing a saved JSight code. Browser must show a warning, that the code was not saved.
5. Repeat all the basic share test cases, but try to press the "Previous" browser button every time
   after changing a saved JSight code. Browser must show a warning, that the code was not saved.

# Error cases

1. Open a link with a good key, but a corrupted version number. The 404 page must be opened.
2. Open a link with a good version number, but a corrupted key. The 404 page must be opened.
3. Open a link with a bad key, and without a version number. The 404 page must be opened.
4. Turn off the connection. Click on the Share button. In several seconds an error message must
   emerge.

# Copy link window

1. Check the copy button on the right side of the link.
2. Check the closing cross mark at the top right corner.
3. Check the "Close" button. Check, that the link is not saved in the clipboard.
4. Check the "Copy & Close" button. Check, that link is saved in the clipboard.
5. Check copying a link using Ctrl+C.