"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
// @ts-ignore
const mte_kernel_1 = require("@susisu/mte-kernel");
class TextEditorInterface extends mte_kernel_1.ITextEditor {
    constructor(textEditor) {
        super();
        this.editor = textEditor;
        this.transaction = false;
    }
    /**
     * Gets the current cursor position.
     *
     * @return Point  A point object that represents the cursor position.
     */
    getCursorPosition() {
        const _pos = this.editor.selection.active;
        return new mte_kernel_1.Point(_pos.line, _pos.character);
    }
    /**
     * Sets the cursor position  to a specified one.
     *
     * @param pos A point object which the cursor position is set to.
     */
    setCursorPosition(pos) {
        const _pos = new vscode.Position(pos.row, pos.column);
        // look for better implementation
        setTimeout(() => {
            this.editor.selection = new vscode.Selection(_pos, _pos);
        }, 1, 'setCursorPosition');
    }
    /**
     * Sets the selection range. This method also expects the cursor position to be moved as the end of the selection range.
     *
     * @param range A range object that describes a selection range.
     */
    setSelectionRange(range) {
        this.editor.selection = new vscode.Selection(range.start.row, range.start.column, range.end.row, range.end.column);
    }
    /**
     * Gets the last row index of the text editor.
     *
     * @return number The last row index.
     */
    getLastRow() {
        const lastRow = this.editor.document.lineCount - 1;
        return lastRow;
    }
    /**
     * Checks if the editor accepts a table at a row to be editted. It should return false if, for example, the row is in a code block (not Markdown).
     *
     * @param row number A row index in the text editor.
     * @return Boolean true if the table at the row can be editted
     */
    acceptsTableEdit(row) {
        const lastRow = this.getLastRow();
        if (row > lastRow) {
            return false;
        }
        const line = this.editor.document.lineAt(row).text.trimLeft();
        if (line.startsWith('|')) {
            return true;
        }
        return false;
    }
    /**
     * Sets the selection range. This method also expects the cursor position to be moved as the end of the selection range.
     *
     * @param row number Row index, starts from 0.
     * @return string The line at the specified row. The line must not contain an EOL like "\n" or "\r".
     */
    getLine(row) {
        const lastRow = this.getLastRow();
        if (row > lastRow) {
            return "";
        }
        return this.editor.document.lineAt(row).text;
    }
    /**
     * Inserts a line at a specified row.
     *
     * @param row number Row index, starts from 0.
     * @param line string A string to be inserted. This must not contain an EOL like "\n" or "\r".
     */
    insertLine(row, line) {
        if (!this.transaction || !this.editBuilder) {
            return;
        }
        const lastRow = this.getLastRow();
        if (/^([|]\s+)+[|]$/.test(line)) {
            // enter a new row
            const _pos = this.editor.selection.active;
            if (this.acceptsTableEdit(row) && _pos.line !== row && !this.isCurrentLineBlank()) {
                return;
            }
            line = line.trim() + "\n";
            if (row > lastRow) {
                // last row of the file
                line = "\n" + line.trim();
            }
            this.setCursorPosition(new mte_kernel_1.Point(_pos.line, 2));
        }
        else if (/^([|]\s+)+[|] $/.test(line)) {
            // tab
            if (row > lastRow) {
                // last row of the file
                return;
            }
            if (this.acceptsTableEdit(row + 1) && this.isCurrentLineBlank()) {
                // this is the case for tab at the end of table
                return;
            }
            line = line.trim();
        }
        else {
            line = line.trim();
            if (row > lastRow) {
                // last row of the file
                line = "\n" + line.trim();
            }
        }
        this.editBuilder.insert(new vscode.Position(row, 0), line);
    }
    /**
     * Deletes a line at a specified row.
     *
     * @param row number Row index, starts from 0.
     */
    deleteLine(row) {
        if (!this.transaction || !this.editBuilder) {
            return;
        }
        const lastRow = this.getLastRow();
        if (row > lastRow) {
            return;
        }
        const line = this.editor.document.lineAt(row);
        const _range = line.range;
        this.editBuilder.delete(_range);
    }
    /**
     * Replace lines in a specified range.
     *
     * @param startRow number Row index, starts from 0.
     * @param endRow number End row index. Lines from startRow to endRow - 1 is replaced.
     * @param lines string[] An array of string. Each strings must not contain an EOL like "\n" or "\r".
     */
    replaceLines(startRow, endRow, lines) {
        if (!this.transaction || !this.editBuilder) {
            return;
        }
        const _range = new vscode.Range(new vscode.Position(startRow, 0), new vscode.Position(endRow, 0));
        const trimedLines = lines.map(line => line.trimRight());
        this.editBuilder.replace(_range, trimedLines.join("\n") + "\n");
    }
    transact(func) {
        this.transaction = true;
        this.editor.edit((editBuilder) => {
            this.editBuilder = editBuilder;
            func();
            this.transaction = false;
        });
    }
    isCurrentLineBlank() {
        const _pos = this.editor.selection.active;
        const currentLine = this.editor.document.lineAt(_pos.line).text;
        return /^([|]\s+)+[|]$/.test(currentLine);
    }
    destroy() {
    }
}
exports.default = TextEditorInterface;
//# sourceMappingURL=text-editor-interface.js.map