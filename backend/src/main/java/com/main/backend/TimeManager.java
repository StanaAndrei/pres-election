package com.main.backend;

public class TimeManager {
    public static String getElectionUnit() {
        if (BackendApplication.DEBUG) {
            return "MINUTE";
        }
        return "DAY";
    }
}
