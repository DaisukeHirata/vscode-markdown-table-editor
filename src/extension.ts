// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { MarkdownTableEditor } from './markdown-table-editor/main';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-markdown-table-editor" is now active!');

	const main = new MarkdownTableEditor();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposableFormatAll = vscode.commands.registerCommand('vscode-markdown-table-editor.formatAll', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		main.formatAll();
	});

	let disposableFortmat = vscode.commands.registerCommand('vscode-markdown-table-editor.format', () => {
		main.format();
	});

	let disposableNextRow = vscode.commands.registerCommand('vscode-markdown-table-editor.nextRow', () => {
		main.nextRow();
	});

	let disposableNextCell = vscode.commands.registerCommand('vscode-markdown-table-editor.nextCell', () => {
		main.nextCell();
	});

	let disposablePreviousCell = vscode.commands.registerCommand('vscode-markdown-table-editor.previousCell', () => {
		main.previousCell();
	});

	let disposableCursorIsInTable = vscode.commands.registerCommand('vscode-markdown-table-editor.cursorIsInTable', () => {
		main.cursorIsInTable();
	});

	let disposableDeleteColumn = vscode.commands.registerCommand('vscode-markdown-table-editor.deleteColumn', () => {
		main.deleteColumn();
	});

	let disposableDeleteRow = vscode.commands.registerCommand('vscode-markdown-table-editor.deleteRow', () => {
		main.deleteRow();
	});

	let disposableEscape = vscode.commands.registerCommand('vscode-markdown-table-editor.escape', () => {
		main.escape();
	});

	let disposableInsertColumn = vscode.commands.registerCommand('vscode-markdown-table-editor.insertColumn', () => {
		main.insertColumn();
	});

	let disposableInsertRow = vscode.commands.registerCommand('vscode-markdown-table-editor.insertRow', () => {
		main.insertRow();
	});

	let disposableResetSmartCursor = vscode.commands.registerCommand('vscode-markdown-table-editor.resetSmartCursor', () => {
		main.resetSmartCursor();
	});

	let disposableSelectCell = vscode.commands.registerCommand('vscode-markdown-table-editor.selectCell', () => {
		main.selectCell();
	});	

	let disposableKeyBindings = vscode.commands.registerCommand('vscode-markdown-table-editor.keyBindings', (args: {}) => {
		main.keyBindings(args);
	});	

  // let disposableType = vscode.commands.registerCommand('type', e => {
	// 	console.log(e.text);
	// 	if (main.cursorIsInTable()) {
  //     vscode.commands.executeCommand('default:type', {
  //       text: e.text
  //     });
	// 	} else {
  //     vscode.commands.executeCommand('default:type', {
  //       text: e.text
  //     });
	// 	}
  // });

	context.subscriptions.push(
		disposableFormatAll,
		disposableFortmat,
		disposableNextRow,
		disposableNextCell,
		disposableCursorIsInTable,
		disposableDeleteColumn,
		disposableDeleteRow,
		disposableEscape,
		disposableInsertColumn,
		disposableInsertRow,
		disposablePreviousCell,
		disposableResetSmartCursor,
		disposableSelectCell,
		disposableKeyBindings
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
