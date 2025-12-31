import {generateAIResponse} from '../config/gemini';
import { createSession, getChatHistory, saveMessage } from '../models/chatModel';
import { SYSTEM_PROMPT } from '../config/prompt';

export async function  processUserMessage(Userprompt:string,sessionId:string|null) {
    try {
        if (!Userprompt || Userprompt.trim() === "") {
            throw new Error("User message cannot be empty");
        }
        let sid = sessionId;
        if(!sid || sid === "null" || sid === "undefined" || sid === ""){
            sid = await createSession()
        }
        const history = await getChatHistory(sid);

        await saveMessage(sid,'user',Userprompt);
        const aiResponse = await generateAIResponse(Userprompt,history);
        if (!aiResponse || aiResponse.trim() === "") {
            throw new Error("Empty response from AI");
        }
        await saveMessage(sid,'model',aiResponse);
        return {aiResponse,sid};
        
    } catch (error:any) {
        console.error(error.message);
        throw new Error("Failed to Process Chat. Please try again");
    }
 }