import { localLogger } from './local-logger';

(async function main() {
  // without this call the webpack runtime will try to load this via a <script> tag, but webworkers have no DOM access.
  importScripts('//localhost:3002/remoteEntry.js');

  // log from a local module
  localLogger();

  // import a remote module, and log from it
  const { remoteLogger } = await import('remote/remote-logger');
  remoteLogger();
})();