const { addNoteHandler, getAllNotesHandler, getNoteById, updateNoteById, deleteNoteById } = require('./handler');

/*eslint linebreak-style: ["error", "windows"]*/ // \r\n
const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteById
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateNoteById,

  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteById
  }
];

module.exports = routes;