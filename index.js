const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('lib'));

const API_KEY = 'sylphy-a6a203';

app.post('/api/chat', async (req, res) => {
    const { message, model } = req.body;
    let url = '';

    if (model === 'chatgpt') {
        url = `https://sylphy.xyz/ai/copilot?text=${encodeURIComponent(message)}&api_key=${API_KEY}`;
    } else {
        url = `https://sylphy.xyz/ai/gemini?q=${encodeURIComponent(message)}&prompt=&api_key=${API_KEY}`;
    }

    try {
        const response = await axios.get(url);
        res.json({ text: response.data.result.text });
    } catch (error) {
        res.status(500).json({ error: 'Error al conectar con la IA' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'lib', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Xyzz AI corriendo en puerto ${PORT}`));
