<div align="center">
	
<div>  
  &nbsp; 
</div>
	
<a href="https://jsight.io" align="left"><img src="./img/jsight-logo.svg" alt="Try now!" width="148px"/></a>
	
# JSight Online Editor (Frontend)

  [![React](https://badges.aleen42.com/src/react.svg)](https://reactjs.org/)
  [![Telegram support](https://img.shields.io/badge/Support-Telegram-blue)](https://t.me/jsight_support)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
  [![License](https://img.shields.io/github/license/jsightapi/online-editor-frontend?colorB=ff0000)](./LICENSE)
  [![JSight on Facebook](https://img.shields.io/badge/Facebook-1877F2?logo=facebook&logoColor=white)](https://www.facebook.com/jsightapi)
  [![JSight on LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/company/jsightapi/)
  [![Twitter Follow](https://img.shields.io/twitter/follow/jsightapi.svg?style=social)](https://twitter.com/jsightapi)

<div>  
  &nbsp; 
</div>
	
  <a href="https://www.alchemistaccelerator.com/portfolio?class=29"><img width="300px" style="background-color: white;" src="./img/alchemist.svg" alt="Alchemist Accelerator"/></a>
<div>  
  &nbsp; 
</div>
	
  :star: **Star us on GitHub — it motivates us a lot!** :star:
	
<div>  
  &nbsp; 
</div>
</div>

**JSight Online Editor** – you've never designed API so fast. We really mean it.

1. Write 2-4 times less code.
2. Design API 2-3 times faster.
3. Download beautiful HTML docs :book: or share API specifications in the cloud [:cloud:](https://editor.jsight.io).
4. Do not distract from the API design because of the API description process.
5. Design API together, it is extremely convenient with JSight language.  
  No more multiple design iterations and edits required. All you need is to share the screen between
  the participants and come up with an API together right in the Editor. All this is possible thanks
  to the compactness and simplicity of the JSight language.  
  [Compare JSight with Open API](#scroll--jsight-api-language).

<div>  
  &nbsp; 
</div>

<blockquote>
  &nbsp;
	
  *“JSight is as much simpler than OpenAPI as Markdown is simpler than HTML. At the same time,
  JSight is just as powerful.”*  

  <img src="https://avatars.githubusercontent.com/u/101567029?v=4" align="left" width="40"
  height="40" alt=""/>

  Constantine M., JSight CRDO.

  &nbsp;

</blockquote>

<div align="center">
	
  <a href="https://editor.jsight.io"><img src="./img/try.svg" alt="Try now!" width="300px"/></a>
 
  <div>  
    &nbsp; 
  </div>
	
</div>

[List of JSight Online Editor features.](#book--features)

<div>  
  &nbsp; 
</div>

## :hatching_chick: &nbsp; Quick Start

&nbsp;

<div align="center">
	
  <a href="https://jsight.io/docs/jsight-api-0-3-quick-tutorial"><img src="./img/tab1.svg" alt="Quick tutorial"/></a>&nbsp;&nbsp;
  <a href="https://jsight.io/docs/jsight-api-0-3"><img src="./img/tab3.svg" alt="JSight API Language specification"/></a>
	
</div>

&nbsp;

![Demo](./img/demo.gif)

<div>  
  &nbsp; 
</div>

## :book: &nbsp; Table of Contents

* [Getting Started](#rocket--getting-started)
* [JSight API Language](#scroll--jsight-api-language)
* [Features](#book--features)
* [Roadmap](#date--roadmap)
* [Configuration](#clipboard--configuration)
* [Versioning](#bookmark_tabs--versioning)
* [Dependencies](#notebook_with_decorative_cover--dependencies)
* [General Architecture](#triangular_ruler--general-architecture)
* [Testing](#test_tube--testing)
* [Contributing](#sunglasses--contributing)
* [Bugs and Feature Requests](#speech_balloon--bugs-and-feature-requests)
* [Support](#grey_question--support)
* [License](#receipt--license)
* [Resources](#book--resources)
* [Partners](#handshake--partners)
* [Acknowledgments](#trophy--acknowledgments)

<div>  
  &nbsp; 
</div>

## :rocket: &nbsp; Getting Started

### Browser Support

JSight Online Editor officially supports the latest browsers:

- Chrome 102.0, 
- Firefox 101.0,
- Safari 15.3.

### Installing

<details>
  <summary>Running Locally</summary>

#### Prerequisites

- Node.js >= 14.18 — [download](https://nodejs.org/en/download/).
- npm >= 8.3.2 —  included in the Node.js distribution.
- Git >= 2.33 — [download](https://git-scm.com/downloads).
- Docker >= 20.10 — [download](https://www.docker.com/get-started/).
- Docker Compose >= 2.2 — [install](https://docs.docker.com/compose/install/).

#### Installing

<table>
<tbody>
<tr valign="top">
<td>

Download the JSight Online Editor source code:

</td>
<td>

```
git clone https://github.com/jsightapi/online-editor-frontend
```

</td>
</tr>
<tr>
</tr>
<tr valign="top">
<td>

Navigate to the repository folder:

</td>
<td>

```
cd ./online-editor-frontend/
```

</td>
</tr>
<tr>
</tr>
<tr valign="top">
<td>

Start JSight Server (on port 8080):

> **NOTE:** You can also build JSight Server from source, see [installation
> instructions](http://github.com/jsightapi/jsight-server/blob/main/README.md#rocket--getting-started).

</td>
<td>

```
SERVER_HOST_PORT=8080 docker-compose -f jsight-server-docker-compose.yml up -d
```

</td>
</tr>
<tr>
</tr>
<tr valign="top">
<td>

Check that the JSight Server is working by running the following command:

</td>
<td>

Linux:

```
curl --location --request POST "http://localhost:8080/" \
--header "Content-Type: text/plain" \
--data-raw "JSIGHT 0.3"
```

Windows cmd:

```
curl --location --request POST "http://localhost:8080/" ^
--header "Content-Type: text/plain" ^
--data-raw "JSIGHT 0.3"
```

Windows PowerShell:

```
curl --location --request POST "http://localhost:8080/" `
--header "Content-Type: text/plain" `
--data-raw "JSIGHT 0.3"
```

</td>
</tr>
<tr>
</tr>
<tr valign="top">
<td>

If everything is in order, then you should receive a json in response, something like this:

</td>
<td>

```
{"jdocExchangeFileSchemaVersion":"0.3.0","jsight":"0.3","resourceMethods":{},"tags":{}}
```

</td>
</tr>
<tr>
</tr>
<tr valign="top">
<td>

Install required packages.

</td>
<td>

```
npm install --legacy-peer-deps
```

</td>
</tr>
<tr>
</tr>
<tr valign="top">
<td>

Start JSight Online Editor:

</td>
<td>

```
npm start
```

</td>
</tr>
<tr>
</tr>
<tr valign="top">
<td>

JSight Online Editor should open in a browser at http://localhost:3000/.

</td>
<td align="middle">

<img src="./img/localhost3000.png"/>

</td>
</tr>
</tbody>
</table>

&nbsp;

For more information on configuring the application, see the
[Configuration](#clipboard--configuration).

> :warning: **SUPPORT:** If you encounter any problems while launching JSight Online Editor, do not
> hesitate to contact our support, and we will respond as soon as possible:  
> Email: support@jsight.io  
> Telegram: https://t.me/jsight_support

&nbsp;

</details>

<details>
  <summary>Building and Running an Image Locally</summary>

#### Prerequisites

- Git >= 2.33 — [download](https://git-scm.com/downloads).
- Docker >= 20.10 — [download](https://www.docker.com/get-started/).
- Docker Compose >= 2.2 — [install](https://docs.docker.com/compose/install/).

#### Installing

<table>
<tbody>
<tr valign="top">
<td>

Download the JSight Online Editor source code:

</td>
<td>

```
git clone https://github.com/jsightapi/online-editor-frontend
```

</td>
</tr>
<tr>
</tr>
<tr valign="top">
<td>

Navigate to the repository folder:

</td>
<td>

```
cd ./online-editor-frontend/
```

</td>
</tr>
<tr>
</tr>
<tr valign="top">
<td>

Build and start JSight Online Editor:

> This command will launch two docker containers: the JSight Online Editor frontend and the JSight
> Server.

</td>
<td>

```
FE_HOST_PORT=80 SERVER_HOST_PORT=8080 docker-compose -f docker-compose.yml up -d --build
```

</td>
</tr>
<tr>
</tr>
<tr>
</tr>
<tr valign="top">
<td>

The JSight Online Editor should open in a browser at http://localhost/.

</td>
<td align="middle">

<img src="./img/localhost.png"/>

</td>
</tr>
</tbody>
</table>

&nbsp;

For more information on configuring the application, see the
[Configuration](#clipboard--configuration).

> :warning: **SUPPORT:** If you encounter any problems while launching JSight Online Editor, do not
> hesitate to contact our support, and we will respond as soon as possible:  
> Email: support@jsight.io  
> Telegram: https://t.me/jsight_support

</details>

<div>  
  &nbsp; 
</div>

## :scroll: &nbsp; JSight API language

The JSight API language allows you to specify REST APIs with incredible speed and convenience. More
information can be found in the [Quick
Tutorial](https://jsight.io/docs/jsight-api-0-3-quick-tutorial) or in the [language
specification](https://jsight.io/docs/jsight-api-0-3).

JSight API language video lessons:

<div align="center">

<a href="https://www.youtube.com/watch?v=AegCETY9Cdk&list=PLy9sOecVhlybvRoDhGlzyMwKVxR-gFkdX"><img width="40%" src="./img/lesson1.png" alt="JSight API. Lesson 1" /></a>

</div>

Here we give examples of the same API described using JSight API and OpenAPI.

<details open><summary>Example 1. The simplest</summary>

<table align="center">
<thead>
<tr>
  <th width="50%">
    JSight API 0.3
  </th>
  <th>
    OpenAPI 3.0.1 (Swagger)
  </th>
</tr>
</thead>
<tbody>
<tr valign="top">
<td>

```
JSIGHT 0.3

GET /cats/{id}
  200
    {
      "id"  : 123, // {min: 1}
      "name": "Tom"
    }
```

Pay attention to the main feature of the JSight API language. **The basis for a data schema is an
example of valid data.** Additional data requirements are specified in C-like comments. This
approach greatly simplifies the data schema and makes it intuitively clear. Practice shows that such
schema is very simple to create, read and edit.

Learn more about the JSight language: [Quick
Tutorial](https://jsight.io/docs/jsight-api-0-3-quick-tutorial/).

<div align="center">

:star: **Star us on GitHub — it motivates us a lot!**

</div>

</td>
<td>

```
openapi: 3.0.1
info:
  title: ""
  version: ""
paths:
  /cats/{id}:
    get:
      parameters:
      - name: id
        in: path
        required: true
        schema: {}
      responses:
        200:
          description: ""
          content:
            application/json:
              schema:
                type: object
                required: [id, name]
                properties:
                  id:
                    type: integer
                    minimum: 1
                    example: 123
                  name:
                    type: string
                    example: "Tom"
```
	
</td>
</tr>
</tbody>
</table>

</details>

<details><summary>Example 2: User Types</summary>

<table align="center">
<thead>
<tr>
  <th width="50%">
    JSight API 0.3
  </th>
  <th>
    OpenAPI 3.0.1 (Swagger)
  </th>
</tr>
</thead>
<tbody>
<tr valign="top">
<td>

```
JSIGHT 0.3
 
GET /cats      // Get all cats.
  200
    [@cat]

GET /cats/{id} // Get a cat by its id.
  200
    @cat
  
TYPE @cat      // Type “Cat”.
  {
    "id"  : 123,  // ID of the cat.
    "name": "Tom" // Name of the cat.
  }
```

Pay attention to how convenient it is to work with user types in JSight API. The type name is simply
inserted where the type should be in the data schema. Everything is the same as in conventional
programming languages.

More about user types: [Quick Tutorial. Lesson 2. User
types](https://jsight.io/docs/jsight-api-0-3-quick-tutorial/lesson02).

<div align="center">

:star: **Star us on GitHub — it motivates us a lot!**

</div>

</td>
<td>

```
openapi: 3.0.3
info:
  title: ""
  version: ""
paths:
  /cats:
    get:
      summary: Get all cats.
      responses:
        200:
          description: ""
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Cat'
  /cats/{id}:
    get:
      summary: Get a cat by its id.
      parameters:
      - name: id
        in: path
        required: true
        schema: {}
      responses:
        200:
          description: ""
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Cat'
components:
  schemas:
    Cat:
      description: Type “Cat”.
      type: object
      required: [id, name]
      properties:
        id:
          description: ID of the cat.
          type: integer
          minimum: 0
          example: 123
        name:
          description: Name of the cat.
          type: string
          example: "Tom"
```
	
</td>
</tr>
</tbody>
</table>

</details>

<details><summary>Example 3: Schema</summary>

<table align="center">
<thead>
<tr>
  <th width="50%">
    JSight API 0.3
  </th>
  <th>
    OpenAPI 3.0.1 (Swagger)
  </th>
</tr>
</thead>
<tbody>
<tr valign="top">
<td>

```
JSIGHT 0.3

TYPE @cat
{
  "id"      : 123,
  "name"    : "Tom",
  "birthday": "2006-01-02",          // {type: "date" }
  "email"   : "tom@cats.com",        // {type: "email"}
  "website" : "http://tom.cats.com", // {type: "uri"  }
  "salary"  : 13.23,                 // {precision: 2 }
  "friends" : [                      // {maxItems: 10 }
    @cat
  ],
  "bestFriend": @cat,       // {optional: true}
  "size"    : "XL"          // {enum: ["M", "L", "XL"]}
}
```

Details that are not obvious from the example of valid data are provided in small JSON objects in
C-like comments. This approach allows you to write data schemas of any complexity, while keeping
them compact and intuitive.

More about JSight Schema: [Quick Tutorial. Lesson 4.
Schemas](https://jsight.io/docs/jsight-api-0-3-quick-tutorial/lesson04).

<div align="center">

:star: **Star us on GitHub — it motivates us a lot!**

</div>

</td>
<td>

```
openapi: 3.0.3
info:
  title: ""
  version: ""
paths: {}
components:
  schemas:
    Cat:
      type: object
      required:
        - id
        - name
        - birthday
        - email
        - website
        - salary
        - friends
        - size
      properties:
        id:
          type: integer
          minimum: 0
          example: 123
        name:
          type: string
          example: "Tom"
        birthday:
          type: string
          format: date
          example: 2006-01-02
        email:
          type: string
          format: email
          example: "tom@cats.com"
        website:
          type: string
          format: uri
          example: "http://tom.cats.com"
        salary:
          type: number
          multipleOf: 0.01
          example: 13.23
        friends:
          type: array
          items:
            $ref: '#/components/schemas/Cat'
        bestFriend:
          $ref: '#/components/schemas/Cat'
        size:
          type: string
          enum: [M, L, XL]
          example: XL
```
	
</td>
</tr>
</tbody>
</table>

</details>

<details><summary>Example 4. POST</summary>

<table align="center">
<thead>
<tr>
  <th width="50%">
    JSight API 0.3
  </th>
  <th>
    OpenAPI 3.0.1 (Swagger)
  </th>
</tr>
</thead>
<tbody>
<tr valign="top">
<td>

```
JSIGHT 0.3
 
POST /cats // Create a new cat.
  Request
    {
      "id"  : 123,
      "name": "Tom"
    }
 
  200
    "OK" // {const: true}
 
  404 any
  500 empty
```

Please note that the POST request and the three response options are written in a clear and concise
manner.

More about requests and responses: [Quick Tutorial. Lesson 6. Requests and
Responses](https://jsight.io/docs/jsight-api-0-3-quick-tutorial/lesson06).

<div align="center">

:star: **Star us on GitHub — it motivates us a lot!**

</div>

</td>
<td>

```
openapi: 3.0.3
info:
  title: ""
  version: ""
paths:
  /cats:
    post:
      summary: "Create a new cat"
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [id, name]
              properties:
                id:
                  type: integer
                  minimum: 0
                  example: 123
                name:
                  type: string
                  example: "Tom"          
      responses:
        200:
          description: ""
          content:
            application/json:
              schema:
                type: string
                enum: ["OK"]
        404:
          description: ""
          content:
            application/json:
              schema: {}
        500:
          description: ""
```
	
</td>
</tr>
</tbody>
</table>

</details>

<details><summary>Example 5: Inheritance</summary>

<table align="center">
<thead>
<tr>
  <th width="50%">
    JSight API 0.3
  </th>
  <th>
    OpenAPI 3.0.1 (Swagger)
  </th>
</tr>
</thead>
<tbody>
<tr valign="top">
<td>

```
JSIGHT 0.3

TYPE @pet
{
  "id"  : 123,
  "name": "Tom"
}

TYPE @cat
{ // {allOf: "@pet"}
  "likesMouses": true
}

TYPE @dog
{ // {allOf: "@pet"}
  "teethSize": "big" // {enum: ["big", "small"]}
}
```

This example shows how simple it is to inherit one type from another in JSight using the rule
`allOf`.

Learn more: [JSight Schema Specification. Rule
"allOf"](https://jsight.io/docs/jsight-schema-0-3#rule-allof).

<div align="center">

:star: **Star us on GitHub — it motivates us a lot!**

</div>

</td>
<td>

```
openapi: 3.0.3
info:
  title: ""
  version: ""
paths: {}
components:
  schemas:
    Pet:
      type: object
      required: [id, name]
      properties:
        id:
          type: integer
          example: 123
        name:
          type: string
          example: "Tom"
    Cat:
      allOf:
        - $ref: '#/components/schemas/Pet'
        - type: object
          required: [likesMice]
          properties:
            likesMice:
              type: boolean
    Dog:
      allOf:
        - $ref: '#/components/schemas/Pet'
        - type: object
          required: [teethSize]
          properties:
            teethSize:
              type: string
              enum: ["big", "small"]
```
	
</td>
</tr>
</tbody>
</table>

</details>

<details><summary>Example 6. Full-fledged CRUD API</summary>

<table align="center">
<thead>
<tr>
  <th width="50%">
    JSight API 0.3
  </th>
  <th>
    OpenAPI 3.0.1 (Swagger)
  </th>
</tr>
</thead>
<tbody>
<tr valign="top">
<td>

```
JSIGHT 0.3

GET /cats         // Get all cats.
  200 [@cat]      // Returns all cats.

POST /cats        // Create a cat.
  Request @cat
  200 @cat        // Success.

GET /cats/{id}    // Get a cat by its id.
  200 @cat        // Returns a cat.

PUT /cats/{id}    // Update a cat.
  Request @cat
  200 @cat        // Returns an updated cat.

DELETE /cats/{id} // Delete a cat.
  200 any

TYPE @cat // A cat.
{
  "id"   : 1,
  "name" : "Tom",
  "color": "black" // {enum: ["black", "white"]}
}
```

A full-fledged CRUD API took only 25 lines.

<div align="center">

:star: **Star us on GitHub — it motivates us a lot!**

</div>

</td>
<td>

```
openapi: 3.0.3
info:
  title: ""
  version: ""
paths:
  /cats:
    get:
      summary: Get all cats.
      responses:
        200:
          description: ""
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Cat'
    post:
      summary: Create a cat.
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Cat'
      responses:
        200:
          description: ""
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Cat'
  /cats/{id}:
    parameters:
    - name: id
      in: path
      required: true
      schema: {}
    get:
      summary: Get a cat by its id.
      responses:
        200:
          description: ""
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Cat'
    put:
      summary: Update a cat.
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Cat'
      responses:
        200:
          description: ""
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Cat'
    delete:
      summary: Delete a cat.
      responses:
        200:
          description: ""
          content:
            application/json:
              schema: {}
components:
  schemas:
    Cat:
      description: Type “Cat”.
      type: object
      required: [id, name, color]
      properties:
        id:
          type: integer
          example: 123
        name:
          type: string
          example: "Tom"
        color:
          type: string
          enum: ["black", "white"]
```
	
</td>
</tr>
</tbody>
</table>

</details>

<details><summary>Example 7. Macros</summary>

<table align="center">
<thead>
<tr>
  <th width="50%">
    JSight API 0.3
  </th>
  <th>
    OpenAPI 3.0.1 (Swagger)
  </th>
</tr>
</thead>
<tbody>
<tr valign="top">
<td>

```
JSIGHT 0.3
 
GET /cats // Get all cats.
  200 [@cat]
  PASTE @errorResponses
 
GET /cats/{id} // Get a cat by its id.
  200 @cat
  PASTE @errorResponses
 
TYPE @cat // Type “Cat”.
{
  "id"  : 1,
  "name": "Tom"
}
 
MACRO @errorResponses
  400 any
  401 any
  405 any
  500 any
```

Macros are a powerful feature of the JSight API language. It allows you to reuse parts of code as
many times as you like.

More about macros: [Quick Tutorial. Magic directive
MACRO](https://jsight.io/docs/jsight-api-0-3-quick-tutorial/lesson09).

<div align="center">

:star: **Star us on GitHub — it motivates us a lot!**

</div>

</td>
<td>

```
openapi: 3.0.1
info:
  title: ""
  version: ""
paths:
  /cats:
    get:
      summary: Get all cats.
      responses:
        200:
          description: ""
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Cat'
        400:
          $ref: '#/components/responses/Error400'
        401:
          $ref: '#/components/responses/Error401'
        405:
          $ref: '#/components/responses/Error405'
        500:
          $ref: '#/components/responses/Error500'
  /cats/{id}:
    get:
      description: "Get a cat by its id."
      parameters:
      - name: id
        in: path
        required: true
        schema: {}
      responses:
        200:
          description: ""
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Cat'
        400:
          $ref: '#/components/responses/Error400'
        401:
          $ref: '#/components/responses/Error401'
        405:
          $ref: '#/components/responses/Error405'
        500:
          $ref: '#/components/responses/Error500'
components:
  schemas:
    Cat:
      description: Type “Cat”.
      type: object
      required: [id, name]
      properties:
        id:
          type: integer
          example: 1
        name:
          type: string
          example: "Tom"
  responses:
    Error400:
      description: ""
      content:
        application/json:
          schema: {}
    Error401:
      description: ""
      content:
        application/json:
          schema: {}
    Error405:
      description: ""
      content:
        application/json:
          schema: {}
    Error500:
      description: ""
      content:
        application/json:
          schema: {}
```
	
</td>
</tr>
</tbody>
</table>

</details>

<details><summary>Example 8: Large REST API</summary>

<table align="center">
<thead>
<tr>
  <th width="50%">
    JSight API 0.3
  </th>
  <th>
    OpenAPI 3.0.1 (Swagger)
  </th>
</tr>
</thead>
<tbody>
<tr valign="top">
<td>

```
###
JSight 0.3 Demo API.
For more information see official docs: 
https://jsight.io/docs/jsight-api-0-3.
###

JSIGHT 0.3

INFO
  Title "Pets REST API"
  Version 1.0
  Description
    ## Overview

    The **Pets REST API** allows you to manage your pets.

    Powered by [JSight](http://jsight.io)©.

SERVER @prod // Production server.
  BaseUrl "https://pets.com/api/1.0"

SERVER @test // Test server.
  BaseUrl "https://192.168.0.100/1.0"

#======================= CATS =======================

#---------------------- /cats -----------------------

GET /cats // Get all cats.
  200     // Returns all cats.
    {
      "items": [@cat],
      "itemsCount": 25 // {min: 0}
    }

POST /cats      // Create a cat.
  Request @cat
  200 @cat      // Success.
  409 @error    // Error.

#------------------- /cats/{id} --------------------
URL /cats/{id}
  Path
    {
      "id": "CAT-123" // {type: "@petId"} - Cat's id.
    }

GET /cats/{id} // Get a cat by its id.
  200 @cat     // Return a cat.
  404 empty    // A cat is not found.

PUT /cats/{id} // Update a cat.
  Request @cat
  200 @cat     // Returns an updated cat.
  404 empty    // A cat is not found.
  409 @error   // Some error.

PATCH /cats/{id} // Update a cat's status.
  Request
    {
      "status": "relaxing" // New status of the cat.
    }
  200 any    // Ok.
  409 @error // Some error.
  404 empty  // A cat is not found.

DELETE /cats/{id} // Delete a cat.

#----------------- /cats/{id}/friends/{friendId} ---------

GET /cats/{id}/friends/{friendId} // Get cats friend.
  Path
  {
    "friendId": @petId // Friend's id.
  }

  200 // Return the cats friend.
    @cat | @pig // The cat's friend (cat or pig).

#======================= /dogs =======================

GET /dogs // Get the paged list of all dogs.
  Query "page=1&pageSize=30&filter[age]=12"
    {                // {allOf: "@pageQuery"}
      "filter": {    // {optional: true}
        "size": "S", /* {optional: true, enum: ["S", "L", "M"]} 
                        - Filter by dog's size. */
        "age" : 12   /* {optional: true, min: 0               } 
                        - Filter by dog's age. */
      }
    }
  Request
    Headers
      @commonRequestHeaders
    Body empty
  200 // Returns a page of dogs.
    Headers
      @commonResponseHeaders
    Body
      {
        "items": [@dog],
        "page" : 1,      
        "pageSize": 30   
      }
  PASTE @errorResponses

POST /dogs // Create a new dog.
  Description
  (
    ### Limitations
    
    - Accounts are limited to 25 new dogs 
      within a 24 hour period.
  )
  Request
    Headers
      { // {allOf: ["@commonRequestHeaders"]}
        "X-header": "Some additional header"
      }
    Body
      @dog
  200 // Success.
    Headers
      {
        "X-header": "Some additional header"
      }
    Body regex
      /^OK$/
  PASTE @errorResponses

#------------------- /dogs/{id} ---------------------
URL /dogs/{id}
  Path
    {
      "id": "DOG-123" // {type: "@petId"} - Dog's id.
    }

GET /dogs/{id} // Get a dog by its id.
  Request
    Headers
      @commonRequestHeaders
    Body empty
  200          // Return a dog.
    Headers
      @commonResponseHeaders
    Body
      @dog     
  PASTE @errorResponses

PUT /dogs/{id} // Update a dog.
  Request
    Headers
      @commonRequestHeaders
    Body 
      @dog
  200          // Success.
    Headers
      @commonResponseHeaders
    Body any
  PASTE @errorResponses

DELETE /dogs/{id} // Delete a dog.
  Request
    Headers
      @commonRequestHeaders
    Body empty
  200          // OK.
    Headers
      @commonResponseHeaders
    Body
      "OK" // {const: true}
  PASTE @errorResponses

#====================== PIGS ========================

URL /pigs
  GET              // Get the list of all pigs.
    200 [@pig]     // List of pigs.
  POST             // Create a new pig.
    Request @pig
    200 @pig       // Created pig.
    409 @error     // Pig is not created.

URL /pigs/{id}
  Path
    {
      "id": "PIG-123" // {type: "@petId"} - A pigs id.
    }
  GET                 // Get a pig by its id.
    200 @pig          // A pig.
    404 @error        // Pig not found.
  PUT                 // Change a pig by its id.
    Request @pig      
    200 @pig          // An updated pig.
    404 @error        // Pig not found.
    409 @error        // Error.
  DELETE              // Delete a pig by its id.
    200 empty         // Success.
    404 @error        // Pig not found.
    409 @error        // Error.

#====================== TYPES ========================

TYPE @pet // A pet.
{
  "id"        : @petId,
  "name"      : "Tom",
  "type"      : "PIG", // {enum: ["CAT", "DOG", "PIG"]}
  "age"       : 10,    // {min: 0, max: 99}
  "email"     : "tom@pets.com",        // {type: "email"}
  "uri"       : "http://tom.pets.com", // {type: "uri"}
  "birthday"  : "2012-01-03",          // {type: "date"}
  "uuid"      : "550e8400-e29b-41d4-a716-446655440000" // {type: "uuid"}
}

TYPE @cat // A cat.
{ // {allOf: "@pet"}
  "status": "relaxing",
  "bestFriend": @cat,
  "topFriends": { // {additionalProperties: true}
    @petName: @cat | @pig
  },
  "topEnemies": [ // {maxItems: 10}
    @dog
  ]
}

TYPE @dog // A dog.
{ // {allOf: "@pet"}
  "friendIds": [ // Only dog ids are allowed.
    @petId
  ],
  "isDangerous": false,
  "legacyId": 1, /* {or: [
                        {type: "integer", min: 0, exclusiveMinimum: true}, 
                        {type: "string"}
                      ], 
                      optional: true
                    } */
  "additionalData": {} // {type: "any"} - Field for legacy.
}

TYPE @pig // A pig.
{ // {allOf: "@pet"}
  "temperature" : 35.6, // {precision: 1, nullable: true}
  "pigSize"     : "S",  // {type: "@pigSize"}
  "lastWashTime": "2021-01-02T15:04:05+03:00", // {type: "datetime"}
  "additionalData": {  // {additionalProperties: "string"}
    "key": "value"
  }
}

TYPE @pigSize
  "S" /* {enum:[
            "XXS",
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
          ]} */

TYPE @petId 
  "GOAT-12345" // {regex: "^[A-Z]+-\\d+$", minLength: 3, maxLength: 255}

TYPE @petName regex
  /^[A-Z][a-z]*( [A-Z][a-z]*)*$/

#-------------------- COMMON TYPES -------------------

TYPE @error // A common error response.
{
  "code": 12,
  "message": "Something bad had happened on server..."
}

TYPE @commonRequestHeaders
{ // {allOf: ["@contentTypeHeader", "@authHeader"]}
}

TYPE @commonResponseHeaders
{ // {allOf: ["@contentTypeHeader"]}
}

TYPE @contentTypeHeader
{
  "Content-Type": "application/json" // {const: true}
}

TYPE @authHeader // Authorization header.
{
  "Authorization": "Basic dG9tQGNhdC5jb206YWJjMTIz=" /* 
                        {regex: "^Basic [A-Za-z0-9+\\/=]+$"} */
}

TYPE @pageQuery
{
  "page"    : 1, // {optional: true, min: 1} - 1 by default.
  "pageSize": 30 // {optional: true, min: 10, max: 100} - 30 by default.
}

#----------------------- MACROS -----------------------------------

MACRO @errorResponses
(
  401 any      // Unauthorised.
  404 empty    // Not found.
  409 @error   // Some error.
)
```

</td>
<td>

We did not describe this API in OpenAPI. It is too complicated and very long…

<div align="center">

:star: **Star us on GitHub — it motivates us a lot!**

</div>
	
</td>
</tr>
</tbody>
</table>

</details>

<div>
  &nbsp;
</div>

## :book: &nbsp; Features

- Description of your REST API in a very simple and intuitive [JSight API language](https://jsight.io/docs/jsight-api-0-3).
- Convenient syntax highlighting.
- Instant automatic document generation.
- Intuitive document navigation.
- View data schemas in two formats: in the form of an example (Code View) and in a tabular form (Table View).
- Expand nested data types on click.
- The document can be downloaded in HTML format. 
- Document preview before downloading.
- Sharing an API document by link.

<div>  
  &nbsp; 
</div>

## :date: &nbsp; Roadmap

- **Aug &#x2013; Dec 2022**  
  Minor UI improvements.
- **Aug 2022**  
  JSON-RPC 2.0 support.
- **Sep 2022**  
  Download document also in MarkDown, PDF, and DOCX formats.
- **Oct 2022**  
  Quick Help built into the editor allows you to quickly access the necessary information on the JSight API language without leaving the editor.
- **Nov 2022**  
  Converting the JSight specification to OpenAPI and vice versa.</tspan></text>
- **Sep 2022**  
  Converting the JSight specification to OpenAPI and vice versa. Automatic generation of API clients and API server stubs.
- **Aug &#x2013; Dec 2022**  
  Support for other types of API: gRPC, Kafka, RabbitMQ, WebSocket. Sending test requests to the API.
- **Nov 2022**  
  Create a virtual server on click.

If you have any ideas or suggestions, please write to us:

- Email: [support@jsight.io](mailto:support@jsight.io)
- Telegram: [@jsight_support](https://t.me/jsight_support)

<div>  
  &nbsp; 
</div>

## :clipboard: &nbsp; Configuration

### Local startup configuration

#### Backend configuration

When starting `jsight-server-docker-compose.yml` you can specify the following parameters:

- `SERVER_HOST_PORT` — port at which JSight Server will run.
- `JSIGHT_SERVER_CORS` — If `true`, the server enables CORS headers, allowing Cross Origin requests
  to JSight Server. If `false`, CORS-headers are not sent, Cross Origin requests to JSight Server
  are forbidden.
- `JSIGHT_SERVER_STATISTICS` — If `true`, then JSight Server will send statistical data to the
  statistics collection server. If `false`, statistics are not sent. :warning: Do not turn on this
  mode unnecessarily!

Default parameter values:

- `JSIGHT_SERVER_CORS=true`,
- `JSIGHT_SERVER_STATISTICS=false`.

An example of starting JSight Server with the configured parameters:

```
SERVER_HOST_PORT=8080 JSIGHT_SERVER_CORS=false JSIGHT_SERVER_STATISTICS=false docker-compose -f jsight-server-docker-compose.yml up -d
```

#### Frontend configuration

The default frontend application configuration is in the file [.env](./.env).

It allows you to configure the following settings:

- `REACT_APP_API_URL` — JSight Server URL address (absolute or relative). This is a mandatory
  parameter.
- `REACT_APP_GTM_ID` — Google Tag Manager identificator. You can leave this parameter blank.
- `REACT_APP_CLOUD_URL` — JSight Cloud URL address (absolute or relative). You can leave this
  parameter blank.

If you need to change the default configuration, create a file `.env.local` in the same folder, copy
the contents of the file `.env` into it, and change the settings as follows, for example:

```
REACT_APP_API_URL=https://my-domain.com/jsight-server-api
REACT_APP_GTM_ID=
REACT_APP_CLOUD_URL=
```

or

```
REACT_APP_API_URL=/jsight-server-api
REACT_APP_GTM_ID=
REACT_APP_CLOUD_URL=
```

More information on environment variables can be found at:
https://create-react-app.dev/docs/adding-custom-environment-variables/ .

### Startup configuration from a Docker image

When starting `docker-compose.yml` you can specify the following parameters:

- `FE_HOST_PORT` — port at which JSight Online Editor will run.
- `SERVER_HOST_PORT` — port at which JSight Server will run.
- `JSIGHT_SERVER_CORS` — If `true`, the server enables CORS headers, allowing Cross Origin requests
  to JSight Server. If `false`, CORS-headers are not sent, Cross Origin requests to JSight Server
  are forbidden.
- `JSIGHT_SERVER_STATISTICS` — If `true`, then JSight Server will send statistical data to the
  statistics collection server. If `false`, statistics are not sent. :warning: Do not turn on this
  mode unnecessarily!

Default parameter values:

- `JSIGHT_SERVER_CORS=true`,
- `JSIGHT_SERVER_STATISTICS=false`.

An example of starting JSight Online Editor with the configured parameters:

```
FE_HOST_PORT=80 SERVER_HOST_PORT=8080 JSIGHT_SERVER_CORS=true JSIGHT_SERVER_STATISTICS=true docker-compose -f docker-compose.yml up -d --build
```

<div>  
  &nbsp; 
</div>

## :bookmark_tabs: &nbsp; Versioning

The JSight Online Editor frontend version consists of two numbers:

```
{release number}.{release fix number}
```

For example, version 3.2 means it's release number 3, fix number 2.

Releases are located in the branch `main` and are tagged with a version number, for example
`release-2.0`.

The release history of JSight Online Editor can be found here:
https://github.com/jsightapi/online-editor-frontend/releases.

The release history is also available on the [official
website](https://jsight.io/docs/products/jsight-online-editor/release-notes).

<div>  
  &nbsp; 
</div>

## :notebook_with_decorative_cover: &nbsp; Dependencies

JSight Online Editor Frontend depends on the backend API provided by [JSight
Server](https://github.com/jsightapi/jsight-server).

The **JSight Server API** specification can be found here:
https://github.com/jsightapi/jsight-server/blob/main/jsight/jsight-server-api.jst.

The specific versions of the JSight Server API that JSight Online Editor Frontend depends on are
listed on the release pages: https://github.com/jsightapi/online-editor-frontend/releases.

<div>  
  &nbsp; 
</div>

## :triangular_ruler: &nbsp; General Architecture

<div>  
  &nbsp; 
</div>

<div align="center">

  <img src="./img/oe-frontend-schema.svg" />

</div>

<div>  
  &nbsp; 
</div>

Links to the components:

- JSight Server API specification:
https://github.com/jsightapi/jsight-server/blob/main/jsight/jsight-server-api.jst.  
- JSight Server repo: https://github.com/jsightapi/jsight-server.  
- JSight API Go Library repo: https://github.com/jsightapi/jsight-api-go-library.  
- JSight Schema Go Library repo: https://github.com/jsightapi/jsight-schema-go-library.  

<div>  
  &nbsp; 
</div>

## :test_tube: &nbsp; Testing

The manual tests are available here: [tests/manual-tests/](./tests/manual-tests/).

<div>  
  &nbsp; 
</div>

## :sunglasses: &nbsp; Contributing

Contributing is more than just coding. You can help the project in many ways, and we will be very
happy to accept your contribution to our project.

Details of how you can help the project are described in the [CONTRIBUTING.md](./CONTRIBUTING.md)
document.

### Contributors

<a href="https://github.com/Emptyfruit"><img src="https://avatars.githubusercontent.com/u/14968783?v=4" width="100" height="100" alt=""/></a>
<a href="https://github.com/add2"><img src="https://avatars.githubusercontent.com/u/3954234?v=4" width="100" height="100" alt=""/></a>
<a href="https://github.com/constantine-malyshev"><img src="https://avatars.githubusercontent.com/u/101567029?v=4" width="100" height="100" alt=""/></a>
<a href="https://github.com/kolnogorov"><img src="https://avatars.githubusercontent.com/u/8288103?v=4" width="100" height="100" alt=""/></a>
<a href="https://github.com/maslenkow512"><img src="https://avatars.githubusercontent.com/u/83369533?v=4" width="100" height="100" alt=""/></a>
<a href="https://github.com/alvits77"><img src="https://avatars.githubusercontent.com/u/8134366?v=4" width="100" height="100" alt=""/></a>
<a href="https://github.com/alexander307"><img src="https://avatars.githubusercontent.com/u/9623382?v=4" width="100" height="100" alt=""/></a>
<a href="https://github.com/gucho95"><img src="https://avatars.githubusercontent.com/u/65708561?v=4" width="100" height="100" alt=""/></a>
<a href="https://github.com/dshemin"><img src="https://avatars.githubusercontent.com/u/11780307?v=4" width="100" height="100" alt=""/></a>
<a href="https://github.com/bakhtinphil"><img src="https://avatars.githubusercontent.com/u/104030166?v=4" width="100" height="100" alt=""/></a>
<a href="https://github.com/Anton-NS"><img src="https://avatars.githubusercontent.com/u/100565250?v=4" width="100" height="100" alt=""/></a>
<a href="https://github.com/Ekaterinacamposkuydina"><img src="https://avatars.githubusercontent.com/u/104357292?v=4" width="100" height="100" alt=""/></a>
<a href="https://github.com/bereg2k"><img src="https://avatars.githubusercontent.com/u/42677987?v=4" width="100" height="100" alt=""/></a>

<div>  
  &nbsp; 
</div>

## :speech_balloon: &nbsp; Bugs and Feature Requests

Do you have a bug report or a feature request? 

Please feel free to add a [new
issue](https://github.com/jsightapi/online-editor-frontend/issues/new) or write to us in support:

- Email: [support@jsight.io](mailto:support@jsight.io)
- Telegram: [@jsight_support](https://t.me/jsight_support)

<div>  
  &nbsp; 
</div>

## :grey_question: &nbsp; Support

If something is unclear to you, please contact support; we try to respond within 24 hours. Moreover,
it is critical for us to understand what is unclear from the first instance.

- Email: [support@jsight.io](mailto:support@jsight.io)
- Telegram: [@jsight_support](https://t.me/jsight_support)

<div>  
  &nbsp; 
</div>

## :receipt: &nbsp; License

This project is licensed under the Apache 2.0 License. See the [LICENSE](./LICENSE) file for more
details.

<div>  
  &nbsp; 
</div>

## :book: &nbsp; Resources

- JSight Online Editor: https://editor.jsight.io.
- JSight Official Website: https://jsight.io.

#### Documentation

- JSight API Language Quick Tutorial: https://jsight.io/docs/jsight-api-0-3-quick-tutorial.
- JSight API language specification on the official website: https://jsight.io/docs/jsight-api-0-3.  
- JSight API language specification on GitHub:
  https://github.com/jsightapi/specification/tree/main/versions/JSight%20API

#### Publications

- JSight blog: https://jsight.io/blog.
- Official Facebook page: https://www.facebook.com/jsightapi.
- Official Twitter: https://twitter.com/jsightapi.
- Official Linkedin: https://www.linkedin.com/company/jsightapi.

#### Others

- All JSight repositories: https://github.com/jsightapi.
- GitHub discussions: https://github.com/jsightapi/online-editor-frontend/discussions.
- JSight video lessons:
  https://www.youtube.com/watch?v=AegCETY9Cdk&list=PLy9sOecVhlybvRoDhGlzyMwKVxR-gFkdX

<div>  
  &nbsp; 
</div>

## :handshake: &nbsp; Partners

- We have successfully completed [class #29 of the Alchemist
  Accelerator](https://www.alchemistaccelerator.com/portfolio?class=29).

<div>  
  &nbsp; 
</div>

## :trophy: &nbsp; Acknowledgments

We sincerely thank all those without whom this project would not have been possible:

- [Alchemist Accelerator](https://www.alchemistaccelerator.com/),
- [Alexis](https://github.com/agvanti),
- Timur Ibragimov,
- [Petr Molchanov](https://github.com/d1rebear),
- Carl Crawford,
- [ReactJS](https://github.com/facebook/react),
- [Monaco Editor](https://github.com/microsoft/monaco-editor),
- [create-react-app](https://github.com/facebook/create-react-app),
- [clsx](https://github.com/lukeed/clsx),
- [lodash](https://github.com/lodash/lodash),
- [marked](https://github.com/markedjs/marked),
- [re-resizable](https://github.com/bokuweb/re-resizable),
- [react-collapse](https://github.com/nkbt/react-collapse),
- [react-modal](https://github.com/reactjs/react-modal),
- [react-scroll](https://github.com/fisshy/react-scroll),
- [popper](https://github.com/floating-ui/react-popper),
- [toastify](https://github.com/fkhadra/react-toastify),
- [virtuoso](https://github.com/petyosi/react-virtuoso),
- [sanitize-html](https://github.com/apostrophecms/sanitize-html).

<div align="center">

:star: **Star us on GitHub — it motivates us a lot!** :star:

</div>
