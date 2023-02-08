# Changelog

## [3.3.0](https://github.com/nodejs/node-core-test/compare/v3.2.1...v3.3.0) (2023-02-08)


### Features

* add --test-name-pattern CLI flag ([c5fd64c](https://github.com/nodejs/node-core-test/commit/c5fd64cc2e2e22b35fd6c94d30dac34f281067ab))
* add extra fields in AssertionError YAML ([46dce07](https://github.com/nodejs/node-core-test/commit/46dce07d74b47a6d1a06eba2153c850db733b08d))
* add getter and setter to MockTracker ([b942f93](https://github.com/nodejs/node-core-test/commit/b942f93b5bfd70ad8f245c94048cfaffda4ee56a))
* add initial TAP parser ([5f8ce61](https://github.com/nodejs/node-core-test/commit/5f8ce617ddfa0feb41f52cdcc84e15eb4b59805d))
* add reporters ([1ec1348](https://github.com/nodejs/node-core-test/commit/1ec13482c663557c738311fa502eb29781c57287))
* add t.after() hook ([71b659e](https://github.com/nodejs/node-core-test/commit/71b659e171f9150f0c7737ce6ebce6bacee87d2d))
* parse yaml ([d1343a7](https://github.com/nodejs/node-core-test/commit/d1343a7074dd5ff1d9afaaf496f450b24c7f35d1))
* report `file` in test runner events ([10d6603](https://github.com/nodejs/node-core-test/commit/10d6603cf8710fd74ba4ed8e91674067193a13ee))
* support function mocking ([2e499ee](https://github.com/nodejs/node-core-test/commit/2e499ee084d2f5c10b5b8405904c397ad1eb517f))
* support programmatically running `--test` ([d885ee2](https://github.com/nodejs/node-core-test/commit/d885ee2860aff8098fff41c184081f3577f80b34))
* support using `--inspect` with `--test` ([6755536](https://github.com/nodejs/node-core-test/commit/6755536a5a94653de26be4dca1c0c6003217031f))
* verbous error when entire test tree is canceled ([012acb0](https://github.com/nodejs/node-core-test/commit/012acb04de00cdcf4dcbbb86a8c50fc27a112dcf))


### Bug Fixes

* avoid swallowing of asynchronously thrown errors ([cff397a](https://github.com/nodejs/node-core-test/commit/cff397a46139411528314d5a9399ae12e1b48660))
* call {before,after}Each() on suites ([0bfdb77](https://github.com/nodejs/node-core-test/commit/0bfdb77aeeb913aac43c5cac2c5333d42fde558b))
* don't use a symbol for runHook() ([b3b384e](https://github.com/nodejs/node-core-test/commit/b3b384e59bac89830dc188611e527b341d062d28))
* fix `duration_ms` to be milliseconds ([27241c3](https://github.com/nodejs/node-core-test/commit/27241c3cd27ab4321ee8177ec1d44a49c261dd42))
* fix afterEach not running on test failures ([f2815af](https://github.com/nodejs/node-core-test/commit/f2815afc2ff26902d027c0dba85eed773040c1a2))
* fix missing test diagnostics ([b5b3f0b](https://github.com/nodejs/node-core-test/commit/b5b3f0bebb1bbc4fb1d4f2be6262722262f877ef))
* fix tap parser fails if a test logs a number ([66da6fe](https://github.com/nodejs/node-core-test/commit/66da6feed4dd30b9c631b4e12b5ea3676af0fe83))
* include stack of uncaught exceptions ([c50f844](https://github.com/nodejs/node-core-test/commit/c50f8448b6eb0466fbb8bdde7b1edbe4c2c9a9ee))
* make built in reporters internal ([b6177a4](https://github.com/nodejs/node-core-test/commit/b6177a4c24190d366bb3c62abc1e9f1f092b57cd))
* move test reporter loading ([a5e0e9e](https://github.com/nodejs/node-core-test/commit/a5e0e9e4d873ee2e91fe8a3f5b4c2018dbfb01c7))
* remove stdout and stderr from error ([5ba2500](https://github.com/nodejs/node-core-test/commit/5ba2500c4bd30cf4246a0927f7dc1e25c4280a67))
* report tap subtest in order ([08269c5](https://github.com/nodejs/node-core-test/commit/08269c5d1d213ceb8ef9c0ab0c56172835c76d8f))
* run t.after() if test body throws ([c80e426](https://github.com/nodejs/node-core-test/commit/c80e426984408b2ef131ad05e2beb61715482046))
* top-level diagnostics not ommited when running with --test ([d6f071a](https://github.com/nodejs/node-core-test/commit/d6f071a94bfad8baefae71bd34fcf72a605a8460))

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
