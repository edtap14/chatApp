import express from 'express';
import multiparty from 'connect-multiparty';
import { ChatMessageController } from '../controllers/index.js';
import { mdAuth } from '../middlewares/index.js';

const mdUpload = multiparty({ uploadDir: './uploads/images' });
const api = express.Router();

//EndPoints

api.post('/chat/message', [mdAuth.asureAuth], ChatMessageController.sendText);
api.post('/chat/message/image', [mdAuth.asureAuth, mdUpload], ChatMessageController.sendImage);
api.get('/chat/message/:chat_id', [mdAuth.asureAuth], ChatMessageController.getAll);
api.get('/chat/message/total/:chat_id', [mdAuth.asureAuth], ChatMessageController.getTotalMessages);
api.get('/chat/message/last/:chat_id', [mdAuth.asureAuth], ChatMessageController.getLastmessage);


export const chatMessageRoutes = api;
