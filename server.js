const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Crypto Schema
const cryptoSchema = new mongoose.Schema({
    name: String,
    code: String,
    price: Number,
    date: String,
    whitepaper: String,
    marketCap: Number
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

// API Endpoint
app.get('/api', async (req, res) => {
    try {
        const cryptos = await Crypto.find();
        res.json(cryptos);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching crypto data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));