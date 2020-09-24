import * as path from "path";
import * as vscode from 'vscode';
import { ColorDecorations } from "./decorations/color_decorations";
import { JsonFileListener } from "./listener/JsonFileListener";
import { SymbolProvider } from "./provider/SymbolProvider";
import { JsonReferenceProvider } from "./provider/JsonReferenceProvider";
import { ScriptFileListener } from "./listener/ScriptFileListener";

const JSON_MODE = { language: "json", scheme: "file" };

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('magic.showTime', async () => {
		vscode.window.showInformationMessage('Show Time ^_^');
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(new ColorDecorations(path.join(context.globalStoragePath, "colors")));
	
	context.subscriptions.push(new JsonFileListener());
	context.subscriptions.push(new ScriptFileListener());

	context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(new SymbolProvider()));

	context.subscriptions.push(vscode.languages.registerDefinitionProvider(JSON_MODE, new JsonReferenceProvider()));
	context.subscriptions.push(vscode.languages.registerReferenceProvider(JSON_MODE, new JsonReferenceProvider()));
}

// this method is called when your extension is deactivated
export function deactivate() {}