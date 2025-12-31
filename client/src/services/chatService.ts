import axios from "axios";


const API_BASE_URL = process.env.REACT_APP_API_URL;

export const sendMessage = async(userText:string,sid:string | null)=>{
    console.log(userText,sid);
    try {
        const response = await axios.post(`${API_BASE_URL}/chat/message`,{
            message:userText,
            sessionId:sid
        },{
            headers: { 'Content-Type': 'application/json' }
        });
        return response; 
    } 
    catch (error) {
       return error;
    }
}