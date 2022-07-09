interface TestOptions {
  /**
   * The number of tests that can be run at the same time. If unspecified, subtests inherit this value from their parent.
   * Default: 1.
   */
  concurrency?: number

  /**
   * If truthy, the test is skipped. If a string is provided, that string is displayed in the test results as the reason for skipping the test.
   * Default: false.
   */
  skip?: boolean | string

  /**
   * If truthy, the test marked as TODO. If a string is provided, that string is displayed in the test results as the reason why the test is TODO.
   * Default: false.
   */
  todo?: boolean | string
}

type TestFn = (t: TestContext) => any | Promise<any>

export default test

/**
 * @returns Whether `string` is a URL.
 */
declare function test (name: string, options: TestOptions, fn: TestFn): void
declare function test (name: string, fn: TestFn): void
declare function test (fn: TestFn): void

/**
 * An instance of TestContext is passed to each test function in order to interact with the test runner.
 * However, the TestContext constructor is not exposed as part of the API.
 */
export class TestContext {
  /**
   * This function is used to create subtests under the current test. This function behaves in the same fashion as the top level test() function.
   */
  public test (name: string, options: TestOptions, fn: TestFn): Promise<void>
  public test (name: string, fn: TestFn): Promise<void>
  public test (fn: TestFn): Promise<void>

  /**
   * This function is used to write TAP diagnostics to the output.
   * Any diagnostic information is included at the end of the test's results. This function does not return a value.
   *
   * @param message Message to be displayed as a TAP diagnostic.
   */
  public diagnostic (message: string): void

  /**
   * This function causes the test's output to indicate the test as skipped.
   * If message is provided, it is included in the TAP output.
   * Calling skip() does not terminate execution of the test function. This function does not return a value.
   *
   * @param message Optional skip message to be displayed in TAP output.
   */
  public skip (message?: string): void

  /**
   * This function adds a TODO directive to the test's output.
   * If message is provided, it is included in the TAP output.
   * Calling todo() does not terminate execution of the test function. This function does not return a value.
   *
   * @param message Optional TODO message to be displayed in TAP output.
   */
  public todo (message?: string): void
}
