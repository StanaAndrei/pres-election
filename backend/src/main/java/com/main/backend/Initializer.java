package com.main.backend;

import org.apache.ibatis.jdbc.ScriptRunner;
import java.io.*;
import java.sql.ResultSet;

public class Initializer {

    private static void createDbIfNotExists() throws Exception {
        var stmt = DBConnector.getConTOHost().createStatement();
        final var query = "SELECT 1 FROM pg_database WHERE datname='electionsdb'";
        ResultSet rs = stmt.executeQuery(query);
        if (!(rs.next() && rs.getBoolean(1))) {
            stmt.execute("CREATE DATABASE electionsdb");
            System.out.println("db created!");
        }
    }

    public void initDB() throws Exception {
        createDbIfNotExists();
        var con = DBConnector.getCon();
        var scriptRunner = new ScriptRunner(con);
        final var res = "/static/sql-init-queries.sql";
        var file = new File(this.getClass().getResource(res).getPath());
        var fileReader = new FileReader(file);
        Reader bufferedReader = new BufferedReader(fileReader);//*/
        scriptRunner.runScript(bufferedReader);
    }
}
