const users = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@email.com'
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com'
  }
];

let currentId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;

const generateNextId = () => {
  currentId += 1;
  return currentId;
};

module.exports = {
  users,
  generateNextId
};
