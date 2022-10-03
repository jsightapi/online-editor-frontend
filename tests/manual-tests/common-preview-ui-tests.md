# Run all the tests for editor view

1. Annotations tests
2. Code View Tests.
3. Directive TYPE tests.
4. Frontend load tests.
5. HTTP-method tests.
6. INFO and SERVER tests.
7. Common Syntax tests.
8. Markdown tests.
9. Details card tests.
10. Table View tests.
11. Settings tests.

# Heading tests

1. Check the API title at the preview heading pane.
  - Check preview heading pane when title is empty.
2. Check "Back to editor" button.

# Contents Sidebar tests

1. Check positioning after item click.
2. Check that after click on some content item you can refresh page by Ctrl+Shift+R and editor will
   not suspend. Especially check it on paths with parameters, e. g. `/cats/{id}`.
3. Check that Contents works fine when there are a huge amount of items (vertical scroll must work).

# Logo

1. Check that "Powered by JSight" panel click directs to https://jsight.io/.

# Code Editor and Preview

1. Enter some long code in the code editor.
2. Scroll down the editor panel.
3. Switch to the preview mode.
4. Come back to the editor mode.
5. Check, that the vertical scroll position of the code editor stayed the same.

## Virtual Scroll

### Check smooth scroll up and down

### Check scroll up and down using Pg Up, Pg Down, Cursor Down Arrow, Cursor Up Arrow

### Check support window

1. Open some item in contents sidebar. Check support window then (Ask a question, report a bug).

### Schema section must remember its state

1. Change something in doc field, e. g.:
   - schema section mode (e. g. Expand Types, Table View, Code View);
   - expand some type;
   - switch to some method (e. g. from GET to POST).
2. Scroll up or down and come back.
3. Check that schema section is in the same state as it was before scroll.

### Servers section must remember its state

1. Open Servers section.
2. Scroll down deeply and come back.
3. Check Servers section is still opened.

### Details card

1. Check that you can close details card using either cross-mark near the top right corner of card
   or with the cross-mark at the top right corner of rendered document panel.
2. Check that these two cross-marks (see above) do not interfere each other when scrolling document
   up and down.