import { initDB } from "../config/database";

const generateUniqueSessionId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    return `sid-${timestamp}-${randomNum}`;
};
export const createSession = async()=>{
    try {
        const database = await initDB();
        if(!database) throw new Error("Database Connection Failed");
        const newSid = generateUniqueSessionId();
        await database?.run(
            `INSERT INTO conversations (id, created_at, updated_at) VALUES (?, datetime('now'), datetime('now'))`,
        [newSid]
    );
    console.log(newSid);
    return newSid;
        
    } catch (error:any) {
        console.log("Model Error(createSession):",error.message);
        throw error;
        
    }
}

const generateUniquemessageId = (sessionId:string) =>{
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random()*10000);
    return `${sessionId}-${timestamp}-${randomNum}`;
}



export const saveMessage = async(sessionId:string,role:string,content:string)=>{
    if (!content || content.trim() === "") {
    throw new Error("Message content cannot be empty");
}
    const database = await initDB();
    if(!database) throw new Error("Database Connection Failed");
    try {
        const MessageId = generateUniquemessageId(sessionId)
    await database.run('BEGIN TRANSACTION');
    await database?.run(
        'INSERT INTO messages (id, conversation_id, role, content, created_at) VALUES (?, ?, ?, ?, datetime("now"))'

    );

    await database.run(
        'UPDATE conversations SET updated_at = datetime("now") WHERE id=?',[sessionId]
    );
    await database.run('COMMIT');
    console.log(`${role} Response Save in DB`)
        
    } catch (error:any) {
        await database.run('ROLLBACK');
        console.error("Model Error (saveMessage):", error.message);
    }
    
}

export const getChatHistory = async(sessionId:string)=>{
    try {
        const database = await initDB();
        if(!database) throw new Error("Database Connection Failed");
        const history = await database?.all(
            'SELECT role,content FROM messages WHERE conversation_id=? ORDER BY created_at ASC LIMIT 10',[sessionId]
        )
        return history
    } catch (error:any) {
        console.error("Histroy Fetch Error:",error);
        return [];
    }
}