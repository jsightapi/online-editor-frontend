# Basic share test cases

## Share from scratch

1. Reload editor with a pure link https://editor.jsight.io.
2. Enter some good JSight code. Check, that documentation is properly rendered.
3. Click on the Share button.
  - Check the link in the popup window and in the browser address line.
  - Copy the link and close the window.
4. Check, that now the Share button is disabled.
5. Move to the case below.

## Share as a new version

1. Open the existing link in an other browser. Check that the code was properly saved.
2. Check that the Share button is disabled.
3. Change the JSight code. Check that the Share button is enabled.
4. Click on `Share` → `Update API`.
5. Check the new link (in the popup window and in the browser address line): the version number must
   be incremented. Copy the link and close the window.
6. Check, that now the Share button is disabled.
7. Move to the case below.

## Share as a new API

1. Open the existing link in an other browser. Check that the code was properly saved.
2. Check that the Share button is disabled.
3. Change the JSight code. Check that the Share button is enabled.
4. Click on Share → Save API.
5. Check the new link (in the popup window and in the browser address line): the key must be new,
   the version number must be `1`. Copy the link and close the window.
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

1. **Bad code.** Repeat all the basic share test cases, but use a bad JSight code, with an error
   inside. Share functionality must work and show a code error any time.
2. **No version.** Repeat 2nd and 3rd basic test cases, but use a share link without version number.
3. **Reset example.** Repeat all the basic share test cases, but check if you can reset an example
   just before sharing a link, and immediately after sharing a link, and immediately after opening a
   link in a new browser.
4. NOT IMPLEMENTED. **Close window.** Repeat all the basic share test cases, but try to close the
   browser window every time after changing a saved JSight code. Browser must show a warning, that
   the code was not saved.
5. NOT IMPLEMENTED. **Previous button.** Repeat all the basic share test cases, but try to press the
   "Previous" browser button every time after changing a saved JSight code. Browser must show a
   warning, that the code was not saved.
6. **Change code.** Repeat all the basic share test cases, but set in the editor another code any
   time before opening a new shared link. For example, use this code:

   ```
   JSIGHT 0.3

   GET /
   ```
7. **Huge code.** Repeat all the basic share test cases, but using the huge JSight code (you can get
   huge projects in the `./load-tests/` folder).
8. **Preview mode.** Repeat all the basic share test cases, but after updating a code, switch to the
   Preview mode, then come back to the Editor mode. Check, that your code updates have not been
   changed.
9. **The same window.** Repeat all the basic share test cases, but do not change the browser and do
   all steps in the same browser window without refresh.
10. **Update not last version.** Get link with several versions (e.g. 3). Try to reproduce basic
    share test cases 2 and 3, but each time use not last version of the link (e.g. 1).
11. **OpenAPI**. Repeat all the basic tests, but each time before pressing the Share button, switch
    to the OpenAPI tab.

# Error cases

1. **Good key, bad version.** Open a link with a good key, but a corrupted version number. The 404
   page must be opened.
2. **Bad key, good version.** Open a link with a good version number, but a corrupted key. The 404
   page must be opened.
3. **Bad key, no version.** Open a link with a bad key, and without a version number. The 404 page
   must be opened.
4. **No connection.** Turn off the connection. Click on the Share button.
   - The popup window with the link must not be shown.
   - In several seconds an error message must emerge.

# Copy link window

1. Check the copy button on the right side of the link.
2. Check the closing cross mark at the top right corner.
3. Check the "Close" button. Check, that the link is not saved in the clipboard.
4. Check the "Copy & Close" button. Check, that link is saved in the clipboard.
5. Check copying a link using Ctrl+C.