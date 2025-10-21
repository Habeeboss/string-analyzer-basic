String Analyzer Service (HNG Stage 1, Backend Wizards)
 Using a RESTful API, analyze and manage string data with computed properties.

 This Node.js, Express, and MongoDB Atlas API is called String Analyzer Service.  From string inputs, analytical attributes (such as length, palindrome, word count, hash, etc.) are computed and saved for further retrieval and filtering.

 Natural language querying is supported, and filters like "all single word palindromic strings," "strings longer than 10 characters," and "strings containing the letter z" are permitted.

 Qualities
 String analysis: identifies several characteristics of submitted strings

 Hashing with SHA-256: Generates unique identifiers

 Filtering API: Execute a query according on length, word count, characters, or palindrome status.

 Text that sounds human is transformed into structured filtering through natural language querying.

 Technologies Used

Node.js – JavaScript runtime  
Express.js – Web framework for building RESTful APIs  
MongoDB Atlas – Cloud database for storage  
Mongoose – ODM for MongoDB  
Crypto (Node.js core) – For SHA-256 hashing  
Dotenv – For managing environment variable


 How It Works
Client sends a string via POST request.  
The API computes:
   - String length  
   - Whether it’s a palindrome  
   - Number of unique characters  
   - Word count  
   - SHA-256 hash  
   - Character frequency map  
Results are stored in MongoDB Atlas and returned as JSON.  
You can retrieve, filter, or delete strings through other endpoints.

 Beginning (Local Configuration & Testing)
 Setup Instructions

Clone the Repository
git clone https://github.com/Habeeboss/string-analyzer-basic.git
cd string-analyzer-basic

1. Set up dependencies
Install express mongoose cors dotenv crypto-js using bash npm npm install or (npm install express mongoose cors dotenv crypto-js)

2. Launch the application
Make sure PORT and MONGO_URI are configured appropriately in your.env file.

MONGO_URI=your_mongodb_connection_string
PORT=1020

Run Locally
Node server.js/npm start/npm run dev in the  bash
Usually, the server will operate at http://localhost:1020.

Your app will run at:
http://localhost:1020

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

Deployment
This project is deployed on Railway.app
Live API URL:https://string-analyzer-basic-production.up.railway.app

Author
Name: Habeeb Olakunle
Email: sannihabeebo30@gmail.com
GitHub: @Habeeboss
Stack: Node.js, Express, MongoDB