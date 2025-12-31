import { Express, Application} from "express";
import express from "express";
import cors from 'cors';
import chatRoutes from './routes/chatRoutes';

const app:Application = express();

app.use(cors());
app.use(express.json());
app.use('/chat',chatRoutes);

export default app;