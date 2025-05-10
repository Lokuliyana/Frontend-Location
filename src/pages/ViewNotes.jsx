import { useEffect, useState } from 'react';

export default function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editedData, setEditedData] = useState({ title: '', description: '', tags: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const dummyNotes = [
      {
        id: 1,
        title: 'Morning Walk',
        description: 'Walked around the lake and noted bird activity.',
        tags: ['nature', 'exercise'],
        location: { lat: 37.7749, lng: -122.4194 },
      },
      {
        id: 2,
        title: 'Coffee Spot',
        description: 'Found a nice coffee shop with great Wi-Fi.',
        tags: ['cafe', 'remote work'],
        location: { lat: 40.7128, lng: -74.006 },
      },
    ];
    setNotes(dummyNotes);
  }, []);

  const filteredNotes = notes.filter((note) => {
    const search = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(search) ||
      note.description.toLowerCase().includes(search) ||
      note.tags.some(tag => tag.toLowerCase().includes(search))
    );
  });

  const handleEdit = (note) => {
    setEditingNote(note.id);
    setEditedData({
      title: note.title,
      description: note.description,
      tags: note.tags.join(', '),
    });
  };

  const handleSave = () => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === editingNote
          ? { ...n, ...editedData, tags: editedData.tags.split(',').map(t => t.trim()) }
          : n
      )
    );
    setEditingNote(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100000 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Saved Notes</h2>

        {/* Search Input */}
        <input
          type="text"
          className="mb-6 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
          placeholder="Search by title, description, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredNotes.length === 0 ? (
          <p className="text-gray-600">No matching notes found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredNotes.map((note) => (
              <li key={note.id} className="p-4 border rounded shadow-sm bg-gray-100">
                {editingNote === note.id ? (
                  <>
                    <input
                      type="text"
                      className="mb-2 p-2 w-full border rounded"
                      value={editedData.title}
                      onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                    />
                    <textarea
                      className="mb-2 p-2 w-full border rounded"
                      value={editedData.description}
                      onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                    />
                    <input
                      type="text"
                      className="mb-2 p-2 w-full border rounded"
                      placeholder="comma-separated tags"
                      value={editedData.tags}
                      onChange={(e) => setEditedData({ ...editedData, tags: e.target.value })}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNote(null)}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-600">{note.title}</h3>
                    <p className="text-gray-700 mb-2">{note.description}</p>
                    <p className="text-sm text-gray-600">Tags: {note.tags.join(', ')}</p>
                    {note.location && (
                      <p className="text-sm text-gray-500">
                        Location: {note.location.lat.toFixed(4)}, {note.location.lng.toFixed(4)}
                      </p>
                    )}
                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={() => handleEdit(note)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
