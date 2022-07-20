# Changelog

## [3.1.0](https://github.com/nodejs/node-core-test/compare/v3.0.1...v3.1.0) (2022-07-20)


### Features

* add Subtest to tap protocol output ([fc0256b](https://github.com/nodejs/node-core-test/commit/fc0256b4fb5a4232e5100dd662c4d0edfaa98a36))
* cancel on termination ([826048c](https://github.com/nodejs/node-core-test/commit/826048cc350c9f5a92e0681b50d0659241806b0f))
* expose `describe` and `it` ([e29cd3f](https://github.com/nodejs/node-core-test/commit/e29cd3f4a9488a9b9322f31a32f7014b5b330b4e))
* support timeout for tests ([5b6851f](https://github.com/nodejs/node-core-test/commit/5b6851f6ddc2b7fe71493143edf619dbf3bfa2af))


### Bug Fixes

* catch errors thrown within `describe` ([4ca48af](https://github.com/nodejs/node-core-test/commit/4ca48af2690ae7ef9fbd811ffffd08355ca6a856))
* **ci:** fix package name in `release-please.yml` ([#25](https://github.com/nodejs/node-core-test/issues/25)) ([c132f7e](https://github.com/nodejs/node-core-test/commit/c132f7e5dd0e6f84f8005b5074711b6e3d30657c))
* **doc:** improve test runner timeout docs ([751ffc6](https://github.com/nodejs/node-core-test/commit/751ffc69b514e5a744e07366991d1811d5736ba3))
* fix `it` concurrency ([0a81cfc](https://github.com/nodejs/node-core-test/commit/0a81cfcf662cce0e17c3f85d6e6c299c618a0b13))
* wait for stderr and stdout to complete ([bee4a6a](https://github.com/nodejs/node-core-test/commit/bee4a6abd87a2edd9dbdfb2749cedba02bf4230e))

## [3.0.1](https://github.com/nodejs/node-core-test/compare/v3.0.0...v3.0.1) (2022-06-15)


### Bug Fixes

* **doc:** add link to LICENSE in README ([#16](https://github.com/nodejs/node-core-test/issues/16)) ([c3ca913](https://github.com/nodejs/node-core-test/commit/c3ca9130cd60391db4953aecd942b38a2669209e))

## [3.0.0](https://github.com/nodejs/node-core-test/compare/v2.0.0...v3.0.0) (2022-06-02)


### ⚠ BREAKING CHANGES

* move to nodejs org (#9)

### Features

* add `node--test-only` bin ([#10](https://github.com/nodejs/node-core-test/issues/10)) ([077a601](https://github.com/nodejs/node-core-test/commit/077a60116da82b2c2d46a1d9760c59e15d3c9980))


### Code Refactoring

* move to nodejs org ([#9](https://github.com/nodejs/node-core-test/issues/9)) ([659f7da](https://github.com/nodejs/node-core-test/commit/659f7dae35dc14939b1f090268005f5a43498923))
