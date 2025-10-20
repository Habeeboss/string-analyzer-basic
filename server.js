const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const analysisSchema = new mongoose.Schema({
  value: { type: String, required: true },
  properties: {
    length: Number,
    is_palindrome: Boolean,
    word_count: Number,
    unique_characters: Number,
    character_frequency: Object,
    sha256_hash: String
  },
  created_at: { type: Date, default: Date.now }
});

const StringAnalysis = mongoose.model('StringAnalysis', analysisSchema);

function analyzeString(str) {
  const cleanStr = str.trim();
  const lower = cleanStr.toLowerCase().replace(/[^a-z0-9]/g, '');
  const is_palindrome = lower === lower.split('').reverse().join('');
  const words = cleanStr.split(/\s+/).filter(Boolean);
  const unique_chars = new Set(cleanStr).size;
  const sha256_hash = crypto.createHash('sha256').update(cleanStr).digest('hex');

  const charFreq = {};
  for (let c of cleanStr) {
    charFreq[c] = (charFreq[c] || 0) + 1;
  }

  return {
    length: cleanStr.length,
    is_palindrome,
    word_count: words.length,
    unique_characters: unique_chars,
    character_frequency: charFreq,
    sha256_hash
  };
}

app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text field is required.' });

    const properties = analyzeString(text);

    const existing = await StringAnalysis.findOne({ 'properties.sha256_hash': properties.sha256_hash });
    if (existing) return res.status(409).json({ message: 'String already exists.', data: existing });

    const saved = await StringAnalysis.create({ value: text, properties });
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});


app.get('/api/analyze', async (req, res) => {
  try {
    const { is_palindrome, min_length, max_length, contains } = req.query;
    let filter = {};

    if (is_palindrome) filter['properties.is_palindrome'] = is_palindrome === 'true';
    if (min_length) filter['properties.length'] = { $gte: parseInt(min_length) };
    if (max_length) filter['properties.length'] = { ...filter['properties.length'], $lte: parseInt(max_length) };
    if (contains) filter[`properties.character_frequency.${contains}`] = { $exists: true };

    const results = await StringAnalysis.find(filter);
    res.json({ count: results.length, results });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});


app.get('/api/analyze/:value', async (req, res) => {
  try {
    const doc = await StringAnalysis.findOne({ value: req.params.value });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.delete('/api/analyze/:value', async (req, res) => {
  try {
    const deleted = await StringAnalysis.findOneAndDelete({ value: req.params.value });
    if (!deleted) return res.status(404).json({ error: 'String not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});


app.get('/', (req, res) => {
  res.json({
    message: 'String Analyzer API',
    version: '2.0',
    routes: [
      'POST /api/analyze - Analyze and store string',
      'GET /api/analyze - List analyzed strings',
      'GET /api/analyze/:value - Get by string value',
      'DELETE /api/analyze/:value - Delete analyzed string',
      'GET /health - Check service status'
    ]
  });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(` String Analyzer Service is now running at http://localhost:${PORT}`);
});