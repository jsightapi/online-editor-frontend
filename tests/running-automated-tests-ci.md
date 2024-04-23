## How to run e2e automated tests remotely (CI/CD)

1. Open the **[CircleCI Dashboard](https://app.circleci.com/pipelines/github/jsightapi)**, **"All Pipelines"** section.
2. In the filter section...
    1. Select the **Project** = "**online-editor-e2e**".
    2. Select the **Branch** (e.g. "**main**").
3. Click **"Trigger Pipeline"** button above.
4. In the "**Add Parameters**" section...
    - (Required) Add `boolean` parameter `fire` with value `true`.
    - (Optional) Add another parameter(s), e.g.:

      | Type    | Name              | Value                                       | Description                                                                                                                                 |
      |---------|-------------------|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
      | string  | env               | `dev` (or `stage`)                          | To run tests on the corresponding environment.                                                                                              |
      | string  | maven-test        | internal name of the test class/test method | To run a specific test(s), e.g. `CodeViewTest`.                                                                                             |
      | integer | junit-parallelism | `2` (`3`, `4`, etc)                         | For a number of threads, to run tests in parallel.                                                                                          |
      | string  | add-params        | comma-separated list of `-Dkey=value`       | Additional parameters for the Maven run, <br/> e.g. `-Dselenide.browser=firefox, -Dselenide.browserVersion=123.0, -Dselenide.timeout=8000`. |

   _Note: the job with only default `fire = true` parameter will run all the tests on the default DEV environment. See `.circleci/config.yml` for more details._
5. Click **"Trigger Pipeline"** button in the modal window.
6. Wait for the pipeline to finish, and open the **"run-e2e"** job.
7. Check the failed tests list (if any) in the "**Tests**" tab.
8. Check the **Allure Report** in the "**Artifacts**" tab (open the one with `target/site/allure-maven-plugin/index.html` link)