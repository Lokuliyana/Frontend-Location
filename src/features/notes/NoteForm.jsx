import { useState } from 'react';
import { createNote } from '../../services/notes';

export default function NoteForm({ onNoteCreated }) {
  const [note, setNote] = useState({ title: '', content: '', lat: '', lon: '' });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote(note);
    setNote({ title: '', content: '', lat: '', lon: '' });
    onNoteCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input name="title" placeholder="Title" value={note.title} onChange={handleChange}
        className="w-full p-2 border rounded" />
      <textarea name="content" placeholder="Content" value={note.content} onChange={handleChange}
        className="w-full p-2 border rounded" />
      <div className="grid grid-cols-2 gap-2">
        <input name="lat" placeholder="Latitude" value={note.lat} onChange={handleChange}
          className="p-2 border rounded" />
        <input name="lon" placeholder="Longitude" value={note.lon} onChange={handleChange}
          className="p-2 border rounded" />
      </div>
      <button className="w-full bg-green-600 text-white py-2 rounded">Create Note</button>
    </form>
  );
}
