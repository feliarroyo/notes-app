import { useState, useEffect } from 'react';

export default function NoteForm( { onSave, initialData, onCancel } ) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() && !content.trim()) return;
        onSave({ ...initialData, title: title.trim(), content: content.trim() });

        setTitle('');
        setContent('');
    }
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md max-w-xl mx-auto mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{initialData ? 'Edit Note' : 'Create New Note'}</h3>

            <form onSubmit={ handleSubmit } className="space-y-4">
                {/* Title Input */}
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="(Enter note title)"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>

                {/* Content Input */}
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Content
                    </label>
                    <textarea
                        rows="4"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="(Write note content here)"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
                    >
                        Save Note
                    </button>
                    {initialData && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded-lg shadow-sm transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}