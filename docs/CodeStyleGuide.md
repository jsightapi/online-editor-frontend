# JSight Online Editor Frontend Code Style Guide

Please follow the guidelines outlined in this document and review it on a regular basis as we update
our rules from time to time.

* [Project Folder Structure](#project-folder-structure)
  + [Component Folder Structure](#component-folder-structure)
* [Coding Rules](#coding-rules)
  + [TypeScript](#typescript)
  + [General Formatting Rules](#general-formatting-rules)
  + [Linter](#linter)
  + [Functions](#functions)
  + [Interfaces](#interfaces)
  + [CSS Class Naming](#css-class-naming)
  + [Styles](#styles)
  + [Components](#components)
* [State Management](#state-management)
  + [Local State](#local-state)
  + [Context](#context)
* [Good practices](#good-practices)

## Project Folder Structure

```
.
├── public - Static files used in the built application. Root html template.
|
└── src - Application source files.
    |
    ├── api - Interfaces, methods and utilities for interacting with the REST API.
    |
    ├── assets - Connected assets (images, icons, fonts, etc.).
    |
    ├── components - Components.
    |
    ├── hooks - Custom hooks.
    |
    ├── screens - UI areas.
    |   |
    │   ├── Editor - Editor area (left).
    |   |
    │   └── Main - Main area (right).
    |
    ├── styles - General and global styles.
    |
    ├── textmate - Configuration and textmate themes.
    |   |
    │   └── themes - Textmate themes.
    |
    ├── types - Global types and interfaces.
    |
    └── utils - Auxiliary utilities.
```

**All entities (components) should be written in separate files in the appropriate folders.**

### Component Folder Structure

All components should have consistent folder structure.

When developing a new component, you can follow the folder structure of the component `Header` as a
model:

```
.
├── Header.styles.scss - Component styles (in SCSS syntax).
│
├── HeaderDoc.tsx - Child (nested) components.
│
├── MenuItems - Components that are menu items.
│   │
│   ├── DocsMenu.tsx - First menu item.
│   │
│   └── FileMenu.tsx - Second menu item.
│
└── index.tsx - Main file of the component.
```

- `index.tsx` should be the main component file.
- The component should be exported via named export and imported via named import.
- Child components should be located at the same level as the main component, but can be grouped
  into folders according to their own general logic.

## Coding Rules

Some guidelines for codebase standardization and uniformity.

### TypeScript

TypeScript is used to write the code, so all component props as well as function arguments should be
typed, while the use of the type `any` should be avoided whenever possible.

Interfaces are used for component props typing.

The general “thumb rule” is: **If the compiler asks to type something, it should be typed**.

If the compiler does not ask anything, no need to type. For example:

```ts
const [count, setCount] = useState(0); /* in this case, the type `number` may be omitted,
                                          since it will automatically be taken from 
                                          the default value */
```

### General Formatting Rules

Formatting rules are verified and corrected automatically by [Prettier](https://prettier.io/).

Basic rules:

- A double space is used as indentation for code adjustment.
- A semicolon (`;`) is used to end the string.
- Single quotes (`'string'`) are used in TypeScript code, including imports.
- Double quotes (`"string"`) are used in HTML/JSX templates and components.
- Instead of single quotes (`'string'`), you may also use backticks of template strings (`` `string`
  ``).
- Instead of string concatenation and concatenating string literals with variables, only template
  strings should be used  
  (`` `some text ${string1} ${string2}` ``).

### Linter

We use linter [ESLint](https://eslint.org/).

`@typescript-eslint/recommended` and `prettier/recommended` are used as basic rules, with some
modifications described in the configuration file `.eslintrc.js`.

### Functions

- An arrow function expression is used to declare functional components in the project.
- Functions should be declared everywhere with an arrow function expression unless absolutely
  necessary otherwise.
- A function name should begin with a verb denoting the action performed by the function, followed
  by the object; for example: `runSomething`, `getData`, `countValues`.
- Handlers should begin with the prefix `handle`: `handleClick`, `handleSubmit`, etc.
- Props for the handler should begin with the prefix `on`, for example:

  ```html
  <Component onClick={handleClick} />
  ```

### Interfaces

- Interfaces should be written without the prefix `I`.
- The postfix `Props` should be added for props at the end of the interface. For example:
  `MyComponentProps`.
- For other interfaces, the postfix is optional.

### CSS Class Naming

- For static class naming, a simplified BEM-like syntax is used: the element, if necessary, is
  separated from the block by the symbol `__` (double underscore). But if the number of child
  elements is small, there is no need to specify the parent, for example:
  - block name: `contact-modal`,
  - block element name: `contact-modal__title`,
  - another version of the block element name: `contact-modal-title`.

  The latter option is preferable if the `contact-modal` doesn’t have many child elements.

  Modifiers are set by separate classes (`active`, `expanded`, etc.) and are used like this:

  ```html
  <div className="some-element expanded" />
  ```

  ```scss
  .some-element {
      /* element style */
      ...

      .expanded {
          /* modified style */
          ...
      }
  }
  ```

- The library `clsx` is used for dynamic class naming.

### Styles

- SCSS is used to describe styles.
- The style file for a component should be located at the same level as the component itself.
- The style file should be named after the component name, with the addition of the postfix:
  `.styles`, should have the `.scss` extension, and be connected via import:

  ```ts
  import 'Component.styles.scss'
  ```

- Nesting of class names is allowed, however, it is highly recommended not to split class names in
  order to make the search easier:

  ```scss
  /* Good: */
  .modal {
    position: fixed;
    top: 0;
    left: 0;

    .modal-inner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  /* Bad: */
  .modal {
    position: fixed;
    top: 0;
    left: 0;

    &-inner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  ```

- Global styles are located in `./src/styles/globals.scss`.
- All variables should be located in `./src/styles/_variables.scss`.
- It is recommended to set indents and sizes in relative units if there is no mandatory requirement
  to set them in absolute ones (for example, fixed indents, size of a shadow, frame, etc.).

### Components

- Components and component directory names should begin with a capital letter (in Pascal Case). For
  example `MyComponent`.
- Components are defined using constants.
- Props should be typed using interfaces without using the generic `React.FC`. Interfaces should be
  named like `MyComonentsProps`.
- Therefore, if children are passed into the component, it should also be specified in the
  interface.
- All magic numbers should be extracted in separate constants.
- The component order is as follows:

  1. Imports.
  2. Constants.
  3. Interfaces.
  4. Component (logic, markup).

  **Example**

  ```ts
  import React from 'react';

  const SOME_CONST = 1000;

  interface MyComponentProps {
    ...
    someVar: number;
    onClick: () => void;
    children?: React.ReactNode; // If children are used.
  }

  export const MyComponent = (props: MyComponentProps) => {
    const { someVar, onAction, children } = props;
    const someFunc = () => {};
    ...

    return <div onClick={onClick}>{children}</div>;
  };
  ```

- Optionally, props can be destructured directly in the arguments:

  ```ts
  export const MyComponent = ({ someVar, onAction, children }: MyComponentProps) => {
    ...
  };
  ```

- Also, with a small number of props (no more than two), there is no need to create an interface for
  typing, simply specify their types directly in the arguments:

  ```ts
  export const MyComponent = ({ someString, someNumber }: { someString: string; someNumber: number }) => {
    ...
  };
  ```

## State Management

There are currently two types of component state storage:

- Local state.
- Context.

### Local State

- It is used if the component state does not affect other components (especially parent components),
  and there is no need to pass it deep into child components.
- The classic approach through the hook `useState` is used.

### Context

- It is used if the component state needs to be passed deep, or it depends/affects components that
  are outside the tree of the current component.
- The hook `useContext` is used.

## Good practices

Non mandatory requirements are listed below, but we try to write the code like this whenever
possible:

- Complex calculated values/functions that are passed down as props, or used in arrays of
  dependencies `useEffect`, or other memoized values/callbacks can be wrapped in
  `useMemo`/`useCallback`, respectively.  
  There are no mandatory requirements in this regard, and complexity is determined subjectively. The
  basic rule is: the volume of calculations and use as a prop or dependency.
- It is recommended that calculations and functions (for example, class names, or event handler
  functions) be extracted from the render (and, if necessary, memoized). Optionally, they can be
  left inline directly in the render if they occupy no more than three lines.
