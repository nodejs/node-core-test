interface TestOptions {
  /**
   * If a number is provided, then that many tests would run in parallel. If
   * truthy, it would run (number of cpu cores - 1) tests in parallel. For
   * subtests, it will be Infinity tests in parallel. If falsy, it would only
   * run one test at a time. If unspecified, subtests inherit this value from
   * their parent.
   *
   * @default false
   */
  concurrency?: boolean | number;

  /**
   * If truthy, and the test context is configured to run only tests, then this
   * test will be run. Otherwise, the test is skipped.
   *
   * @default false
   */
  only?: boolean;

  /**
   * If truthy, the test is skipped. If a string is provided, that string is
   * displayed in the test results as the reason for skipping the test.
   *
   * @default false
   */
  skip?: boolean | string;

  /**
   * If truthy, the test marked as TODO. If a string is provided, that string is
   * displayed in the test results as the reason why the test is TODO.
   *
   * @default false
   */
  todo?: boolean | string;

  /**
   * A number of milliseconds the test will fail after. If unspecified, subtests
   * inherit this value from their parent.
   *
   * @default Infinity
   */
  timeout?: number;

  /** Allows aborting an in-progress test */
  signal?: AbortSignal;
}

type TestFn = (t: TestContext, done: (result?: any) => void) => any;

export default test;

/**
 * @param name The name of the test, which is displayed when reporting test
 *   results. Default: The name property of fn, or '<anonymous>' if fn does not
 *   have a name.
 * @param options Configuration options for the test.
 * @param fn The function under test. The first argument to this function is a
 *   TestContext object. If the test uses callbacks, the callback function is
 *   passed as the second argument. Default: A no-op function.
 * @returns A {@link Promise} resolved with `undefined` once the test completes.
 */
export function test(
  name: string,
  options: TestOptions,
  fn: TestFn
): Promise<void>;
export function test(name: string, fn: TestFn): Promise<void>;
export function test(options: TestOptions, fn: TestFn): Promise<void>;
export function test(fn: TestFn): Promise<void>;

type SuiteFn = (t: SuiteContext) => void;

/**
 * @param name The name of the suite, which is displayed when reporting test
 *   results. Default: The name property of fn, or '<anonymous>' if fn does not
 *   have a name.
 * @param options Configuration options for the suite. supports the same options
 *   as test([name][, options][, fn]).
 * @param fn The function under suite declaring all subtests and subsuites. The
 *   first argument to this function is a SuiteContext object. Default: A no-op
 *   function.
 * @returns `undefined`
 */
export function describe(name: string, options: TestOptions, fn: SuiteFn): void;
export function describe(name: string, fn: SuiteFn): void;
export function describe(options: TestOptions, fn: SuiteFn): void;
export function describe(fn: SuiteFn): void;

type ItFn = (done: (result?: any) => void) => any;

/**
 * @param name The name of the test, which is displayed when reporting test
 *   results. Default: The name property of fn, or '<anonymous>' if fn does not
 *   have a name.
 * @param options Configuration options for the suite. supports the same options
 *   as test([name][, options][, fn]).
 * @param fn The function under test. If the test uses callbacks, the callback
 *   function is passed as an argument. Default: A no-op function.
 * @returns `undefined`
 */
export function it(name: string, options: TestOptions, fn: ItFn): void;
export function it(name: string, fn: ItFn): void;
export function it(options: TestOptions, fn: ItFn): void;
export function it(fn: ItFn): void;

type HookFn = (done: (result?: any) => void) => any;

/**
 * This function is used to create a hook running before running a suite.
 *
 * @param fn The hook function. If the hook uses callbacks, the callback
 *   function is passed as the second argument. Default: A no-op function.
 * @param options Configuration options for the hook.
 */
export function before(fn?: HookFn, options?: HookOptions): void;

/**
 * This function is used to create a hook running after running a suite.
 *
 * @param fn The hook function. If the hook uses callbacks, the callback
 *   function is passed as the second argument. Default: A no-op function.
 * @param options Configuration options for the hook.
 */
export function after(fn?: HookFn, options?: HookOptions): void;

/**
 * This function is used to create a hook running before each subtest of the
 * current suite.
 *
 * @param fn The hook function. If the hook uses callbacks, the callback
 *   function is passed as the second argument. Default: A no-op function.
 * @param options Configuration options for the hook.
 */
export function beforeEach(fn?: HookFn, options?: HookOptions): void;

/**
 * This function is used to create a hook running after each subtest of the
 * current test.
 *
 * @param fn The hook function. If the hook uses callbacks, the callback
 *   function is passed as the second argument. Default: A no-op function.
 * @param options Configuration options for the hook.
 */
export function afterEach(fn?: HookFn, options?: HookOptions): void;

/**
 * An instance of TestContext is passed to each test function in order to
 * interact with the test runner. However, the TestContext constructor is not
 * exposed as part of the API.
 */
declare class TestContext {
  /**
   * This function is used to create a hook running before each subtest of the
   * current test.
   */
  public beforeEach: typeof beforeEach;

  /**
   * This function is used to create a hook running after each subtest of the
   * current test.
   */
  public afterEach: typeof afterEach;

  /**
   * This function is used to create subtests under the current test. This
   * function behaves in the same fashion as the top level test() function.
   */
  public test: typeof test;

  /**
   * This function is used to write TAP diagnostics to the output. Any
   * diagnostic information is included at the end of the test's results. This
   * function does not return a value.
   *
   * @param message Message to be displayed as a TAP diagnostic.
   */
  public diagnostic(message: string): void;

  /** The name of the test. */
  public name: string;

  /**
   * If `shouldRunOnlyTests` is truthy, the test context will only run tests
   * that have the `only` option set. Otherwise, all tests are run. If Node.js
   * was not started with the `--test-only` command-line option, this function
   * is a no-op.
   *
   * @param shouldRunOnlyTests Whether or not to run `only` tests.
   */
  public runOnly(shouldRunOnlyTests: boolean): void;

  /**
   * This function causes the test's output to indicate the test as skipped. If
   * message is provided, it is included in the TAP output. Calling skip() does
   * not terminate execution of the test function. This function does not return
   * a value.
   *
   * @param message Optional skip message to be displayed in TAP output.
   */
  public skip(message?: string): void;

  /**
   * This function adds a TODO directive to the test's output. If message is
   * provided, it is included in the TAP output. Calling todo() does not
   * terminate execution of the test function. This function does not return a
   * value.
   *
   * @param message Optional TODO message to be displayed in TAP output.
   */
  public todo(message?: string): void;

  /** Can be used to abort test subtasks when the test has been aborted. */
  public signal: AbortSignal;
}

/**
 * An instance of SuiteContext is passed to each suite function in order to
 * interact with the test runner. However, the SuiteContext constructor is not
 * exposed as part of the API.
 */
declare class SuiteContext {
  /** Can be used to abort test subtasks when the test has been aborted. */
  public signal: AbortSignal;
}

/** Configuration options for hooks. */
interface HookOptions {
  /** Allows aborting an in-progress hook. */
  signal?: AbortSignal;

  /**
   * A number of milliseconds the hook will fail after. If unspecified, subtests
   * inherit this value from their parent.
   *
   * @default Infinity
   */
  timeout?: number;
}
