package com.ensolvers.notes.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ensolvers.notes.dto.NoteRequestDTO;
import com.ensolvers.notes.dto.NoteResponseDTO;
import com.ensolvers.notes.model.Note;
import com.ensolvers.notes.model.Tag;
import com.ensolvers.notes.repository.NoteRepository;
import com.ensolvers.notes.repository.TagRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NoteService {
    private final NoteRepository noteRepository;
    private final TagRepository tagRepository;

    public NoteResponseDTO createNote(NoteRequestDTO requestDTO) {
        Note note = new Note();
        note.setTitle(requestDTO.getTitle());
        note.setContent(requestDTO.getContent());
        note.setArchived(false);
        Set<Tag> managedTags = new HashSet<>();
        if (requestDTO.getTagNames() != null) {
            for (String tagName : requestDTO.getTagNames()) {
                Tag tag = tagRepository.findByName(tagName)
                        .orElseGet(() -> {
                            Tag newTag = new Tag();
                            newTag.setName(tagName);
                            return tagRepository.save(newTag);
                        });
                managedTags.add(tag);
            }
        }
        note.setTags(managedTags);
        Note savedNote = noteRepository.save(note);
        return convertToResponseDTO(savedNote);
    }

    public List<NoteResponseDTO> getActiveNotes() {
        return noteRepository.findByArchived(false).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public List<NoteResponseDTO> getArchivedNotes() {
        return noteRepository.findByArchived(true).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public NoteResponseDTO updateNote(Long id, NoteRequestDTO requestDTO) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found with id " + id));
        note.setTitle(requestDTO.getTitle());
        note.setContent(requestDTO.getContent());

        Set<Tag> managedTags = new HashSet<>();
        if (requestDTO.getTagNames() != null) {
            for (String tagName : requestDTO.getTagNames()) {
                Tag tag = tagRepository.findByName(tagName)
                        .orElseGet(() -> {
                            Tag newTag = new Tag();
                            newTag.setName(tagName);
                            return tagRepository.save(newTag);
                        });
                managedTags.add(tag);
            }
        }
        note.setTags(managedTags);

        Note updatedNote = noteRepository.save(note);
        return convertToResponseDTO(updatedNote);
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    public NoteResponseDTO archiveNote(Long id) {
        Note n = noteRepository.findById(id)
                .map(note -> {
                    note.setArchived(true);
                    return noteRepository.save(note);
                })
                .orElseThrow(() -> new RuntimeException("Note not found with id " + id));
        return convertToResponseDTO(n);
    }

    public NoteResponseDTO unarchiveNote(Long id) {
        Note n = noteRepository.findById(id)
                .map(note -> {
                    note.setArchived(false);
                    return noteRepository.save(note);
                })
                .orElseThrow(() -> new RuntimeException("Note not found with id " + id));
        return convertToResponseDTO(n);
    }

    // Helper method to handle Entity -> Response DTO conversion cleanly
    private NoteResponseDTO convertToResponseDTO(Note note) {
        NoteResponseDTO responseDTO = new NoteResponseDTO();
        responseDTO.setId(note.getId());
        responseDTO.setTitle(note.getTitle());
        responseDTO.setContent(note.getContent());
        responseDTO.setArchived(note.isArchived());

        Set<String> tagNames = note.getTags().stream()
                .map(Tag::getName)
                .collect(Collectors.toSet());
        responseDTO.setTagNames(tagNames);

        return responseDTO;
    }
}
