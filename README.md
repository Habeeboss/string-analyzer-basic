String Analyzer Service (HNG Stage 1, Backend Wizards)
 Using a RESTful API, analyze and manage string data with computed properties.

 This Node.js, Express, and MongoDB Atlas API is called String Analyzer Service.  From string inputs, analytical attributes (such as length, palindrome, word count, hash, etc.) are computed and saved for further retrieval and filtering.

 Natural language querying is supported, and filters like "all single word palindromic strings," "strings longer than 10 characters," and "strings containing the letter z" are permitted.

 Qualities
 String analysis: identifies several characteristics of submitted strings

 Hashing with SHA-256: Generates unique identifiers

 Filtering API: Execute a query according on length, word count, characters, or palindrome status.

 Text that sounds human is transformed into structured filtering through natural language querying.

 Beginning (Local Configuration & Testing)
1. Set up dependencies
Install express mongoose cors dotenv crypto-js using bash npm
2. Launch the application
Make sure PORT and MONGO_URI are configured appropriately in your.env file.

Node server.js and bash
Usually, the server will operate at http://localhost:1020.

3. Postman Test
By submitting POST queries to the /api/analyze endpoint, you can test the API.

Examples of APIs
For instance "Eva, can I see bees in a cave?" is the first request.
POST is the endpoint. Analyze at POST http://localhost:1020/api/analyze

Body:

json
{
  "text": "Eva can I see bees in a cave"
}
Example Response 1:

json
{
  "value": "Eva can I see bees in a cave",
  "properties": {
    "length": 28,
    "is_palindrome": true,
    "word_count": 8,
    "unique_characters": 11,
    "character_frequency": {
      "E": 1,
      "v": 2,
      "a": 4,
      " ": 7,
      "c": 2,
      "n": 2,
      "I": 1,
      "s": 2,
      "e": 5,
      "b": 1,
      "i": 1
    },
    "sha256_hash": "fe48bf7ba7430d5c1feff140399f242ef1beff80fecc72d8f4427a948ec37745"
  },
  "_id": "68f6c673a81187f9c2e6f484",
  "created_at": "2025-10-20T23:32:03.994Z",
  "__v": 0
}  

Example Request 2: "Just do it"
Endpoint: POST http://localhost:1020/api/analyze

Body:

json
{
  "text": "Just do it"
}
Example Response 2:

json
{
  "value": "Just do it",
  "properties": {
    "length": 10,
    "is_palindrome": false,
    "word_count": 3,
    "unique_characters": 8,
    "character_frequency": {
      "J": 1,
      "u": 1,
      "s": 1,
      "t": 2,
      " ": 2,
      "d": 1,
      "o": 1,
      "i": 1
    },
    "sha256_hash": "6a0b4ef27e630ef6a692b98b33ae575166973d7a27bdbdc448b852926de22123"
  },
  "_id": "68f6c6ada81187f9c2e6f487",
  "created_at": "2025-10-20T23:33:01.800Z",
  "__v": 0
}