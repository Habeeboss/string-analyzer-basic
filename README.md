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
  "value": "and the weather is hot toh si rehtaew eht dna"
}
Example Response 1:

json
{
    "id": "ac91b7593ea73e1365410e96beac93c5e2417859ab0c572ba4fca33844a330a9",
    "value": "and the weather is hot toh si rehtaew eht dna",
    "properties": {
        "length": 45,
        "is_palindrome": true,
        "unique_characters": 12,
        "word_count": 10,
        "sha256_hash": "ac91b7593ea73e1365410e96beac93c5e2417859ab0c572ba4fca33844a330a9",
        "character_frequency_map": {
            "a": 4,
            "n": 2,
            "d": 2,
            " ": 9,
            "t": 6,
            "h": 6,
            "e": 6,
            "w": 2,
            "r": 2,
            "i": 2,
            "s": 2,
            "o": 2
        }
    },
    "created_at": "2025-10-21T10:49:37.367Z"
}

Example Request 2: "the weather is hot toh si rehtaew eht"
Endpoint: POST http://localhost:1020/strings

Body:
json
{
  "value": "you can have a sit"
}
Example Response 2:

json
{
    "id": "c44ba760d011f200591cfbcce2a62684217b0aca7ab224a1f70756ebcfbd470e",
    "value": "you can have a sit",
    "properties": {
        "length": 18,
        "is_palindrome": false,
        "unique_characters": 13,
        "word_count": 5,
        "sha256_hash": "c44ba760d011f200591cfbcce2a62684217b0aca7ab224a1f70756ebcfbd470e",
        "character_frequency_map": {
            "y": 1,
            "o": 1,
            "u": 1,
            " ": 4,
            "c": 1,
            "a": 3,
            "n": 1,
            "h": 1,
            "v": 1,
            "e": 1,
            "s": 1,
            "i": 1,
            "t": 1
        }
    },
    "created_at": "2025-10-21T10:50:50.282Z"
}

Deployment
This project is deployed on Railway.app
Live API URL:https://string-analyzer-basic-production.up.railway.app

Author
Name: Habeeb Olakunle
Email: sannihabeebo30@gmail.com
GitHub: @Habeeboss
Stack: Node.js, Express, MongoDB