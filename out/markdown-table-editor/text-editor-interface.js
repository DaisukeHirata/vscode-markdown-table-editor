"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const mte_kernel_1 = require("@susisu/mte-kernel");
const events_1 = require("events");
class TextEditorInterface extends mte_kernel_1.ITextEditor {
    constructor(textEditor) {
        super();
        this.editor = textEditor;
        this.transaction = false;
        this.emitter = new events_1.EventEmitter();
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
     * Sets the cursor position to a specified one.
     *
     * @param pos A point object which the cursor position is set to.
     */
    setCursorPosition(pos) {
        const _pos = new vscode.Position(pos.row, pos.column);
        this.editor.selection = new vscode.Selection(_pos, _pos);
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
        return this.editor.document.lineCount;
    }
    /**
     * Checks if the editor accepts a table at a row to be editted. It should return false if, for example, the row is in a code block (not Markdown).
     *
     * @param row number A row index in the text editor.
     * @return Boolean true if the table at the row can be editted
     */
    acceptsTableEdit(row) {
        const lastRow = this.editor.document.lineCount;
        if (row < lastRow) {
            const line = this.editor.document.lineAt(row);
            if (line.text.startsWith('|')) {
                return true;
            }
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
        const lastRow = this.editor.document.lineCount;
        if (row < lastRow) {
            return this.editor.document.lineAt(row).text;
        }
        else {
            return "";
        }
    }
    /**
     * Inserts a line at a specified row.
     *
     * @param row number Row index, starts from 0.
     * @param line string A string to be inserted. This must not contain an EOL like "\n" or "\r".
     */
    insertLine(row, line) {
        const lastRow = this.editor.document.lineCount;
        const insertRow = row > lastRow ? lastRow : row;
        this.editor.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(insertRow, 0), line + "\n");
        });
    }
    /**
     * Deletes a line at a specified row.
     *
     * @param row number Row index, starts from 0.
     */
    deleteLine(row) {
        const _range = this.editor.document.lineAt(row).range;
        this.editor.edit((editBuilder) => {
            editBuilder.delete(_range);
        });
    }
    /**
     * Replace lines in a specified range.
     *
     * @param startRow number Row index, starts from 0.
     * @param endRow number End row index. Lines from startRow to endRow - 1 is replaced.
     * @param lines string[] An array of string. Each strings must not contain an EOL like "\n" or "\r".
     */
    replaceLines(startRow, endRow, lines) {
        const _range = new vscode.Range(new vscode.Position(startRow, 0), new vscode.Position(endRow, 0));
        this.editor.edit((editBuilder) => {
            editBuilder.replace(_range, lines.join("\n"));
        });
    }
    transact(func) {
        this.transaction = true;
        this.editor.edit((editBuilder) => {
            func();
            this.transaction = false;
            this.emitter.emit("did-finish-transaction");
        });
    }
    onDidFinishTransaction(func) {
        console.log("onDidFinishTransaction");
        return this.emitter.on("did-finish-transaction", () => {
            console.log("gessdkode");
            func();
        });
    }
    destroy() {
        //this.emitter.dispose();
    }
}
exports.default = TextEditorInterface;
//# sourceMappingURL=text-editor-interface.js.map