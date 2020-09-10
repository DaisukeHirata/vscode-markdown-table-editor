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
	if (main.cursorIsInTable()) {
		main.enableTableEditingMode();
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposableFormatAll = vscode.commands.registerCommand('vscode-markdown-table-editor.formatAll', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		main.formatAll();
	});

	const disposableFortmat = vscode.commands.registerCommand('vscode-markdown-table-editor.format', () => {
		main.format();
	});

	const disposableNextRow = vscode.commands.registerCommand('vscode-markdown-table-editor.nextRow', () => {
		main.nextRow();
	});

	const disposableNextCell = vscode.commands.registerCommand('vscode-markdown-table-editor.nextCell', () => {
		main.nextCell();
	});

	const disposablePreviousCell = vscode.commands.registerCommand('vscode-markdown-table-editor.previousCell', () => {
		main.previousCell();
	});

	const disposableCursorIsInTable = vscode.commands.registerCommand('vscode-markdown-table-editor.cursorIsInTable', () => {
		main.cursorIsInTable();
	});

	const disposableDeleteColumn = vscode.commands.registerCommand('vscode-markdown-table-editor.deleteColumn', () => {
		main.deleteColumn();
	});

	const disposableDeleteRow = vscode.commands.registerCommand('vscode-markdown-table-editor.deleteRow', () => {
		main.deleteRow();
	});

	const disposableEscape = vscode.commands.registerCommand('vscode-markdown-table-editor.escape', () => {
		main.escape();
		main.disableTableEditingMode();
	});

	const disposableInsertColumn = vscode.commands.registerCommand('vscode-markdown-table-editor.insertColumn', () => {
		main.insertColumn();
	});

	const disposableInsertRow = vscode.commands.registerCommand('vscode-markdown-table-editor.insertRow', () => {
		main.insertRow();
	});

	const disposableResetSmartCursor = vscode.commands.registerCommand('vscode-markdown-table-editor.resetSmartCursor', () => {
		main.resetSmartCursor();
	});

	const disposableSelectCell = vscode.commands.registerCommand('vscode-markdown-table-editor.selectCell', () => {
		main.selectCell();
	});	

	const disposableKeyBindings = vscode.commands.registerCommand('vscode-markdown-table-editor.keyBindings', args => {
		main.keyBindings(args);
	});

	const disposableEnableTableEditingMode = vscode.commands.registerCommand('vscode-markdown-table-editor.enableTableEditingMode', () => {
		main.enableTableEditingMode();
	});

	const disposableDisableTableEditingMode = vscode.commands.registerCommand('vscode-markdown-table-editor.disableTableEditingMode', () => {
		main.disableTableEditingMode();
	});

  // detect cursor movement event
  const disposableOnDidChangeTextEditorSelection = vscode.window.onDidChangeTextEditorSelection(e => {
		const selection = e.textEditor.selection;
		console.log(selection.isEmpty);
		console.log(selection);
		if (selection.isEmpty) {
			if (main.cursorIsInTable()) {
				main.enableTableEditingMode();
			} else {
				main.disableTableEditingMode();
			}
		} else {
			if (selection.start.line === selection.end.line) {
				main.enableTableEditingMode();
			} else {
				main.disableTableEditingMode();
			}
		}
	});	

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
		disposableKeyBindings,
		disposableEnableTableEditingMode,
		disposableDisableTableEditingMode,
		disposableOnDidChangeTextEditorSelection
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
