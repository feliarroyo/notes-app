import React, { useEffect, useState } from 'react';
import { api } from './services/api';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [viewArchived, setViewArchived] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notes from backend
  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await api.getNotes({ archived: viewArchived });
      setNotes(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend server. Make sure Spring Boot is running on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, [viewArchived]);

  const handleCreateNote = async (newNoteData) => {
    try {
      // Send data via POST
      const savedNote = await api.createNote(newNoteData);
      
      // Add to UI array if currently on Active Notes
      if (!viewArchived) {
        setNotes((prevNotes) => [savedNote, ...prevNotes]);
      } else {
        alert('Note created successfully on "Active Notes"');
      }
    } catch (err) {
      alert('Error creating note: ' + err.message);
    }
  };

  // Toggle archive status
  const handleToggleArchive = async (id) => {
    try {
      await api.toggleArchiveNote(id, viewArchived);
      loadNotes(); // Refresh to move note out of current view
    } catch (err) {
      alert('Error updating archive status: ' + err.message);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      await api.deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      alert('Error deleting note: ' + err.message);
    }
  };

  const handleEditPlaceholder = (note) => {
    alert(`Edit modal triggered for Note ID: ${note.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            Notes App
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewArchived(false)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                !viewArchived ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Active Notes
            </button>
            <button
              onClick={() => setViewArchived(true)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                viewArchived ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Archive
            </button>
          </div>
        </div>
      </header>

      {/* Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
            <strong className="font-semibold">Connection Error</strong>
            <p className="text-sm text-red-600/90">{error}</p>
          </div>
        )}

        {/* NoteForm creates note when calling onSave */}
        <NoteForm onSave={handleCreateNote} />

        <div className="mb-6 mt-12">
          <h2 className="text-2xl font-bold text-slate-800">
            {viewArchived ? 'Archived Notes' : 'Active Notes'}
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            {notes.length} note{(notes.length !== 1) ? 's' : ''}
          </p>
        </div>

        <NoteList 
          notes={notes}
          loading={loading}
          onToggleArchive={handleToggleArchive}
          onDelete={handleDelete}
          onEdit={handleEditPlaceholder}
        />
      </main>
    </div>
  );
}