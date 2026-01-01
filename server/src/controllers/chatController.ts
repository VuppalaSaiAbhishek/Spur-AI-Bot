import { Request,Response } from "express";
import {processUserMessage} from "../services/aiServices";

export const handleChatAction = async(req:Request,res:Response)=>{
    try {
        const{message,sessionId}= req.body;
        if(!message){
            return res.status(400).json({ error: "Message is required" });
        }
        const result = await processUserMessage(message,sessionId);
        console.log(result.aiResponse);
        return res.status(200).json({
            success:true,
            data:result.aiResponse,
            sessionId:result.sid
        })
    } catch (error:any) {
        console.log("Controller Error:",error.message);
        const status = error.code || 429;
        return res.status(status).json({ 
            success: false, 
            message: error.message ||
             "Internal Server Error",
            errorType: status === 503 ? "AI_ERROR" : (status === 429 ? "LIMIT_EXCEEDED" : "SERVER_ERROR")
        });
        
    }
}