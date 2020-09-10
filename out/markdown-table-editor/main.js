"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownTableEditor = void 0;
const vscode = require("vscode");
const mte_kernel_1 = require("@susisu/mte-kernel");
const text_editor_interface_1 = require("./text-editor-interface");
class MarkdownTableEditor {
    constructor() {
        this.formatAll = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor); // interface to the text editor
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                tableEditor.formatAll(mte_kernel_1.options({}));
            }
        };
        this.format = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                tableEditor.format(mte_kernel_1.options({}));
            }
        };
        this.nextCell = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                tableEditor.nextCell(mte_kernel_1.options({}));
            }
        };
        this.previousCell = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                tableEditor.previousCell(mte_kernel_1.options({}));
            }
        };
        this.nextRow = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                tableEditor.nextRow(mte_kernel_1.options({}));
            }
        };
        this.cursorIsInTable = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                const result = tableEditor.cursorIsInTable(mte_kernel_1.options({}));
                return result;
            }
            return false;
        };
        this.deleteColumn = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                tableEditor.deleteColumn(mte_kernel_1.options({}));
            }
        };
        this.deleteRow = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                tableEditor.deleteRow(mte_kernel_1.options({}));
            }
        };
        this.escape = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                tableEditor.escape(mte_kernel_1.options({}));
            }
        };
        this.insertColumn = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                tableEditor.insertColumn(mte_kernel_1.options({}));
            }
        };
        this.insertRow = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                tableEditor.insertRow(mte_kernel_1.options({}));
            }
        };
        this.resetSmartCursor = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                tableEditor.resetSmartCursor();
            }
        };
        this.selectCell = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                tableEditor.selectCell(mte_kernel_1.options({}));
            }
        };
        this.keyBindings = (args) => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const textEditor = new text_editor_interface_1.default(editor);
                const tableEditor = new mte_kernel_1.TableEditor(textEditor);
                const result = tableEditor.cursorIsInTable(mte_kernel_1.options({}));
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
                }
                else {
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
}
exports.MarkdownTableEditor = MarkdownTableEditor;
//# sourceMappingURL=main.js.map