package com.main.backend.controllers;

import com.main.backend.models.User;
import com.main.backend.util.DBConnector;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;

@RestController
public class UserController {

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    private String test() {
        final String s = "WORKS!";
        System.out.println(s);
        return s;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    private ResponseEntity<Void> register(@RequestBody User user) throws Exception {
        var con = DBConnector.getCon();
        final String query = "INSERT INTO users(username, password) VALUES(?, ?);";
        PreparedStatement ps = con.prepareStatement(query);
        ps.setString(1, user.getUsername());
        ps.setString(2, user.getPassword());
        ps.execute();//*/
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    private ResponseEntity<Void> login(@RequestBody User user) throws Exception {
        var con = DBConnector.getCon();
        final String query = "SELECT COUNT(*)=1 FROM users WHERE username=? AND password=?;";
        PreparedStatement ps = con.prepareStatement(query);
        ps.setString(1, user.getUsername());
        ps.setString(2, user.getPassword());
        ResultSet resSet = ps.executeQuery();
        final boolean hasNext = resSet.next();
        assert hasNext;
        if (resSet.getBoolean(1)) {
            System.out.println("login!");
            return new ResponseEntity<>(HttpStatus.OK);
        }
        throw new SQLException("login error!");
    }
}
