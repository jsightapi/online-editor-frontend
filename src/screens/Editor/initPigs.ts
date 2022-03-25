export const initPigs = `###
JSight 0.3 Demo API.
For more information, see official docs: 
https://jsight.io/docs/jsight-api-0-3-quick-tutorial
###

JSIGHT 0.3

INFO
  Title "Pigs REST API"

#====================== PIGS ========================

URL /pigs
  GET              // Get the list of all pigs.
    200 [@pig]     // List of pigs.
  POST             // Create a new pig.
    Request @pig
    200 @pig       // Pig created.
    409 @error     // Pig not created.

URL /pigs/{id}
  Path
    {
      "id": "PIG-123" // {type: "@petId"} - A pig’s id.
    }
  GET                 // Get a pig by its id.
    200 @pig          // A pig.
    404 @error        // Pig not found.
  PUT                 // Change a pig by its id.
    Request @pig      
    200 @pig          // Pig updated.
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
