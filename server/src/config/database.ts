import sqlite3 from "sqlite3";
import {open, Database} from 'sqlite';

let dbinstance : Database | null = null;


export const initDB = async () => {
    if(dbinstance) return dbinstance;
    dbinstance = await open({
        filename: "./database.sqlite",
        driver: sqlite3.Database,
    });

    
    await dbinstance.exec(`
        CREATE TABLE IF NOT EXISTS conversations (
            id TEXT PRIMARY KEY,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await dbinstance.exec(`
        CREATE TABLE IF NOT EXISTS messages (
            id TEXT PRIMARY KEY,
            conversation_id TEXT,
            role TEXT,
            content TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
        );
    `);
    console.log("DB is Connected");

    return dbinstance;
};