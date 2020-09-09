import * as vscode from 'vscode';
import { TableEditor, options } from "@susisu/mte-kernel";
import TextEditorInterface from "./text-editor-interface";

export class MarkdownTableEditor {
  public formatAll = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor); // interface to the text editor
      const tableEditor = new TableEditor(textEditor);
      tableEditor.formatAll(options({}));
    }
  };

  public format = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      tableEditor.format(options({}));
    }
  };

  public nextCell = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      tableEditor.nextCell(options({}));
    }
  };

  public previousCell = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      tableEditor.previousCell(options({}));
    }
  };  

  public nextRow = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      tableEditor.nextRow(options({}));
    }
  };

  public cursorIsInTable = () : Boolean => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      const result = tableEditor.cursorIsInTable(options({}));
      vscode.window.showInformationMessage(`Cursor is in Table ${result}`);
      return result;
    }
    return false;
  };

  public deleteColumn = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      tableEditor.deleteColumn(options({}));
    }
  };

  public deleteRow = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      tableEditor.deleteRow(options({}));
    }
  };

  public escape = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      tableEditor.escape(options({}));
    }
  };

  public insertColumn = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      tableEditor.insertColumn(options({}));
    }
  };

  public insertRow = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      tableEditor.insertRow(options({}));
    }
  };

  public resetSmartCursor = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      tableEditor.resetSmartCursor();
    }
  };
  
  public selectCell = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      tableEditor.selectCell(options({}));
    }
  };

  public keyBindings = (args: {}) => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor);
      const tableEditor = new TableEditor(textEditor);
      const result = tableEditor.cursorIsInTable(options({}));
      vscode.window.showInformationMessage(`Cursor is in Table ${result}`);
      const command = args['command'];
      if (result) {
        switch (command) {
          case 'nextCell':
            this.nextCell();	
            break;
          case 'nextRow':
            this.nextRow();	
            break;
          default:
            vscode.window.showInformationMessage(`Command is not found ${command}`);
            break;
        }
      } else {
        switch (command) {
          case 'nextCell':
            vscode.commands.executeCommand('type', { 'text': '\t' });
            break;
          case 'nextRow':
            vscode.commands.executeCommand('type', { 'text': '\n' });
            break;
          default:
            vscode.window.showInformationMessage(`Command is not found ${command}`);
            break;
        }
      }
    }
  };  
}