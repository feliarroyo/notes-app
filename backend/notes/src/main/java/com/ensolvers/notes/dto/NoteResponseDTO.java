package com.ensolvers.notes.dto;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoteResponseDTO {
    private Long id;
    private String title;
    private String content;
    private boolean archived;
    private Set<String> tagNames; // frontend receives strings instead of ids
}
