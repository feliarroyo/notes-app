package com.ensolvers.notes.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ensolvers.notes.model.Note;
import com.ensolvers.notes.repository.NoteRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NoteService {
    private final NoteRepository noteRepository;

    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public List<Note> getActiveNotes() {
        return noteRepository.findByArchived(false);
    }

    public List<Note> getArchivedNotes() {
        return noteRepository.findByArchived(true);
    }

    public Note updateNote(Long id, Note updatedNote) {
        return noteRepository.findById(id)
                .map(note -> {
                    note.setTitle(updatedNote.getTitle());
                    note.setContent(updatedNote.getContent());
                    note.setArchived(updatedNote.isArchived());
                    return noteRepository.save(note);
                })
                .orElseThrow(() -> new RuntimeException("Note not found with id " + id));
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    public Note archiveNote(Long id) {
        return noteRepository.findById(id)
                .map(note -> {
                    note.setArchived(true);
                    return noteRepository.save(note);
                })
                .orElseThrow(() -> new RuntimeException("Note not found with id " + id));
    }

    public Note unarchiveNote(Long id) {
        return noteRepository.findById(id)
                .map(note -> {
                    note.setArchived(false);
                    return noteRepository.save(note);
                })
                .orElseThrow(() -> new RuntimeException("Note not found with id " + id));
    }
}
