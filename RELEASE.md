# Release

`git tag -a <version> -m "First release"`

`git push origin <version>` -> This will trigger an action and build the image with the correct tag

Create the release on [Github](https://github.com/ln-markets/umbrel/releases/new)

Fork [umbrel-apps](https://github.com/getumbrel/umbrel-apps) repo.

Update the `lnmarkets` folder with the correct image sha
Use the tagged image and the corresponding sha256 hash

`ghcr.io/ln-markets/umbrel:v2.0.0@sha256:47b836cd23f7aa9f31aa4ae99ba66f74ffc513388016e31a00f6cb0767144bae`
