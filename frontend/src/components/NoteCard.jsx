import React from 'react';

export default function NoteCard({ note, onToggleArchive, onDelete, onEdit }) {
    return (
        <div className={`p-6 rounded-xl border transition-all duration-200 ${note.archived
            ? 'bg-slate-100/70 border-slate-200 shadow-sm opacity-75'
            : 'bg-white border-slate-200 shadow-md hover:shadow-lg'
        }`}>
        {/* Note Header: Title */}
        <div className="flex justify-between items-start gap-4 mb-3">
            <h3 className={`text-lg font-bold text-slate-800 break-words flex-1 ${note.archived ? 'text-slate-500' : ''
                }`}>
                {note.title || <span className="italic text-slate-400">(No title)</span>}
            </h3>

            {/* Status Badge */}
            {note.archived && (
                <span className="text-xs bg-slate-200 text-slate-600 font-medium px-2 py-0.5 rounded-full">
                    Archived
                </span>
            )}
        </div>

        {/* Note Body: Content */}
        <p className={`text-slate-600 text-sm whitespace-pre-wrap break-words mb-6 min-h-[60px] ${note.archived ? 'text-slate-400' : ''
            }`}>
            {note.content || <span className="italic text-slate-300">(No content)</span>}
        </p>

        {/* Note Actions Footer */}
        <div className="flex justify-end items-center gap-2 border-t pt-4 border-slate-100">
            {!note.archived && (
                <button
                    onClick={() => onEdit(note)}
                    className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                    Edit
                </button>
            )}

            <button
                onClick={() => onToggleArchive(note.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${note.archived
                        ? 'text-slate-600 hover:bg-slate-200'
                        : 'text-amber-600 hover:bg-amber-50'
                    }`}
            >
                {note.archived ? 'Unarchive' : 'Archive'}
            </button>

            <button
                onClick={() => {
                    if (window.confirm('Are you sure you want to delete this note permanently?')) {
                        onDelete(note.id);
                    }
                }}
                className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
                Delete
            </button>
        </div>
    </div>
  );
}