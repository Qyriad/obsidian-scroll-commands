import {
	Editor,
	EditorRange,
	MarkdownFileInfo,
	MarkdownView,
	Plugin,
} from 'obsidian';

function log(...args: any[])
{
	console.log("obsidian-scroll-to-bottom:", ...args);
}

function assertMarkdownView(view: MarkdownView | MarkdownFileInfo, msg?: string): asserts view is MarkdownView
{
	if ((view as MarkdownView).editor !== undefined) {
		throw new Error(msg)
	}
}

export default class ScrollBottom extends Plugin
{
	async onload()
	{
		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'scroll-bottom',
			name: 'Scroll to Bottom',
			editorCallback: this.scrollToBottom,
		});
	}

	onunload()
	{

	}


	scrollToBottom(editor: Editor, view: MarkdownView | MarkdownFileInfo)
	{
		assertMarkdownView(view,
			"obsidian-scroll-to-bottom: scrollToBottom(): view passed as MarkdownFileInfo instead of MarkdownView",
		);
		const currentMode = view.getMode();
		const lastLine = editor.lineCount();

		if (currentMode === "source") {

			let newPos = {
				from: { line: lastLine, ch: 0 },
				to: { line: lastLine, ch: 0 },
			} as EditorRange;

			editor.scrollIntoView(newPos);
		} else if (currentMode === "preview") {
			view.currentMode.applyScroll(lastLine);
		}
	}
}
