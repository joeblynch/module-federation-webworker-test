# Module Federation Webworker Test

Minimal reproduction example to demonstrate error [for this issue](https://github.com/webpack/webpack/issues/12780) when loading a module federation remote from a webworker script that's
built using a `target: 'webworker'` webpack configuration.

**NOTE:** This project uses `patch-package` to apply the `publicPath`
[fix](https://github.com/webpack/webpack/pull/12612/) for [this issue](https://github.com/webpack/webpack/issues/12577).

## Error reproduction
1. Run `yarn` to install dependencies.
2. Run `yarn serve` to serve prebuilt dist (or `yarn start` to serve from source).
3. Load http://localhost:3001, the console should show the error `Uncaught (in promise) DOMException: Failed to execute 'importScripts' on 'WorkerGlobalScope': The script at 'http://localhost:3001/webpack_container_remote_remote_remote-logger.js' failed to load.`
4. Using the workaround below, the message `Hello from the remote logger` should appear on the page.

## Workaround
Comment out [this line](packages/main/webpack.config.js#L7), so that the main webworker script is not compiled using the
`webworker` target. While this resolves the remote loading issue, presumably it would prevent chunk splitting from
working, as the `importScripts` is replaced with a `JSONP` chunk loader.
