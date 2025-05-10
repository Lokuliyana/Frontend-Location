export default function NotesList({ notes }) {
  return (
    <ul className="space-y-2">
      {notes.map((note) => (
        <li key={note.id} className="border p-2 rounded shadow-sm">
          <h2 className="font-semibold">{note.title}</h2>
          <p className="text-sm text-gray-700">{note.content}</p>
        </li>
      ))}
    </ul>
  );
}
