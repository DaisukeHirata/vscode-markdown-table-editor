import * as vscode from 'vscode';
import { Point, Range, Position, ITextEditor } from "@susisu/mte-kernel";
import { EventEmitter } from "events";

export default class TextEditorInterface extends ITextEditor {

  editor: vscode.TextEditor;
  //scopes: any;
  transaction: boolean;
  emitter: EventEmitter;
  editBuilder: vscode.TextEditorEdit;

  constructor(textEditor: vscode.TextEditor) {
    super();
    this.editor = textEditor;
    this.transaction = false;
    this.emitter = new EventEmitter();
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
  setCursorPosition(pos: Position) {
    const _pos = new vscode.Position(pos.row, pos.column);
    this.editor.selection = new vscode.Selection(_pos, _pos);
  }

  /**
   * Sets the selection range. This method also expects the cursor position to be moved as the end of the selection range.
   *
   * @param range A range object that describes a selection range.
   */
  setSelectionRange(range: Range) {
    this.editor.selection = new vscode.Selection(range.start.row, range.start.column, range.end.row, range.end.column);
  }

  /**
   * Gets the last row index of the text editor.
   *
   * @return number The last row index.
   */
  getLastRow(): number {
    return this.editor.document.lineCount;
  }

  /**
   * Checks if the editor accepts a table at a row to be editted. It should return false if, for example, the row is in a code block (not Markdown).
   *
   * @param row number A row index in the text editor.
   * @return Boolean true if the table at the row can be editted
   */
  acceptsTableEdit(row: number): Boolean {
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
  getLine(row: number): string {
    const lastRow = this.editor.document.lineCount;
    if (row < lastRow) {
      return this.editor.document.lineAt(row).text;
    } else {
      return "";
    }
  }

  /**
   * Inserts a line at a specified row.
   *
   * @param row number Row index, starts from 0.
   * @param line string A string to be inserted. This must not contain an EOL like "\n" or "\r".
   */
  insertLine(row: number, line: string) {
    const lastRow = this.editor.document.lineCount;
    const insertRow = row > lastRow ? lastRow : row;
    console.log(`${row} ${lastRow} ${insertRow} ${line}`);
    if (this.transaction) {
      if (row === lastRow) {
        // append
        line = "\n" + line;
      }
      this.editBuilder.insert(new vscode.Position(insertRow, 0), line);
    } else {
      this.editor.edit((editBuilder) => {
        editBuilder.insert(new vscode.Position(insertRow, 0), line + "\n");
      });
    }
  }

  /**
   * Deletes a line at a specified row.
   *
   * @param row number Row index, starts from 0.
   */
  deleteLine(row: number) {
    const _range = this.editor.document.lineAt(row).range;
    if (this.transaction) {
      this.editBuilder.delete(_range);
    } else {
      this.editor.edit((editBuilder) => {
        editBuilder.delete(_range);
      });
    }
  }

  /**
   * Replace lines in a specified range.
   *
   * @param startRow number Row index, starts from 0.
   * @param endRow number End row index. Lines from startRow to endRow - 1 is replaced.
   * @param lines string[] An array of string. Each strings must not contain an EOL like "\n" or "\r".
   */
  replaceLines(startRow: number, endRow: number, lines: string[]) {
    const _range = new vscode.Range(new vscode.Position(startRow, 0), new vscode.Position(endRow, 0));
    if (this.transaction) {
      this.editBuilder.replace(_range, lines.join("\n"));
    } else {
      this.editor.edit((editBuilder) => {
        editBuilder.replace(_range, lines.join("\n"));
      });
    }
  }

  transact(func: any) {
    this.transaction = true;
    this.editor.edit((editBuilder) => {
      this.editBuilder = editBuilder;
      func();
      this.transaction = false;
      this.emitter.emit("did-finish-transaction");
    });
  }

  onDidFinishTransaction(func: any) {
    console.log("onDidFinishTransaction");
    return this.emitter.on("did-finish-transaction", ()=>{
      console.log("gessdkode");
      func();
    });
  }

  destroy() {
    //this.emitter.dispose();
  }
}
