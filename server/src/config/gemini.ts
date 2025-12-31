import {GoogleGenAI} from '@google/genai';
import dotenv from "dotenv";
dotenv.config();
import { SYSTEM_PROMPT } from './prompt';

const apikey = process.env.GEMINI_API_KEY;
if(!apikey){
    throw new Error("GEMINI_API_KEY is Missing in the .env file");
}
const genAI = new GoogleGenAI({apiKey:apikey});

export async function generateAIResponse(Prompt:string,history:any[]=[]) {
    if (!Prompt || typeof Prompt !== "string") {
        throw new Error("Prompt must be a non-empty string");
    }
    try {
        const ApiResponce = await genAI.models.generateContent({
        model:"gemini-2.5-flash",
        contents:[
            {role:"user",parts:[{text:SYSTEM_PROMPT}]},
            ...history,
            {
                role: "user",
                parts: [{ text: Prompt }]
            }
        ]
        });
        const AIReplyText = ApiResponce?.candidates?.[0]?.content?.parts?.[0]?.text;

        if(!AIReplyText){
            throw new Error("Empty response from Gemini API");
        }
        return AIReplyText
    } 
    catch (error:any) {
        console.error("Gemini API Error:", error.message || error);
        throw error;
    }
    
}