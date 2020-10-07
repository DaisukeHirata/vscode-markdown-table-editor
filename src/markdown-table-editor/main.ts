import * as vscode from 'vscode';
// @ts-ignore
import { TableEditor, options } from "@susisu/mte-kernel"; 
import TextEditorInterface from "./text-editor-interface";
import { runInThisContext } from 'vm';
import { truncate } from 'fs/promises';

interface KeyBindingsArgs {
  command: string;
}

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
    this.tableEditor.formatAll(this.getOptions());
  };

  public format = () => {
    this.tableEditor.format(this.getOptions());
  };

  public nextCell = () => {
    this.tableEditor.nextCell(this.getOptions());
  };

  public previousCell = () => {
    this.tableEditor.previousCell(this.getOptions());
  };  

  public nextRow = () => {
    this.tableEditor.nextRow(this.getOptions());
  };

  public cursorIsInTable = () : Boolean => {
    return this.tableEditor.cursorIsInTable(this.getOptions());
  };

  public deleteColumn = () => {
    this.tableEditor.deleteColumn(this.getOptions());
  };

  public deleteRow = () => {
    this.tableEditor.deleteRow(this.getOptions());
  };

  public escape = () => {
    this.tableEditor.escape(this.getOptions());
  };

  public insertColumn = () => {
    this.tableEditor.insertColumn(this.getOptions());
  };

  public insertRow = () => {
    this.tableEditor.insertRow(this.getOptions());
  };

  public resetSmartCursor = () => {
    this.tableEditor.resetSmartCursor();
  };
  
  public selectCell = () => {
    this.tableEditor.selectCell(this.getOptions());
  };

  public keyBindings = (args: KeyBindingsArgs) => {
    const result = this.tableEditor.cursorIsInTable(this.getOptions());
    const command = args.command;
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

  getOptions() {
    const config = vscode.workspace.getConfiguration('vscode-markdown-table-editor');
    return options({
      textWidthOptions : {
        normalize      : config.get('normalize'),
        ambiguousAsWide: config.get('ambiguousAsWide')
      }
    });
  }
}