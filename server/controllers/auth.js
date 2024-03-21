import { User } from "../models/index.js";
import bscrypt from "bcryptjs";
import { jwt } from "../utils/index.js";

function register(req, res) {
  const { email, password } = req.body;

  const user = new User({
    email: email.toLowerCase(),
  });

  const salt = bscrypt.genSaltSync(10);
  const hashPassword = bscrypt.hashSync(password, salt);
  user.password = hashPassword;

  user
    .save()
    .then((userStorage) => {
      res.status(201).send(userStorage);
    })
    .catch((err) => {
      res.status(400).send({ msg: err });
    });
}

function login(req, res) {
  const { email, password } = req.body;
  const emailLowerCase = email.toLowerCase();

  User.findOne({ email: emailLowerCase })
    .then((userStorage) => {
      bscrypt.compare(password, userStorage.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "erorr del servidor" });
        } else if (!check) {
          res.status(400).send({ msg: "Contraseña incorrecta" });
        } else {
          res.status(200).send({
            access: jwt.createAccesToken(userStorage),
            refresh: jwt.createRefreshtoken(userStorage),
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({ msg: err });
    });
}

function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) res.status(400).send({ msg: "token requerido" });

  const hasExpired = jwt.hasExpiredToken(refreshToken);

  if (hasExpired) {
    res.status(400).send({ msg: "token expirado" });
  }

  const { user_id } = jwt.decoded(refreshToken);

  User.findById(user_id)
    .then((userStorage) => {
      res.status(200).send({
        accessToken: jwt.createAccesToken(userStorage),
      });
    })
    .catch((error) => {
      res.status(500).send({ msg: "Erorr de servidor" });
    });
}

export const AuthController = {
  register,
  login,
  refreshAccessToken,
};
