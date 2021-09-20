package com.main.backend;

import com.main.backend.config.Initializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {
	public final static boolean DEBUG = true;/*set this on false in production*/

	public static void main(String[] args) throws Exception {
		SpringApplication.run(BackendApplication.class, args);
		(new Initializer()).initDB();
	}
}
