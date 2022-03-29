# Method replace test

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

3. Check, that in reder POST method is selected.