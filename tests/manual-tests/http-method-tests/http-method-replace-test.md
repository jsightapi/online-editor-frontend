# Method replace test #1

1. Enter:

  ```
  JSIGHT 0.3

  GET /cats
    200
      "OK"
  ```

2. Change GET to POST:

  ```
  JSIGHT 0.3

  POST /cats
    200
      "OK"
  ```

3. Check, that in rendered documentation POST method is selected.

# Method replace test #2

1. Enter:

  ```
  JSIGHT 0.3

  URL /1
    GET
    POST
  ```

2. Select POST tab in rendered documentation.
3. Remove POST in the code:
  ```
  JSIGHT 0.3

  URL /1
    GET
  ```
4. Check, that in rendered documentation GET tab is automatically selected.