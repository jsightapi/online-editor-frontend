export const initCats = `JSIGHT 0.3

INFO
  Title "Cats REST API"
  Version 1.0

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
      "id": "CAT-123" // {type: "@petId"} - Cat’s id.
    }

GET /cats/{id} // Get a cat by its id.
  200 @cat     // Returns a cat.
  404 empty    // Cat not found.

PUT /cats/{id} // Update a cat.
  Request @cat
  200 @cat     // Returns an updated cat.
  404 empty    // A cat is not found.
  409 @error   // Some error.

PATCH /cats/{id} // Update a cat’s status.
  Request
    {
      "status": "relaxing" // New status of the cat.
    }
  200 any    // Ok.
  409 @error // Some error.
  404 empty  // A cat is not found.

DELETE /cats/{id} // Delete a cat.

#----------------- /cats/{id}/friends/{friendId} ---------

GET /cats/{id}/friends/{friendId} // Get a cat’s friend.
  Path
  {
    "friendId": @petId // Friend’s id.
  }

  200 // Returns the cat’s friend.
    @cat | @pig // The cat’s friend (cat or pig).

#======================== TYPES ==========================

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
  "bestFriend": @cat, // {optional: true}
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
  "GOAT-12345" // {regex: "^[A-Z]+-\\\\d+$", minLength: 3, maxLength: 255}

TYPE @petName regex
  /^[A-Z][a-z]*( [A-Z][a-z]*)*$/

#-------------------- COMMON TYPES -------------------

TYPE @error // A common error response.
{
  "code": 12,
  "message": "Something bad had happened on the server..."
}`;
