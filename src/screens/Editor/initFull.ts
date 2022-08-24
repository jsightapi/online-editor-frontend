export const editorInitialContent = `###
JSight 0.3 Demo API.
For more information see official docs: https://jsight.io/docs/jsight-api-0-3-quick-tutorial/
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
  200 any    // Success.

#======================= /dogs =======================

GET /dogs // Get the paged list of all dogs.
  Query "page=1&pageSize=30&filter[age]=12"
    {
      "page"    : 1,  // {optional: true, min: 1} - 1 by default.
      "pageSize": 30, // {optional: true, min: 10, max: 100} - 30 by default.
      "filter": {     // {optional: true}
        "size": "S",  // {optional: true, enum: ["S", "L", "M"]} - Filter by dog's size.
        "age" : 12    // {optional: true, min: 0               } - Filter by dog's age.
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
  404 any // A requested page was not found.
  401 any // Unauthorised.

#====================== PIGS ========================

URL /pigs
  GET              // Get the list of all pigs.
    200 [@pig]     // List of pigs.
  POST             // Create a new pig.
    Request @pig
    200 @pig       // Created pig.
    409 @error     // Pig is not created.

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
  "pigSize"     : "S",  /* {enum:[
                              "XXS",
                              "XS",
                              "S",
                              "M",
                              "L",
                              "XL",
                              "XXL"
                            ]} */
  "lastWashTime": "2021-01-02T15:04:05+03:00", // {type: "datetime"}
  "additionalData": {  // {additionalProperties: "string"}
    "key": "value"
  }
}

TYPE @petId 
  "GOAT-12345" // {regex: "^[A-Z]+-\\\\d+$", minLength: 3, maxLength: 255}

TYPE @petName regex
  /^[A-Z][a-z]*( [A-Z][a-z]*)*$/

#-------------------- COMMON TYPES -------------------

TYPE @error // A common error response.
{
  "code": 12,
  "message": "Something bad had happened on server..."
}

TYPE @commonRequestHeaders
{
  "Content-Type": "application/json", // {const: true}
  "Authorization": "Basic dG9tQGNhdC5jb206YWJjMTIz=" // {regex: "^Basic [A-Za-z0-9+\\\\/=]+$"}
}

TYPE @commonResponseHeaders
{
  "Content-Type": "application/json" // {const: true}
}
`;
