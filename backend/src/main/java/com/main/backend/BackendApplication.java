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
	public static boolean DEBUG_FI_TIME = true;
	private final static int SECS_IN_A_DAY = 86400;
	private final static int SECS_FOR_DEBUG = 100;
	private final static int CAL_UNIT = (DEBUG ? Calendar.SECOND : Calendar.DAY_OF_MONTH);
	private final static int CAL_AMOUNT = (DEBUG ? SECS_FOR_DEBUG : 1);
	private final static int PERIOD = (DEBUG ? SECS_FOR_DEBUG : SECS_IN_A_DAY) * (int)1E3;

	private static void initTimer() throws Exception {
		final String format = "yyyy/MM/dd HH:mm:ss";
		DateFormat dateFormatter = new SimpleDateFormat(format);
		var currDate = new Date();
		final String currDateStr = (new SimpleDateFormat("yyyy/MM/dd").format(currDate));
		final String nxtUpDateStr = (currDateStr + " 00:00:00");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(dateFormatter.parse(nxtUpDateStr));
		calendar.add(CAL_UNIT, CAL_AMOUNT);
		final Date date = calendar.getTime();
		var timer = new Timer();
		timer.schedule(new Scheduler(), date, PERIOD);
		System.out.println(date);
		System.out.println("SCHEDULED!");
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(BackendApplication.class, args);
		initTimer();
	}

}
