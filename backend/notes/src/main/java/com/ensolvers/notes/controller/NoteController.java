package com.ensolvers.notes.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ensolvers.notes.dto.NoteRequestDTO;
import com.ensolvers.notes.dto.NoteResponseDTO;
import com.ensolvers.notes.service.NoteService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*") // Change once finished to only allow frontend domain
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;

    @PostMapping
    public ResponseEntity<NoteResponseDTO> createNote(@RequestBody NoteRequestDTO requestDTO) {
        return new ResponseEntity<>(noteService.createNote(requestDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<NoteResponseDTO>> getActiveNotes() {
        return ResponseEntity.ok(noteService.getActiveNotes());
    }

    @GetMapping("/archived")
    public ResponseEntity<List<NoteResponseDTO>> getArchivedNotes() {
        return ResponseEntity.ok(noteService.getArchivedNotes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteResponseDTO> updateNote(@PathVariable Long id, @RequestBody NoteRequestDTO requestDTO) {
        return ResponseEntity.ok(noteService.updateNote(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<NoteResponseDTO> archiveNote(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.archiveNote(id));
    }

    @PatchMapping("/{id}/unarchive")
    public ResponseEntity<NoteResponseDTO> unarchiveNote(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.unarchiveNote(id));
    }

}
