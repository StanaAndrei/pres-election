package com.main.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;

@SpringBootApplication
public class BackendApplication {
	public final static boolean DEBUG = true;/*set this on false in production*/

	public static void main(String[] args) throws Exception {
		SpringApplication.run(BackendApplication.class, args);
		(new Initializer()).initDB();
	}
}
