import React from 'react';
import NoteCard from './NoteCard';

export default function NoteList({ notes, onToggleArchive, onDelete, onEdit, loading }) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map((n) => (
                    <div key={n} className="h-48 bg-slate-200 border border-slate-200 rounded-xl"></div>
                ))}
            </div>
        );
    }

    if (notes.length === 0) {
        return (
            <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-xl p-8">
                <p className="text-slate-400 text-lg">No notes found within this view.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onToggleArchive={onToggleArchive}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}