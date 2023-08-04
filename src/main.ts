import {
	Editor,
	EditorRange,
	MarkdownFileInfo,
	MarkdownView,
	Plugin,
} from 'obsidian';

const PLUGIN: string = "obsidian-scroll-commands";

function log(...args: any[])
{
	console.log(`${PLUGIN}:`, ...args);
}

function assertMarkdownView(view: MarkdownView | MarkdownFileInfo, msg?: string): asserts view is MarkdownView
{
	if ((view as MarkdownView).editor === undefined) {
		throw new Error(`assertion failed: ${msg}`);
	}
}

export default class ScrollBottom extends Plugin
{
	async onload()
	{
		log("loading");

		this.addCommand({
			id: 'scroll-bottom',
			name: 'Scroll to Bottom',
			editorCallback: this.scrollToBottom,
		});
	}

	onunload()
	{
		log("unloading");
	}


	scrollToBottom(editor: Editor, view: MarkdownView | MarkdownFileInfo)
	{
		assertMarkdownView(view,
			`${PLUGIN}: scrollToBottom(): view passed as MarkdownFileInfo instead of MarkdownView`,
		);
		const currentMode = view.getMode();
		const lastLine = editor.lineCount();

		// TODO: scroll such that the last line is in the middle of the screen (or something),
		// rather than scrolling to the absolute most bottom it can be scrolled.

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
