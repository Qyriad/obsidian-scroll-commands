import {
	Editor,
	EditorRange,
	MarkdownFileInfo,
	MarkdownView,
	Plugin,
} from 'obsidian';

const PLUGIN: string = "obsidian-scroll-commands";

/**
 * Passes arguments to {@link console.log}, prefixed with `"obsidian-scroll-commands: "`.
 */
function log(...args: any[])
{
	return console.log(`${PLUGIN}:`, ...args);
}

/**
 * Throws an {@link Error} if `view` is not a {@link MarkdownView}.
 */
function assertMarkdownView(view: MarkdownView | any, msg?: string): asserts view is MarkdownView
{
	if ((view as MarkdownView).editor === undefined) {
		throw new Error(`assertion failed: ${msg}`);
	}
}

/**
 * The main plugin class for obsidian-scroll-commands.
 * Registers commands in {@link ScrollCommands.onload}.
 */
export default class ScrollCommands extends Plugin
{
	/**
	 * Registers the commands "scroll-bottom" and "scroll-top" as editor commands.
	 */
	override async onload()
	{
		log("loading");

		this.addCommand({
			id: 'scroll-bottom',
			name: 'Scroll to Bottom',
			editorCallback: this.scrollToBottom,
		});

		this.addCommand({
			id: "scroll-top",
			name: "Scroll to Top",
			editorCallback: this.scrollToTop,
		});
	}

	override onunload()
	{
		log("unloading");
	}


	/**
	 * Command handler for "scroll-bottom".
	 */
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

	/**
	 * Command handler for "scroll-top".
	 */
	scrollToTop(editor: Editor, view: MarkdownView | MarkdownFileInfo)
	{
		assertMarkdownView(view,
			`${PLUGIN}: scrollToTop(): view passed as MarkdownFileInfo instead of MarkdownView`,
		);

		const currentMode = view.getMode();

		if (currentMode === "source") {
			let newPos = {
				from: { line: 0, ch: 0 },
				to: { line: 0, ch: 0 },
			} as EditorRange;

			editor.scrollIntoView(newPos);
		} else if (currentMode === "preview") {
			view.currentMode.applyScroll(0);
		}
	}
}
