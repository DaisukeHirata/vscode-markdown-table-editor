"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownTableEditor = void 0;
const vscode = require("vscode");
const mte_kernel_1 = require("@susisu/mte-kernel");
const text_editor_interface_1 = require("./text-editor-interface");
class MarkdownTableEditor {
    constructor() {
        this.enableTableEditingMode = () => {
            this.changeTableEditingMode(true);
        };
        this.disableTableEditingMode = () => {
            this.changeTableEditingMode(false);
        };
        this.changeTableEditingMode = (bool) => {
            vscode.commands.executeCommand('setContext', 'vscode-markdown-table-editor.enabled', bool);
        };
        this.formatAll = () => {
            this.tableEditor.formatAll(mte_kernel_1.options({}));
        };
        this.format = () => {
            this.tableEditor.format(mte_kernel_1.options({}));
        };
        this.nextCell = () => {
            this.tableEditor.nextCell(mte_kernel_1.options({}));
        };
        this.previousCell = () => {
            this.tableEditor.previousCell(mte_kernel_1.options({}));
        };
        this.nextRow = () => {
            this.tableEditor.nextRow(mte_kernel_1.options({}));
        };
        this.cursorIsInTable = () => {
            return this.tableEditor.cursorIsInTable(mte_kernel_1.options({}));
        };
        this.deleteColumn = () => {
            this.tableEditor.deleteColumn(mte_kernel_1.options({}));
        };
        this.deleteRow = () => {
            this.tableEditor.deleteRow(mte_kernel_1.options({}));
        };
        this.escape = () => {
            this.tableEditor.escape(mte_kernel_1.options({}));
        };
        this.insertColumn = () => {
            this.tableEditor.insertColumn(mte_kernel_1.options({}));
        };
        this.insertRow = () => {
            this.tableEditor.insertRow(mte_kernel_1.options({}));
        };
        this.resetSmartCursor = () => {
            this.tableEditor.resetSmartCursor();
        };
        this.selectCell = () => {
            this.tableEditor.selectCell(mte_kernel_1.options({}));
        };
        this.keyBindings = (args) => {
            const result = this.tableEditor.cursorIsInTable(mte_kernel_1.options({}));
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
        };
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const textEditor = new text_editor_interface_1.default(editor); // interface to the text editor
            this.tableEditor = new mte_kernel_1.TableEditor(textEditor);
        }
    }
}
exports.MarkdownTableEditor = MarkdownTableEditor;
//# sourceMappingURL=main.js.map