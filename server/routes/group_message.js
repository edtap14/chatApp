import express from 'express';
import multiparty from 'connect-multiparty';
import { GroupMessageController } from '../controllers/index.js';
import { mdAuth } from '../middlewares/index.js';

const mdUpload = multiparty({ uploadDir: './uploads/images' });

const api = express.Router();

//Endpoints

api.post('/group/message', [mdAuth.asureAuth], GroupMessageController.sendText);
api.post('/group/message/image', [mdAuth.asureAuth, mdUpload], GroupMessageController.sendImage);
api.post('/group/message/:group_id', [mdAuth.asureAuth], GroupMessageController.getAll);
api.get('/group/message/total/:group_id', [mdAuth.asureAuth], GroupMessageController.getTotalMessage);
api.get('/group/message/last/:group_id', [mdAuth.asureAuth], GroupMessageController.getLastMessage);

export const groupMessageRoutes = api;
