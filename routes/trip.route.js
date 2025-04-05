import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express"

const router = express.Router()

router.post('/generate', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'No prompt provided' });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
        
        const result = await model.generateContent(prompt)
        const response = result.response
        res.status(200).json(response.text())
    } catch (error) {
        console.error('Error fetching response from Gemini:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini API' });
    }
});

export default router