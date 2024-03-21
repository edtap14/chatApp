import { Group, User } from '../models/index.js';
import { getFilePath } from '../utils/index.js';

function create(req, res) {
    const { user_id } = req.user;
    const group = new Group(req.body);
    group.creator = user_id;
    group.participants = JSON.parse(req.body.participants);
    group.participants = [...group.participants, user_id];
    if (req.files.image) {
        const imagePath = getFilePath(req.files.image);
        group.image = imagePath;
    }

    group.save().then((groupStorage) => {
        if (!groupStorage) {
            res.status(400).send({ msg: 'Error al crear el grupo' });
        } else {
            res.status(200).send(groupStorage);
        }
    }).catch((err) => {
        if (err) {
            res.status(500).send({ msg: 'Error del servidor' });
        }
    });
}

function getAll(req, res) {
    const { user_id } = req.user;
    Group.find({ participants: user_id })
        .populate('creator')
        .populate('participants')
        .then((groups) => {
            //TODO: Obtener fecha del ultim mensaje de cada grupo
            res.status(200).send(groups);
        })
        .catch(() => {
            res.status(400).send({ msg: 'Error al recuperar los grupos' });
        });
}

function getGroup(req, res) {
    const { group_id } = req.params;

    Group.findById(group_id)
        .populate('participants')
        .then((groupStorage) => {
            if (!groupStorage) {
                res.status(400).send({ msg: 'No se encontro información del grupo' });
            }
            res.status(200).send(groupStorage);
        }).catch(err => {
        res.status(400).send({ msg: 'Error del Servidor' });
    });
}

async function updateGroup(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const group = await Group.findById(id);

    if (name) group.name = name;

    if (req.files.image) {
        const imagePath = getFilePath(req.files.image);
        group.image = imagePath;
    }

    Group.findByIdAndUpdate(id, group).then(() => {

        res.status(200).send({
            image: group.image,
            name: group.name
        });

    }).catch(err => {
        res.status(500).send({ msg: 'Error del servidor' });
    });
}

async function exitGroup(req, res) {
    const { id } = req.params;
    const { user_id } = req.user;

    const group = await Group.findById(id);

    const newParticipants = group.participants.filter((participant) =>
        participant.toString() !== user_id
    );

    const newData = {
        ...group._doc,
        participants: newParticipants
    };

    await Group.findByIdAndUpdate(id, newData).then(() => {
        res.status(200).send({ msg: 'Salida exitosa' });
    }).catch(() => {
        res.status(400).send({ msg: 'Error al intentarte salir del grupo' });
    });


}

async function addParticipants(req, res) {
    const { id } = req.params;
    const { users_id } = req.body;


    const group = await Group.findById(id);

    const users = await User.find({ _id: users_id });

    const arrayObjetId = [];

    users.forEach((user) => {
        arrayObjetId.push(user._id);
    });


    const newData = {
        ...group._doc,
        participants: [...group.participants, ...arrayObjetId]
    };

    await Group.findByIdAndUpdate(id, newData);

    res.status(200).send({ msg: 'Participantes añadidos correctamente' });
}

async function banParticipant(req, res) {
    const {
        group_id,
        user_id
    } = req.body;

    const group = await Group.findById(group_id);

    const newParticipants = group.participants.filter((participant) => participant.toString() !== user_id);

    const newData = {
        ...group._doc,
        participants: newParticipants
    };

    await Group.findByIdAndUpdate(group_id, newData);

    res.status(200).send({ msg: 'Baneo con exito' });
}

export const GroupController = {
    create,
    getAll,
    getGroup,
    updateGroup,
    exitGroup,
    addParticipants,
    banParticipant
};
