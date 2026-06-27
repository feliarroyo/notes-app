package com.ensolvers.notes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ensolvers.notes.model.Note;


public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByArchived(boolean archived);
}
