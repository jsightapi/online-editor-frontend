export const initJsonRpc = `JSIGHT 0.3

TYPE @cat
{
  "id": 1,
  "name": "Tom",
  "age": 8
}

URL /rpc
  Protocol json-rpc-2.0

  Method newCat // Create a cat.
    Description
        The method creates a cat and returns its ID.
    Params
      @cat
    Result
      1 // Cat’s id.

  Method getCat // Get a cat.
    Params
      1 // Cat’s id.
    Result
      @cat

  Method updateCatAge // Update the information about a cat’s age.
    Params
      {
        "id": 1, // Cat’s id.
        "age": 9 // Cat’s age.
      }
    Result
      true // {const: true}

  Method getListOfCats // Get a list of cats by their IDs.
    Params
      [1,2,3]
    Result
      [@cat]

  Method countCats // Returns the number of cats.
    Result
      19 // {min: 0}

  Method deleteAllCats // Remove all cats.
    Description
        The method removes all cats without filtering.`;
