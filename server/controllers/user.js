import { Group, User } from '../models/index.js';
import { getFilePath } from "../utils/index.js";

async function getMe(req, res) {
  const { user_id } = req.user;

  try {
    const response = await User.findById(user_id).select(["-password"]);

    if (!response) {
      res.status(400).send({ msg: "no se ha encontrado el usuario" });
    } else {
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(500).send({ msg: "Error Request" });
  }
}

async function getUsers(req, res) {
  try {
    const { user_id } = req.user;
    const users = await User.find({ _id: { $ne: user_id } }).select([
      "-password",
    ]);
    if (!users) {
      res.status(400).send({ msg: "No se han encontrado usuarios" });
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(500).send({ msg: "Bad Request" });
  }
}

async function getUser(req, res) {
  console.log(req.params.id);
  const { id } = req.params;
  try {
    const user = await User.findById(id).select(["-password"]);
    if (!user) {
      res.status(400).send({ msg: `No hay usuarios con el id ${id}` });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send({ msg: "Bad request" });
  }
}

async function updateUser(req, res) {
  const { user_id } = req.user;

  const userData = req.body;

  if (req.files.avatar) {
    const imagePath = getFilePath(req.files.avatar);
    userData.avatar = imagePath;
  }

  User.findByIdAndUpdate({ _id: user_id }, userData)
    .select(["-password"])
    .then((updateUser) => {
      res.status(200).send(updateUser);
    })
    .catch((error) => {
      res.status(500).send({ msg: "Bad Request" });
    });
}

async function getUsersExeptParticipantsGroup (req, res){
  const {group_id} = req.params

  const group = await Group.findById(group_id)

  const participantsString = group.participants.toString()
  const participants = participantsString.split(",")

  const response = await User.find({_id: {$nin: participants}}).select(["-password"])

  if(!response){
    res.status(400).send({msg: "No se ha encontrado ningun usuario"})
  } else {
    res.status(200).send(response)
  }
}

export const UserController = {
  getMe,
  getUsers,
  getUser,
  updateUser,
  getUsersExeptParticipantsGroup
};
