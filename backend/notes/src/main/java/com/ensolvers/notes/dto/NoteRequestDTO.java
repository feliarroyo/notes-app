package com.ensolvers.notes.dto;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoteRequestDTO {
    private String title;
    private String content;
    private Set<String> tagNames; // frontend sends strings instead of ids
}
