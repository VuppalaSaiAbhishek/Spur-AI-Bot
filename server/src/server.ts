import app from './app';
import { initDB } from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3333;

const startServer = async () => {
    try {
        await initDB();
        console.log('SQLite Database Connected....');

        app.listen(PORT);
    } catch (error) {
        console.error('Server startup failed:', error);
    }
};

startServer();