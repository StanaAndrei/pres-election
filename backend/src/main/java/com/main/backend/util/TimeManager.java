package com.main.backend.util;

import com.main.backend.BackendApplication;

public class TimeManager {
    public static String getElectionUnit() {
        if (BackendApplication.DEBUG) {
            return "MINUTE";
        }
        return "DAY";
    }
}
