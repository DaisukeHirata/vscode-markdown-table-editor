import * as vscode from 'vscode';
import { TableEditor, options } from "@susisu/mte-kernel";
import TextEditorInterface from "./text-editor-interface";
import { runInThisContext } from 'vm';

export class MarkdownTableEditor {

  private tableEditor: TableEditor;

  constructor() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const textEditor = new TextEditorInterface(editor); // interface to the text editor
      this.tableEditor = new TableEditor(textEditor);
    }
  }

  public enableTableEditingMode = () => {
    this.changeTableEditingMode(true);
  };

  public disableTableEditingMode = () => {
    this.changeTableEditingMode(false);
  };

  private changeTableEditingMode = (bool: Boolean) => {
    vscode.commands.executeCommand(
      'setContext',
      'vscode-markdown-table-editor.enabled',
      bool
    );
  };

  public formatAll = () => {
    this.tableEditor.formatAll(options({}));
  };

  public format = () => {
    this.tableEditor.format(options({}));
  };

  public nextCell = () => {
    this.tableEditor.nextCell(options({}));
  };

  public previousCell = () => {
    this.tableEditor.previousCell(options({}));    
  };  

  public nextRow = () => {
    this.tableEditor.nextRow(options({}));
  };

  public cursorIsInTable = () : Boolean => {
    return this.tableEditor.cursorIsInTable(options({}));
  };

  public deleteColumn = () => {
    this.tableEditor.deleteColumn(options({}));
  };

  public deleteRow = () => {
    this.tableEditor.deleteRow(options({}));
  };

  public escape = () => {
    this.tableEditor.escape(options({}));
  };

  public insertColumn = () => {
    this.tableEditor.insertColumn(options({}));
  };

  public insertRow = () => {
    this.tableEditor.insertRow(options({}));
  };

  public resetSmartCursor = () => {
    this.tableEditor.resetSmartCursor();
  };
  
  public selectCell = () => {
    this.tableEditor.selectCell(options({}));
  };

  public keyBindings = (args: {}) => {
    const result = this.tableEditor.cursorIsInTable(options({}));
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
  };  
}