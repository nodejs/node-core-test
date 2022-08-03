# Changelog

## [3.2.1](https://github.com/nodejs/node-core-test/compare/v3.2.0...v3.2.1) (2022-08-03)


### Bug Fixes

* make test runner work even if there is no `AbortSignal` support ([#36](https://github.com/nodejs/node-core-test/issues/36)) ([cb2e4fd](https://github.com/nodejs/node-core-test/commit/cb2e4fd52e782de13dfae3ac3a371aa7e0e94c29))

## [3.2.0](https://github.com/nodejs/node-core-test/compare/v3.1.0...v3.2.0) (2022-08-01)


### Features

* add before/after/each hooks ([4ed5d1f](https://github.com/nodejs/node-core-test/commit/4ed5d1fe91d4491889cdfe09f44804b1e7442dad))
* add support for boolean values for `concurrency` option ([ba8fd71](https://github.com/nodejs/node-core-test/commit/ba8fd7183db7df0a72b2cab2a37ef1e1e6077185))
* graceful termination on `--test` only ([4071052](https://github.com/nodejs/node-core-test/commit/40710523a76bf6cc182120e82763ddbdb3ceb1be))
* pass signal on timeout ([3814bf0](https://github.com/nodejs/node-core-test/commit/3814bf04a3b2adea7dda1cf462c03b575eedf46f))
* recieve and pass AbortSignal ([558abfc](https://github.com/nodejs/node-core-test/commit/558abfc9a691e02f191c61ba16b976c9d5604da1))
* validate `concurrency` option ([f875da2](https://github.com/nodejs/node-core-test/commit/f875da2bd834f710d4bde40f77bf848f8700de20))
* validate `timeout` option ([cf78656](https://github.com/nodejs/node-core-test/commit/cf78656f4293253a69d04a1fd4cdc6324d49ee4d))


### Bug Fixes

* do not report an error when tests are passing ([10146fa](https://github.com/nodejs/node-core-test/commit/10146fa81daa5b808710519b6d458e5d5180f7ba))
* **doc:** add missing test runner option ([b8bc3be](https://github.com/nodejs/node-core-test/commit/b8bc3be6155c7546b619869948d3b0506eeaca36))
* **doc:** copyedit `README.md` ([1401584](https://github.com/nodejs/node-core-test/commit/1401584d141b73bab022995f09245436f10727f4))
* **doc:** fix typos in `test.md` ([8c95f07](https://github.com/nodejs/node-core-test/commit/8c95f07f186f23ba47750d3f1ec5468a6581c96b))
* empty pending tests queue post running ([2f02171](https://github.com/nodejs/node-core-test/commit/2f02171b589e19aaf427f9a1ea2efda719ef11b7))
* fix top level `describe` queuing ([c6f554c](https://github.com/nodejs/node-core-test/commit/c6f554c8b7e64bcb45bfde254d493fd199a712dd))
* **test:** ensure all tests are run and fix failing ones ([#33](https://github.com/nodejs/node-core-test/issues/33)) ([215621e](https://github.com/nodejs/node-core-test/commit/215621e8de2bb98cf940a0eef40adf8c33a1d9b7))

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
