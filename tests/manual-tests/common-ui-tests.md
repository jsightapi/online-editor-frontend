# UI tests

## Console errors

1. Open developer console, check that there are no errors in different modes.

## Clean reload

1. Start Example should be in the code editor.

## Menu

### "Examples"

#### "Reset example XXX"

When click to this item, the code editor content should be reset to the corresponding example.

## Code editor

### Editor-Render separator

When you move vertical separator:

1. Tab buttons on the right should never be pulled out of the screen.
2. You can move separator to the very left end of the screen.

## Refresh page

1. Check refresh with Ctrl+R.
2. Check refresh with Ctrl+Shift+R.

Code content should not be changed.

## Error window

1. Assure that you can copy text of the error message.

## Title

1. HTML title should be changed as soon as you change INFO Title value.
2. If you delete Title directive, the browser HTML title must be reset to "JSight Online Editor".

## Contents Sidebar

1. Check positioning after item click.
2. Check that Contents narrows documentation, not overlaps it.
3. Check that after click on some content item you can refresh page by Ctrl+Shift+R and nothing
   changes. Especially check it on paths with parameters, e. g. `/cats/{id}`.
4. Move vertical line between code and docs. Open contents sidebar. Check that it does not overlap
   docs and does not leave empty space between docs and contents sidebar. Repeat several times in
   different positions of vertical line.
5. Check any item in contents sidebar. Scroll away manually from this place. Change something in the
   code. Check that documentation stays in the same place after refresh and do not scroll back to
   the previous position.
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

## Examples

1. Check links in each example.
2. Check Ok and Cancel buttons in the "Example reset" popup window.

## Header buttons

1. Check hints, which must appear over buttons without captions (Bug, Export, Preview buttons).