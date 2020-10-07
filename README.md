# VSCode Markdown Table Editor README

Markdown table editor/formatter for vscode. inspired by [atom-markdown-table-editor](https://github.com/susisu/atom-markdown-table-editor). Basically its core functionality comes from [mte-kernel](https://github.com/susisu/mte-kernel) which provides a text editor independent implementation for markdown table editing.

## Features

- Format tables
- Move the cursor from cell to cell
- Alter column's alignment
- Insert and delete rows and columns

![demo](https://user-images.githubusercontent.com/1229698/93194724-5fe76c80-f783-11ea-8889-7ccaad3088dd.gif)

### Quick guide

0. Set editor's language to `Markdown`.
1. Input a pipe `|` and some content (the cursor position is indicated by `_`).
    ``` markdown
    | foo_
    ```
    (If you are using [language-markdown](https://atom.io/packages/language-markdown), don't forget a space after a pipe.)
2. Hit <kbd>tab</kbd> to move to the next cell.
    ``` markdown
    | foo | _
    | --- |
    ```
3. Continue typing.
    ``` markdown
    | foo | bar | _
    | --- | --- |
    ```
4. Hit <kbd>enter</kbd> to move to the next row.
    ``` markdown
    | foo | bar |
    | --- | --- |
    | _   |     |
    ```
5. Continue typing...
    ``` markdown
    | foo | bar |
    | --- | --- |
    | baz | _   |
    ```
6. Hit <kbd>esc</kbd> to finish editing the table.
    ``` markdown
    | foo | bar |
    | --- | --- |
    | baz |     |
    _
    ```

### Commands

| Name                       | Description                              | Keybinding                        |
| -------------------------- | ---------------------------------------- | --------------------------------- |
| Next Cell                  | Move to the next cell                    | <kbd>tab</kbd>                    |
| Previous Cell              | Move to the previous cell                | <kbd>shift</kbd> + <kbd>tab</kbd> |
| Next Row                   | Move to the next row                     | <kbd>enter</kbd>                  |
| Escape                     | Escape from the table                    | <kbd>escape</kbd>                 |
| Format                     | Just format the table                    |                                   |
| Format All                 | Format all the tables in the text editor |                                   |
| Select Cell                | Select the cell content                  |                                   |
| Insert Row                 | Insert an empty row                      |                                   |
| Delete Row                 | Delete the row                           |                                   |
| Insert Column              | Insert an empty column                   |                                   |
| Delete Column              | Delete the column                        |                                   |
| Enable Table Editing Mode  | Enable Table Editing Mode                |                                   |
| Disable Table Editing Mode | Disable Table Editing Mode               |                                   |

## Requirements

Please set keyboard shortcuts for `Tab`, `Enter`, `Shift+Tab` as **User(high priority)**, in the case the shortcuts conflicts with other extension's shortcuts. This shortcuts are enabled only when cursor inside markdown table in markdown file (vscode-markdown-table-editor.enabled==true).
![image](https://user-images.githubusercontent.com/1229698/93197059-282df400-f786-11ea-9eae-2d6e1e012683.png)

Or set following in keybinding.json as User setting.

```json
[
  {
    "key": "enter",
    "command": "vscode-markdown-table-editor.nextRow",
    "when": "editorTextFocus && vscode-markdown-table-editor.enabled"
  },
  {
    "key": "tab",
    "command": "vscode-markdown-table-editor.nextCell",
    "when": "editorTextFocus && vscode-markdown-table-editor.enabled"
  },
  {
    "key": "shift+tab",
    "command": "vscode-markdown-table-editor.previousCell",
    "when": "editorTextFocus && vscode-markdown-table-editor.enabled"
  }
]
```

## Extension Settings

This extension contributes the following settings:

* `vscode-markdown-table-editor.normalize`: enable/disable Normalizes texts before computing text widths.
* `vscode-markdown-table-editor.ambiguousAsWide`: enable/disable Treats East Asian Ambiguous characters as wide.

## Known Issues

Currently No.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release

-----------------------------------------------------------------------------------------------------------

**Enjoy!**
