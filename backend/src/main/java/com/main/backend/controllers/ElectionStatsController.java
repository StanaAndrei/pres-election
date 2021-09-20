package com.main.backend.controllers;

import com.main.backend.BackendApplication;
import com.main.backend.util.DBConnector;
import com.main.backend.util.TimeManager;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class ElectionStatsController {
    final static String eleUnit = TimeManager.getElectionUnit();

    @RequestMapping(value = "/election-stats", method = RequestMethod.GET)
    private static ResponseEntity<String> getEleStats(
            @RequestParam(name = "year", required = false, defaultValue = "") String year,
            @RequestParam(name = "month", required = false, defaultValue = "") String month,
            @RequestParam(name = "day", required = false, defaultValue = "") String day,
            @RequestParam(name = "hour", required = false, defaultValue = "") String hour,
            @RequestParam(name = "minute", required = false, defaultValue = "") String minute
    ) throws Exception {
        var ans = new JSONObject();
        ResultSet resultSet;
        var stmt = DBConnector.getCon().createStatement();

        String strDate = "";
        if (year.equals("")) {
            year = new SimpleDateFormat("yyyy").format(new Date());
        }
        if (month.equals("")) {
            month = new SimpleDateFormat("MM").format(new Date());
        }
        if (day.equals("")) {
            day = new SimpleDateFormat("dd").format(new Date());
        }
        if (hour.equals("")) {
            hour = new SimpleDateFormat("HH").format(new Date());
        }
        if (minute.equals("")) {
            minute = new SimpleDateFormat("mm").format(new Date());
        }

        //constr the strDate
        strDate += year + "-";
        strDate += month + "-";
        strDate += day;
        if (BackendApplication.DEBUG){
            strDate += " ";
            strDate += hour + ":";
            strDate += minute + ":";
            //strDate += second + ":";
        }
        String query = "SELECT * FROM elections WHERE " +
                "DATE_TRUNC('%s', election_date)=DATE_TRUNC('%s', TIMESTAMP '%s');";
        query = String.format(query, eleUnit, eleUnit, strDate);
        resultSet = stmt.executeQuery(query);
        if (!resultSet.next()) {
            System.out.println("bad req!!!!!!!!!!!!!!!!!!!!!!");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        List<String> candidates = new ArrayList<>();
        do {
            final String candName = resultSet.getString("candidate");
            candidates.add(candName);
        } while (resultSet.next());
        query = "SELECT * FROM user_votes WHERE DATE_TRUNC('%s', date_voted)=DATE_TRUNC('%s', TIMESTAMP '%s');";
        query = String.format(query, eleUnit, eleUnit, strDate);
        resultSet = stmt.executeQuery(query);
        Map<String, Integer> frVotes = new HashMap<>();
        Map<String, Double> procOfVotes = new HashMap<>();
        int nrVotes = 0;
        while (resultSet.next()) {
            nrVotes++;
            final String votedUser = resultSet.getString("voted_user");
            if (!frVotes.containsKey(votedUser)) {
                frVotes.put(votedUser, 1);
            } else {
                frVotes.put(votedUser, frVotes.get(votedUser) + 1);
            }
        }//*/
        //compute proc-of-votes
        for (Map.Entry<String, Integer> pair : frVotes.entrySet()) {
            procOfVotes.put(pair.getKey(), 100.d * pair.getValue() / nrVotes);
        }
        //complete proc-of-votes
        for (final var s : candidates) {
            if (!procOfVotes.containsKey(s)) {
                procOfVotes.put(s, 0.d);
            }
        }

        resultSet = stmt.executeQuery("SELECT COUNT(*) FROM users;");
        resultSet.next();
        final int nrOfUsers = resultSet.getInt("count");
        ans.put("votes-percent(%)", 100.d * nrVotes / nrOfUsers);
        ans.put("vote-distribution(%)", procOfVotes);
        return new ResponseEntity<>(ans.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "/history", method = RequestMethod.GET)
    private ResponseEntity<String> getHistory() throws Exception {
        String query = "SELECT DATE_TRUNC('%s', election_date) FROM elections ORDER BY election_date DESC;";
        query = String.format(query, eleUnit);
        var stmt = DBConnector.getCon().createStatement();
        ResultSet resultSet = stmt.executeQuery(query);
        final var jsonArray = new JSONArray();
        Set<String> ss = new HashSet<>();
        for (int nr = 1; resultSet.next(); nr++) {
            final var jsonObject = new JSONObject();
            final String dateStr = resultSet.getString(1);
            if (ss.contains(dateStr)) {
                nr--;
                continue;
            }
            ss.add(dateStr);
            jsonObject.put("election-date", dateStr);
            jsonObject.put("election-nr", nr);
            jsonArray.put(jsonObject);
        }

        return new ResponseEntity<>(jsonArray.toString(), HttpStatus.OK);
    }
}
