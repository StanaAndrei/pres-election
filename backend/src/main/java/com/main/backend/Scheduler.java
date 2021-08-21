package com.main.backend;

import java.util.TimerTask;

public class Scheduler extends TimerTask {
    @Override
    public void run() {
        if (BackendApplication.DEBUG && BackendApplication.DEBUG_FI_TIME) {
            BackendApplication.DEBUG_FI_TIME = false;
            return;
        }
        System.out.println("run!");
        try {
            UserController.updatePresident();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            assert false;
        }
    }
}
