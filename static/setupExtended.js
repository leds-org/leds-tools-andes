import { addMonacoStyles, defineUserServices, MonacoEditorLanguageClientWrapper } from './bundle/index.js';
import { configureWorker } from './setup.js';

addMonacoStyles('monaco-editor-styles');

export const setupConfigExtended = () => {
    const extensionFilesOrContents = new Map();
    const languageConfigUrl = new URL('../language-configuration.json', window.location.href);
    const textmateConfigUrl = new URL('../syntaxes/bb-8.tmLanguage.json', window.location.href);
    extensionFilesOrContents.set('/language-configuration.json', languageConfigUrl);
    extensionFilesOrContents.set('/bb-8-grammar.json', textmateConfigUrl);

    return {
        wrapperConfig: {
            serviceConfig: defineUserServices(),
            editorAppConfig: {
                $type: 'extended',
                languageId: 'bb-8',
                code: `// bb8 is running in the web!`,
                useDiffEditor: false,
                extensions: [{
                    config: {
                        name: 'bb-8-web',
                        publisher: 'generator-langium',
                        version: '1.0.0',
                        engines: {
                            vscode: '*'
                        },
                        contributes: {
                            languages: [{
                                id: 'bb-8',
                                extensions: [
                                    '.bb-8'
                                ],
                                configuration: './language-configuration.json'
                            }],
                            grammars: [{
                                language: 'bb-8',
                                scopeName: 'source.bb-8',
                                path: './bb-8-grammar.json'
                            }]
                        }
                    },
                    filesOrContents: extensionFilesOrContents,
                }],                
                userConfiguration: {
                    json: JSON.stringify({
                        'workbench.colorTheme': 'Default Dark Modern',
                        'editor.semanticHighlighting.enabled': true
                    })
                }
            }
        },
        languageClientConfig: configureWorker()
    };
};

export const executeExtended = async (htmlElement) => {
    const userConfig = setupConfigExtended();
    const wrapper = new MonacoEditorLanguageClientWrapper();
    await wrapper.initAndStart(userConfig, htmlElement);
};
