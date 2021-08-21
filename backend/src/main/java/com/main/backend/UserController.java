package com.main.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.ArrayList;


@RestController
public class UserController {
    private final static String ORIGIN = "http://localhost:3000/";

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    private String test() {
        final String s = "WORKS!";
        System.out.println(s);
        return s;
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    private ResponseEntity<Void> register(@RequestBody User user) throws Exception {
        var con = DBConnector.getCon();
        final String query = "INSERT INTO users(name, password) VALUES(?, ?);";
        PreparedStatement ps = con.prepareStatement(query);
        ps.setString(1, user.getName());
        ps.setString(2, user.getPassword());
        ps.execute();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    private ResponseEntity<Void> login(@RequestBody User user) throws Exception {
        var con = DBConnector.getCon();
        final String query = "SELECT COUNT(*)=1 FROM users WHERE name=? AND password=?;";
        PreparedStatement ps = con.prepareStatement(query);
        ps.setString(1, user.getName());
        ps.setString(2, user.getPassword());
        ResultSet resSet = ps.executeQuery();
        final boolean hasNext = resSet.next();
        assert hasNext;
        if (resSet.getBoolean(1)) {
            System.out.println("login!");
        } else {
            throw new SQLException("user not registered");
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private static int getVotesOf(final String name) throws Exception {
        String query = "SELECT votes FROM users WHERE name='%s'";
        query = String.format(query, name);
        var stmt = DBConnector.getCon().createStatement();
        ResultSet resSet = stmt.executeQuery(query);
        final boolean hasNext = resSet.next();
        assert hasNext;
        return resSet.getInt("votes");
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "add-vote/{name}", method = RequestMethod.PUT)
    private ResponseEntity<Void> addVote(@PathVariable String name) throws Exception {
        String query = "UPDATE users SET votes=%d WHERE name='%s';";
        final int currVotes = getVotesOf(name);
        query = String.format(query, currVotes + 1, name);
        var stmt = DBConnector.getCon().createStatement();
        stmt.execute(query);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/president", method = RequestMethod.GET)
    private static String getPresident() throws Exception {
        final String query = "SELECT name FROM users WHERE is_president=TRUE";
        var stmt = DBConnector.getCon().createStatement();
        ResultSet resSet = stmt.executeQuery(query);
        final boolean hasNext = resSet.next();
        assert hasNext;
        return resSet.getString("name");
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "check-vote/{name}", method = RequestMethod.GET)
    private boolean hasVoted(@PathVariable String name) throws Exception {
            var stmt = DBConnector.getCon().createStatement();
            String query = "SELECT has_voted FROM users WHERE name='%s';";
            query = String.format(query, name);
            ResultSet resSet = stmt.executeQuery(query);
            final boolean hasNext = resSet.next();
            assert hasNext;//*/
            return resSet.getBoolean("has_voted");
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/set-voted/{name}", method = RequestMethod.PUT)
    private static ResponseEntity<Void> setHasVoted(@PathVariable String name) throws Exception {
        var stmt = DBConnector.getCon().createStatement();
        String query = "UPDATE users SET has_voted=TRUE WHERE name='%s';";
        query = String.format(query, name);
        stmt.execute(query);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/is-president/{name}", method = RequestMethod.GET)
    private boolean isPresident(@PathVariable String name) throws Exception {
        var stmt = DBConnector.getCon().createStatement();
        String query = "SELECT is_president FROM users WHERE name='%s';";
        query = String.format(query, name);
        ResultSet resSet = stmt.executeQuery(query);
        final boolean hasNext = resSet.next();
        assert hasNext;
        return resSet.getBoolean("is_president");
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/candidates", method = RequestMethod.GET)
    private ArrayList<String> getCandidates() throws Exception {
        final String query = "SELECT name FROM users WHERE is_candidate=TRUE;";
        var stmt = DBConnector.getCon().createStatement();
        ResultSet resSet = stmt.executeQuery(query);
        var ans = new ArrayList<String>();
        while (resSet.next()) {
            ans.add(resSet.getString("name"));
        }
        return ans;
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/is-candidate/{name}", method = RequestMethod.GET)
    private boolean isCandidante(@PathVariable String name) throws Exception {
        var stmt = DBConnector.getCon().createStatement();
        String query = "SELECT is_candidate FROM users WHERE name='%s';";
        query = String.format(query, name);
        ResultSet resSet = stmt.executeQuery(query);
        final boolean hasNext = resSet.next();
        assert hasNext;
        return resSet.getBoolean("is_candidate");
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/set-candidate/{name}", method = RequestMethod.PUT)
    private ResponseEntity<Void> setCandidate(@PathVariable String name) throws Exception {
        var stmt = DBConnector.getCon().createStatement();
        String query = "UPDATE users SET is_candidate=TRUE WHERE name='%s';";
        query = String.format(query, name);
        stmt.execute(query);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private static void deletePresident(final String name) throws Exception {
        String query = "UPDATE users SET is_president=FALSE WHERE name='%s';";
        query = String.format(query, name);
        var stmt = DBConnector.getCon().createStatement();
        stmt.execute(query);
    }

    private static void mkPresident(final String name) throws Exception {
        String query = "UPDATE users SET is_president=TRUE WHERE name='%s';";
        query = String.format(query, name);
        var stmt = DBConnector.getCon().createStatement();
        stmt.execute(query);
    }

    private static String getMaxVotesUser() throws Exception {
        final var stmt = DBConnector.getCon().createStatement();
        final String query = "SELECT name FROM users ORDER BY votes DESC LIMIT 1;";
        ResultSet resSet = stmt.executeQuery(query);
        final boolean hasNext = resSet.next();
        assert hasNext;
        return resSet.getString("name");
    }

    private static void reset() throws Exception {
        var stmt = DBConnector.getCon().createStatement();
        stmt.execute("UPDATE users SET votes=0, has_voted=FALSE, is_candidate=FALSE;");
    }

    public static void updatePresident() throws Exception {
        final String currPresName = getPresident();
        deletePresident(currPresName);
        final String newPresName = getMaxVotesUser();
        mkPresident(newPresName);//*/
        reset();
    }
}
