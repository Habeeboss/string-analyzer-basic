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
Your app will run at:
http://localhost:1020

3. Postman Test
By submitting POST queries to the /api/analyze endpoint, you can test the API.

Examples of APIs
For instance "Eva, can I see bees in a cave?" is the first request.
POST is the endpoint. Analyze at POST http://localhost:1020/strings

Body:
json
{
  "value": "take a sit at the high table"
}
Example Response 1:

json
{
    "value": "take a sit at the high table",
    "properties": {
        "length": 28,
        "is_palindrome": false,
        "word_count": 7,
        "unique_characters": 11,
        "character_frequency": {
            "t": 5,
            "a": 4,
            "k": 1,
            "e": 3,
            " ": 6,
            "s": 1,
            "i": 2,
            "h": 3,
            "g": 1,
            "b": 1,
            "l": 1
        },
        "sha256_hash": "af2cc0b9178b428187800d9de27ebeb2ab106c33e150806e502df7d8afcf5733"
    }
}

Example Request 2: "the weather is hot toh si rehtaew eht"
Endpoint: POST http://localhost:1020/strings

Body:
json
{
  "value": "the weather is hot toh si rehtaew eht"
}
Example Response 2:

json
{
    "value": "the weather is hot toh si rehtaew eht",
    "properties": {
        "length": 37,
        "is_palindrome": true,
        "word_count": 8,
        "unique_characters": 10,
        "character_frequency": {
            "t": 6,
            "h": 6,
            "e": 6,
            " ": 7,
            "w": 2,
            "a": 2,
            "r": 2,
            "i": 2,
            "s": 2,
            "o": 2
        },
        "sha256_hash": "671b65190d6ff5134dae1847e1d514965c3ab79f2a6a29401b4bb01d24e05ec7"
    }
}

Deployment
This project is deployed on Railway.app
Live API URL:https://string-analyzer-basic-production.up.railway.app

Author
Name: Habeeb Olakunle
Email: sannihabeebo30@gmail.com
GitHub: @Habeeboss
Stack: Node.js, Express, MongoDB