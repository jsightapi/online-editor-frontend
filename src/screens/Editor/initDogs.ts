export const initDogs = `###
JSight 0.3 Demo API.
For more information, see official docs: 
https://jsight.io/docs
###

JSIGHT 0.3

INFO
  Title "Dogs REST API"
  Version 1.0
  Description
    ## Overview

    The Dogs REST API allows you to manage your dogs.

    Powered by [JSight](http://jsight.io)©.

SERVER @prod // Production server.
  BaseUrl "https://pets.com/api/1.0"

SERVER @test // Test server.
  BaseUrl "https://192.168.0.100/1.0"

#-------------------------- /dogs -----------------------------

GET /dogs // Get the paged list of all dogs.
  Query "page=1&pageSize=30&filter[age]=12"
    {                // {allOf: "@pageQuery"}
      "filter": {    // {optional: true}
        "size": "S", // {optional: true, enum: ["S", "L", "M"]} - Filter by dog’s size.
        "age" : 12   // {optional: true, min: 0               } - Filter by dog’s age.
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
      "id": "DOG-123" // {type: "@petId"} - Dog’s id.
    }

GET /dogs/{id} // Get a dog by its id.
  Request
    Headers
      @commonRequestHeaders
    Body empty
  200          // Returns a dog.
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

TYPE @petId 
  "GOAT-12345" // {regex: "^[A-Z]+-\\\\d+$", minLength: 3, maxLength: 255}

TYPE @petName regex
  /^[A-Z][a-z]*( [A-Z][a-z]*)*$/

#-------------------- COMMON TYPES -------------------

TYPE @error // A common error response.
{
  "code": 12,
  "message": "Something bad had happened on the server..."
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
  "Authorization": "Basic dG9tQGNhdC5jb206YWJjMTIz=" // {regex: "^Basic [A-Za-z0-9+\\\\/=]+$"}
}

TYPE @pageQuery
{
  "page"    : 1, // {optional: true, min: 1} - 1 by default.
  "pageSize": 30 // {optional: true, min: 10, max: 100} - 30 by default.
}

#------------------------------- MACROS ----------------------------------

MACRO @errorResponses
  404 empty    // No entity found.
  409 @error   // Some error.
  401 any      // Unauthorized.
`;
