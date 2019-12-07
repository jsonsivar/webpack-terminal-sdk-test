import { TerminalHttpProvider, SourceType, Web3Versions } from '@terminal-packages/sdk';
import Web3 from 'web3';

const web3 = new Web3(
  new TerminalHttpProvider({
    apiKey: 'yourApiKey',
    projectId: 'YOUR_TERMINAL_PROJECT_ID',
    // source can be any static or dynamic string as well
    source: SourceType.Terminal,
    customHttpProvider: new YourCustomHttpProvider()
    // if your using web3 1 (NONE BETA) please tell us, if you're not please delete this property
    // web3Version: Web3Versions.one,
    
  })
);

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());