import * as vscode from 'vscode';
import { TableEditor, options } from "@susisu/mte-kernel";
import TextEditorInterface from "./text-editor-interface";

export class MarkdownTableEditor {
  public run  = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      vscode.window.showInformationMessage('Hello World from main.ts!');
      const textEditor = new TextEditorInterface(editor); // interface to the text editor
      const tableEditor = new TableEditor(textEditor);
      tableEditor.formatAll(options({}));  
    }
  };
}