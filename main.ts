import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface PropertyColorationSettings {
	keyColor: string;
	valueColor: string;
}

const DEFAULT_SETTINGS: PropertyColorationSettings = {
	keyColor: 'default',
	valueColor: 'default'
}

export default class PropertyColorationPlugin extends Plugin {
	settings: PropertyColorationSettings;

	async onload() {
		await this.loadSettings();

	    this.registerMarkdownCodeBlockProcessor("properties", (source, el, ctx) => {
			const rows = source.split("\n").filter((row) => row.length > 0);

			for (let i = 0; i < rows.length; i++) {

			  const propDiv = el.createDiv();
			 



              if(rows[i].startsWith("#")) {
				propDiv.style.color="grey"
				propDiv.textContent = rows[i];
				continue; 
			  }

			  const cols = rows[i].split("=");

			  const id = cols[0]
			  const value = cols[1]

			  const keySpan = propDiv.createSpan();
			  const separatorSpan = propDiv.createSpan();
			  const valueSpan = propDiv.createSpan();

			  keySpan.textContent = id;
			  keySpan.style.color = this.settings.keyColor;

			  separatorSpan.textContent = "=";

			  valueSpan.textContent = value;
			  valueSpan.style.color = this.settings.valueColor;
			}
		  });


		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new PropertiesColorationSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class PropertiesColorationSettingTab extends PluginSettingTab {
	plugin: PropertyColorationPlugin;

	constructor(app: App, plugin: PropertyColorationPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Property Coloration Setting'});

		new Setting(containerEl)
			.setName('Key Color')
			.setDesc('html color code for property key coloration')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.keyColor)
				.onChange(async (value) => {
					console.log('New key Color: ' + value);
					this.plugin.settings.keyColor = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Value Color')
			.setDesc('html color code for property key coloration')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.valueColor)
				.onChange(async (value) => {
					console.log('New value Color: ' + value);
					this.plugin.settings.valueColor = value;
					await this.plugin.saveSettings();
				}));
	}
}
