1. Test for rules that have variable length values if it is long (like regex)

```
    JSIGHT 0.3
    
    TYPE @t
    {
    "openSidebarCard": "abc" // {optional: true, regex: ".*|abcdefgh|qwertyuiop|asdfghjkl|zxcvbnm"}
    }
```