package com.main.backend.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class DBConnector {
    public static Connection getCon() throws Exception {
        final String url = "jdbc:postgresql://localhost/electionsdb";
        var props = new Properties();
        props.setProperty("user", "postgres");
        props.setProperty("password", "postgres_password");
        props.setProperty("ssl", "allow");
        Connection con = DriverManager.getConnection(url, props);
        return con;
    }
    public static Connection getConTOHost() throws Exception {
        final String url = "jdbc:postgresql://localhost/";
        var props = new Properties();
        props.setProperty("user", "postgres");
        props.setProperty("password", "postgres_password");
        props.setProperty("ssl", "allow");
        Connection con = DriverManager.getConnection(url, props);
        return con;
    }
}