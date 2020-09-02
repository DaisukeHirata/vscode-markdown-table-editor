import * as vscode from 'vscode';
import { Point, ITextEditor } from "@susisu/mte-kernel";

export default class TextEditorInterface extends ITextEditor {

  editor: vscode.TextEditor;
  textBuffer: any;
  scopes: any;
  transaction: boolean;
  emitter: any;

  constructor(textEditor: vscode.TextEditor, scopes) {
    super();
    this.editor = textEditor;
    this.textBuffer = textEditor.getBuffer();
    this.scopes = scopes;
    this.transaction = false;
    this.emitter = new Emitter();
  }

  /**
   * Gets the current cursor position.
   * 
   * @return Point  A point object that represents the cursor position.
   */
  getCursorPosition(): Point {
    const _pos = this.editor.selection.active;
    return new Point(_pos.line, _pos.character);
  }

  /**
   * Sets the cursor position to a specified one.
   * 
   * @param pos A point object which the cursor position is set to.
   */
  setCursorPosition(pos: vscode.Position) {
    this.editor.selection = new vscode.Selection(pos, pos);
  }

  setSelectionRange(range) {
    this.editor.setSelectedBufferRange([
      [range.start.row, range.start.column],
      [range.end.row, range.end.column]
    ]);
  }

  /**
   * Gets the last row index of the text editor.
   * 
   * @return number The last row index.
   */
  getLastRow(): number {
    return this.editor.document.lineCount;
  }

  acceptsTableEdit(row) {
    const sd = this.editor.scopeDescriptorForBufferPosition([row, 0]).getScopesArray();
    for (const scope of this.scopes) {
      if (sd.indexOf(scope) >= 0) {
        return true;
      }
    }
    return false;
  }

  getLine(row) {
    return this.textBuffer.lineForRow(row);
  }

  insertLine(row, line) {
    const lastRow = this.textBuffer.getLastRow();
    if (row > lastRow) {
      const le = this.textBuffer.lineEndingForRow(lastRow);
      this.textBuffer.append("\n" + line + le, { normalizeLineEndings: true });
    }
    else {
      this.textBuffer.insert([row, 0], line + "\n", { normalizeLineEndings: true });
    }
  }

  deleteLine(row) {
    this.textBuffer.deleteRow(row);
  }

  replaceLines(startRow, endRow, lines) {
    const le = this.textBuffer.lineEndingForRow(endRow - 1);
    this.textBuffer.setTextInRange(
      [[startRow, 0], [endRow, 0]],
      lines.join("\n") + le,
      { normalizeLineEndings: true }
    );
  }

  transact(func) {
    this.transaction = true;
    this.textBuffer.transact(() => { func(); });
    this.transaction = false;
    this.emitter.emit("did-finish-transaction");
  }

  onDidFinishTransaction(func) {
    return this.emitter.on("did-finish-transaction", func);
  }

  destroy() {
    this.emitter.dispose();
  }
}
