import { App } from "./app";
import { Database } from "./services/database-service";
import { EditorService } from "./services/post-service";
import { EditorController } from "./controllers/post.controller";
import dotenv from 'dotenv';

dotenv.config();

const database = new Database();
const service = new EditorService(database);
const editorController = new EditorController(service);

const app = new App();

app.initialize([editorController.getRouter()]);
