"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownTableEditor = void 0;
const vscode = require("vscode");
// @ts-ignore
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
            this.tableEditor.formatAll(this.getOptions());
        };
        this.format = () => {
            this.tableEditor.format(this.getOptions());
        };
        this.nextCell = () => {
            this.tableEditor.nextCell(this.getOptions());
        };
        this.previousCell = () => {
            this.tableEditor.previousCell(this.getOptions());
        };
        this.nextRow = () => {
            this.tableEditor.nextRow(this.getOptions());
        };
        this.cursorIsInTable = () => {
            return this.tableEditor.cursorIsInTable(this.getOptions());
        };
        this.deleteColumn = () => {
            this.tableEditor.deleteColumn(this.getOptions());
        };
        this.deleteRow = () => {
            this.tableEditor.deleteRow(this.getOptions());
        };
        this.escape = () => {
            this.tableEditor.escape(this.getOptions());
        };
        this.insertColumn = () => {
            this.tableEditor.insertColumn(this.getOptions());
        };
        this.insertRow = () => {
            this.tableEditor.insertRow(this.getOptions());
        };
        this.resetSmartCursor = () => {
            this.tableEditor.resetSmartCursor();
        };
        this.selectCell = () => {
            this.tableEditor.selectCell(this.getOptions());
        };
        this.keyBindings = (args) => {
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
    getOptions() {
        const config = vscode.workspace.getConfiguration('vscode-markdown-table-editor');
        return mte_kernel_1.options({
            textWidthOptions: {
                normalize: config.get('normalize'),
                ambiguousAsWide: config.get('ambiguousAsWide')
            }
        });
    }
}
exports.MarkdownTableEditor = MarkdownTableEditor;
//# sourceMappingURL=main.js.map