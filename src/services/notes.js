import axios from './axios';

export async function getNotes() {
  try {
    const res = await axios.get('/notes');
    return res.data;
  } catch (e) {
    console.error('Failed to fetch notes');
    return [];
  }
}

export async function createNote(note) {
  try {
    await axios.post('/notes', note);
  } catch (e) {
    alert('Failed to create note');
  }
}
