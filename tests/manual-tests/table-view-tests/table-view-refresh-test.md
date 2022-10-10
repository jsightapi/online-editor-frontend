1. Enter the code (see below).
2. Copy with Ctrl+C the schema under `/test2` request query.
3. Paste this schema with Ctrl+V instead of `/test1` request query schema.
4. Check, that everything is ok in the Table View.

```
JSIGHT 0.3

POST /test1
  Query
  {
    "cat": [
      @cat,
      @dog
    ]
  }

POST /test2
  Query
  {
    "cat": [
      @cat,
      @dog
    ]
  }

TYPE @cat
{}

TYPE @dog
{}
```