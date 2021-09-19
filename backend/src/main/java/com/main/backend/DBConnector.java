package com.main.backend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class DBConnector {
    static Connection getCon() throws Exception {
        final String url = "jdbc:postgresql://localhost/electionsdb";
        var props = new Properties();
        props.setProperty("user", "postgres");
        props.setProperty("password", "postgres_password");
        props.setProperty("ssl", "allow");
        Connection con = DriverManager.getConnection(url, props);
        return con;
    }
    static Connection getConTOHost() throws Exception {
        final String url = "jdbc:postgresql://localhost/";
        var props = new Properties();
        props.setProperty("user", "postgres");
        props.setProperty("password", "postgres_password");
        props.setProperty("ssl", "allow");
        Connection con = DriverManager.getConnection(url, props);
        return con;
    }
}