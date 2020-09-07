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
    }
}
exports.MarkdownTableEditor = MarkdownTableEditor;
//# sourceMappingURL=main.js.map