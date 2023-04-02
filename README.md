# Obsidian Sample Plugin

This is a Properties code block Coloration plugin for Obsidian (https://obsidian.md).

This project uses Typescript to provide type checking and documentation.
The repo depends on the latest plugin API (obsidian.d.ts) in Typescript Definition format, which contains TSDoc comments describing what it does.

## How to use

- Build with NPM (**npm i** then **npm run build** )
- Copy Manifest.json & main.js in a new "property-coloration" folder under your .obsidian/plugins/folder/
- Enable plugin inside your Obsidian Plugin Settings
- Configure your preferred key & value color html code in the plugin settings
- Use ```properties in your Obsidian Notes block to enjoy some much readable properties format
