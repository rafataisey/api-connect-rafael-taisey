const { users, generateNextId } = require('../data/usersData');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userController = {
  getUsers: (req, res) => {
    return res.status(200).json({
      success: true,
      error: null,
      data: users
    });
  },

  getUserById: (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_ID', message: 'O ID informado deve ser um número inteiro.' },
        data: null
      });
    }

    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: `Usuário com o ID ${userId} não foi encontrado.` },
        data: null
      });
    }

    return res.status(200).json({ success: true, error: null, data: user });
  },

  createUser: (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_FIELDS', message: 'Os campos "name" e "email" são obrigatórios.' },
        data: null
      });
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_NAME', message: 'O campo "name" deve ser um texto válido.' },
        data: null
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_EMAIL', message: 'Formato de e-mail inválido.' },
        data: null
      });
    }

    const newUser = {
      id: generateNextId(),
      name: name.trim(),
      email: email.trim().toLowerCase()
    };

    users.push(newUser);

    return res.status(201).json({ success: true, error: null, data: newUser });
  },

  updateUser: (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { name, email } = req.body;

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_ID', message: 'O ID informado deve ser um número inteiro.' },
        data: null
      });
    }

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: `Usuário com o ID ${userId} não foi encontrado.` },
        data: null
      });
    }

    if (name) users[userIndex].name = name.trim();
    if (email && EMAIL_REGEX.test(email)) users[userIndex].email = email.trim().toLowerCase();

    return res.status(200).json({ success: true, error: null, data: users[userIndex] });
  },

  deleteUser: (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_ID', message: 'O ID informado deve ser um número inteiro.' },
        data: null
      });
    }

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: `Usuário com o ID ${userId} não foi encontrado.` },
        data: null
      });
    }

    users.splice(userIndex, 1);

    return res.status(200).json({
      success: true,
      error: null,
      data: { message: `Usuário ${userId} removido com sucesso.` }
    });
  }
};

module.exports = userController;
