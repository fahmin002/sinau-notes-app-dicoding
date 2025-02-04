const { nanoid } = require('nanoid');
const notes = require('./notes');

/*eslint linebreak-style: ['error', 'windows']*/ // \r\n
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload; // Mendapatkan body dari payload
  const id = nanoid(16); // membuat id baru dengan 16 karakter acak
  const createdAt = new Date().toISOString(); // mendapatkan tanggal sekarang
  const updatedAt = createdAt; // sama dengan createdAt

  // Membuat note baru untuk ditambahkan ke array
  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  };

  notes.push(newNote);
  // check bahwa note baru sudah ditambbahkan atau belum
  // menyamakan hasil generate nanoId(16) dengan id yang ada di dalam array
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    });
    // response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  // response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
  response.code(500);
  return response;
};

const getAllNotesHandler = (request, h) => ({
  status: 'success',
  data: {
    notes
  }
});

const getNoteById = (request, h) => {
  const { id } = request.params;
  // mencari note dengan id dari parameter /notes/{id} (path parameter)
  const note = notes.find((note) => note.id === id);
  if (note !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        note
      }
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Data tidak ditemukan'
  });
  response.code(404);
  return response;
};

const updateNoteById = (request, h) => {
  // mendapatkan body/payload dari request
  const { title, tags, body } = request.payload;
  // mendapatkan id dari parameter path "/notes/{id}"
  const { id } = request.params;
  // mencari note yang mau diubah
  const oldNote = notes.find((note) => note.id === id);
  // jika note ada
  if (oldNote !== undefined) {
    // dapatkan createdAt dari note lama
    const { createdAt } = oldNote;
    // buat tanggal baru untuk createdAt
    const updatedAt = new Date().toISOString();
    // buat note baru berdasarkan data dari request.payload dan request.params
    const newNote = {
      id, title, tags, body, createdAt, updatedAt
    };
    // mencari index dari note yang mau diubah dengan method Array.map() berdasarkan id dari request.params
    // Array.map mengembalikan array dengan variabel yang diinginkan
    // disini yaitu note.id, berarti map() disini mengembalikan kumpulan id dari note saja
    // lalu mencari indexnya berdasarkan variabel id, dengan method indexOf
    const index = notes.map((note) => note.id).indexOf(id);
    // menghapus note lama dan menggantinya dengan note yang baru dengan posisi yang sama
    // Array.splice itu bekerja dengan 3 parameter fungsi,
    // @param start - letak index dimulai untuk menghapus elemen
    // @param deleteCount — jumlah elemen yang mau dihapus.
    // @param items — elemen-elemen baru untuk mengganti posisi elemen yang terhapus.
    // @returns — An array containing the elements that were deleted.
    const isSuccess = notes.splice(index, 1, newNote);
    if (!isSuccess) {
      const response = h.response({
        status: 'fail',
        message: 'Data gagal diubah'
      });
      response.code(500);
      return response;
    }
    const response = h.response({
      status: 'success',
      message: 'Data berhasil diubah',
      data: {
        noteId: newNote.id
      }
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: `Data dengan id: ${id} tidak ditemukan`
  });
  response.code(404);
  return response;
};

const deleteNoteById = (request, h) => {
  const { id } = request.params;
  const index = notes.map((note) => note.id).indexOf(id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Data berhasil dihapus',
      data: {
        deletedId: id
      }
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: `Data dengan id: ${id} tidak ditemukan`
  });
  response.code(404);
  return response;

};
module.exports = { addNoteHandler, getAllNotesHandler, getNoteById, updateNoteById, deleteNoteById };