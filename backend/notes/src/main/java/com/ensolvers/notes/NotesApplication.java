package com.ensolvers.notes;


import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NotesApplication {

	public static void main(String[] args) {
		// Prevents issues with time zone between Windows and Linux (Docker)
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		
		SpringApplication.run(NotesApplication.class, args);
	}

}
