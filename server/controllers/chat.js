import { Chat, ChatMessage } from '../models/index.js';

// functions
async function create(req, res) {
    const {
        participant_id_one,
        participant_id_two
    } = req.body;

    const foundOne = await Chat.findOne({
        participant_one: participant_id_one,
        participant_two: participant_id_two,
    });

    const foundTwo = await Chat.findOne({
        participant_one: participant_id_two,
        participant_two: participant_id_one,
    });

    if (foundOne || foundTwo) {
        res.status(200).send({ msg: 'Ya tienes un chat con este usuario' });
        return;
    }

    const chat = new Chat({
        participant_one: participant_id_one,
        participant_two: participant_id_two,
    });

    chat
        .save()
        .then((chatStorage) => {
            res.status(200).send(chatStorage);
        })
        .catch((error) => {
            res.status(400).send({ msg: 'Error al crear el chat' });
        });
}

async function getAll(req, res) {
    const { user_id } = req.user;
    console.log(user_id);

    Chat.find({
        $or: [{ participant_one: user_id }, { participant_two: user_id }],
    })
        .populate('participant_one')
        .populate('participant_two')
        .exec()
        .then(async (chats) => {
            const arrayChats = [];
            for (const chat of chats) {
                const response = await ChatMessage.findOne({ chat: chat._id }).sort({
                    createdAt: -1
                });
                arrayChats.push({
                    ...chat._doc,
                    last_message_date: response?.createdAt || null
                });
            }

            res.status(200).send(arrayChats);
        })
        .catch((error) => {
            res.status(400).send('Error al obtener los chats');
        });
}

async function deleteChat(req, res) {
    const { id } = req.params;

    Chat.findByIdAndDelete(id)
        .then((id) => {
            res.status(200).send(`Chat eliminado`);
        })
        .catch((error) => {
            res
                .status(500)
                .send({ msg: 'Erorr en el servidor al intentar borrar el chat' });
        });
}

async function getChat(req, res) {
    const { id } = req.params;

    Chat.findById(id)
        .populate('participant_one')
        .populate('participant_two')
        .then((chatStorage) => {
            res.status(200).send(chatStorage);
        })
        .catch(() => {
            res.status(400).send({ msg: 'Error al obtener el chat' });
        });
}

export const ChatController = {
    create,
    getAll,
    deleteChat,
    getChat,
};
