const BASE_URL = 'http://localhost:8080/api/notes';

export const api = {
  getNotes: async (params = {}) => {
    let url = BASE_URL;
    if (params.archived !== undefined) {
      url += `?archived=${params.archived}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch notes');
    return response.json();
  },

  createNote: async (note) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
    if (!response.ok) throw new Error('Failed to create note');
    return response.json();
  },

  updateNote: async (id, note) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
    if (!response.ok) throw new Error('Failed to update note');
    return response.json();
  },

  deleteNote: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete note');
    return response.json();
  }
};