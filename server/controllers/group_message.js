import { GroupMessage } from '../models/index.js';
import { io, getFilePath } from '../utils/index.js';

function sendText(req, res) {
    const {
        group_id,
        message
    } = req.body;
    const { user_id } = req.user;

    const group_message = new GroupMessage({
        group: group_id,
        user: user_id,
        message,
        type: 'TEXT'
    });

    group_message.save().then(async () => {
        const data = await group_message.populate('user');
        io.sockets.in(group_id).emit('message', data);
        io.sockets.in(`${ group_id }_notify`).emit('message_notify', data);
        res.status(200).send({});
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ msg: 'Error en el servidor' });
    });

}

function sendImage(req, res) {
    const { group_id } = req.body;
    const { user_id } = req.user;

    const group_message = new GroupMessage({
        group: group_id,
        user: user_id,
        message: getFilePath(req.files.image),
        type: 'IMAGE'
    });

    group_message.save().then(async () => {
        const data = await group_message.populate('user');
        io.sockets.in(group_id).emit('message', data);
        io.sockets.in(`${ group_id }_notify`).emit('message_notify', data);
        res.status(200).send({});
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ msg: 'Internal Error' });
    });
}

async function getAll(req, res) {
    const { group_id } = req.params;
    try {
        const messages = await GroupMessage.find({ group: group_id })
            .sort({ createdAt: 1 })
            .populate('user');
        const total = await GroupMessage.find({ group: group_id }).countDocuments();
        res.status(200).send({
            messages,
            total
        });
    } catch (err) {
        res.status(500).send({ msg: 'Error del servidor ' });
    }
}

async function getTotalMessage(req, res) {
    const { group_id } = req.params;

    try {
        const total = await GroupMessage.find({ group: group_id }).countDocuments();
        res.status(200).send(JSON.stringify(total));
    } catch (err) {
        res.status(500).send({ msg: 'Error en el servicio' });
    }
}

async function getLastMessage(req, res) {
    const { group_id } = req.params;

    try {
        const response = await GroupMessage.findOne({ group: group_id }).sort({
            createdAt: -1
        }).populate('user');

        res.status(200).send(response || {});
    } catch (e) {
        res.status(500).send({ msg: 'Error del servidor' });
    }
}


export const GroupMessageController = {
    sendText,
    sendImage,
    getAll,
    getTotalMessage,
    getLastMessage
};
