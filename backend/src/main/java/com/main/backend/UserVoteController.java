package com.main.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.util.Calendar;
import java.util.Date;

@RestController
public class UserVoteController {

    @RequestMapping(value = "/add-vote", method = RequestMethod.PUT)
    public ResponseEntity<Void> addVote(@RequestBody UserVote userVote) throws Exception {
        if (hasVoted(userVote.getUserWhoVoted()) || !ElectionController.isCandidante(userVote.getVotedUser())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }//*/
        String query = "INSERT INTO user_votes(voted_user, user_who_voted) VALUES('%s', '%s');";
        query = String.format(query, userVote.getVotedUser(), userVote.getUserWhoVoted());
        var stmt = DBConnector.getCon().createStatement();
        stmt.execute(query);//*/
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/president", method = RequestMethod.GET)
    private static String getPresident() throws Exception {
        String query = "SELECT voted_user FROM user_votes " +
                "WHERE (EXTRACT(%s FROM NOW() - INTERVAL '1 %s')=EXTRACT(%s FROM date_voted)) " +
                "GROUP BY voted_user ORDER BY COUNT(*) DESC LIMIT 1;";
        final var eleUnit = TimeManager.getElectionUnit();
        query = String.format(query, eleUnit, eleUnit, eleUnit);
        var stmt = DBConnector.getCon().createStatement();
        ResultSet resultSet = stmt.executeQuery(query);
        boolean hasNext = resultSet.next();
        if (!hasNext) {
            return "";
        }
        final String president = resultSet.getString(1);
        return president;
    }

    @RequestMapping(value = "/check-vote/{userWhoVoted}", method = RequestMethod.GET)
    private static Boolean hasVoted(@PathVariable String userWhoVoted) throws Exception {
        var stmt = DBConnector.getCon().createStatement();
        {
            String query = "SELECT COUNT(*)=1 FROM users WHERE username='%s';";
            query = String.format(query, userWhoVoted);
            ResultSet resultSet = stmt.executeQuery(query);
            resultSet.next();
            if (!resultSet.getBoolean(1)) {
                return false;
            }
        }
        String query = "SELECT EXTRACT(%s FROM date_voted) FROM user_votes WHERE user_who_voted='%s';";
        query = String.format(query, TimeManager.getElectionUnit(), userWhoVoted);
        ResultSet resultSet = stmt.executeQuery(query);
        final boolean hasNext = resultSet.next();
        if (!hasNext) {
            return false;
        }
        do {
            var unit = resultSet.getInt(1);
            int currUnit;
            final var date = new Date();
            final var calendar = Calendar.getInstance();
            calendar.setTime(date);

            if (TimeManager.getElectionUnit() == "MINUTE") {
                currUnit = calendar.get(Calendar.MINUTE);//in debug
            } else {
                currUnit = calendar.get(Calendar.DAY_OF_MONTH);
            }
            if (currUnit == unit) {
                return true;
            }
        } while (resultSet.next());
        return false;
    }

    @RequestMapping(value = "/is-president/{name}", method = RequestMethod.GET)
    private Boolean isPresident(@PathVariable String name) throws Exception {
        return getPresident().equals(name);
    }
}
