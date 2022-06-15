# UI tests

## Local storage

1. Before you start all other tests — clean your browser's storages: local storage, session storage,
   cookies storage, etc.

## Cookies window test

1. Open editor after cleaning the local storage. Check the Cookies window emerges.
2. Close current browser tab. Open editor again. Check that Cookies window emerges again.
3. Close the Cookies window by the top-right cross. Refresh the page. Check that the Cookies window
   emerges again.
4. Close the Cookies window by the “Accept” button. Refresh the page. Check that the Cookies window
   does not appear again.

## Console errors

1. Open developer console, check that there are no errors in different modes.

## Clean reload

1. Start Example should be in the code editor.

## Menu

### "Examples"

1. Check links to documents in each example.

#### "Reset example XXX"

When click to this item, the warning window must appear. Check:

- Cancel button, 
- Reset button, 
- closing cross button.

### "Docs"

- Check each link in the Docs section.

### "Ask a question"

- Check "Ask a question" menu item.

## Code editor

### Editor-Render separator

When you move vertical separator:

1. Tab buttons on the right should never be pulled out of the screen.
2. You can move separator almost to the very left side.

## Refresh page

1. Check refresh with Ctrl+R.
2. Check refresh with Ctrl+Shift+R.

Code content should not be changed.

## Error window

1. Assure that you can copy text of the error message.

## Contents Sidebar

1. Check positioning after item click.
2. Check that Contents narrows documentation, not overlaps it.
3. Check that after click on some content item you can refresh page by Ctrl+Shift+R and nothing
   changes. Especially check it on paths with parameters, e. g. `/cats/{id}`.
4. Move vertical line between code and docs. Open contents sidebar. Check that it does not overlap
   docs and does not leave empty space between docs and contents sidebar. Repeat several times in
   different positions of vertical line.
5. [!Important!] Check any item in contents sidebar. Scroll away manually from this place. Change
   something in the code. Check that documentation stays in the same place after refresh and do not
   scroll back to the previous position.
6. Check that Contents works fine when there are a huge amount of items (vertical scroll must work).

## Performance

1. Check that editor does not consume much CPU when you do not touch it.

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

## Header buttons

1. Check hints, which must appear over buttons without captions (Bug, Export, Preview buttons).