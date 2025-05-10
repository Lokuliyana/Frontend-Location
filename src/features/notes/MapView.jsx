import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ notes }) {
  return (
    <MapContainer center={[6.9271, 79.8612]} zoom={12} className="h-full w-full z-0">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {notes.map(note => (
        <Marker key={note.id} position={[note.lat, note.lon]}>
          <Popup>
            <strong>{note.title}</strong><br />
            {note.content}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
