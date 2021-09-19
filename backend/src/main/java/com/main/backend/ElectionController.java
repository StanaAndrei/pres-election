package com.main.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.transform.Result;
import java.sql.ResultSet;
import java.util.ArrayList;

@RestController
public class ElectionController {

    //return candidates at curr election
    @RequestMapping(value = "/candidates", method = RequestMethod.GET)
    private ArrayList<String> getCandidates() throws Exception {
        var ans = new ArrayList<String>();
        String eleUnit = TimeManager.getElectionUnit();
        String query = "SELECT * FROM elections WHERE " +
                "(EXTRACT(%s FROM election_date))=(EXTRACT(%s FROM NOW()))";
        query = String.format(query, eleUnit, eleUnit);
        var stmt = DBConnector.getCon().createStatement();
        ResultSet resultSet = stmt.executeQuery(query);
        while (resultSet.next()) {
            ans.add(resultSet.getString("candidate"));
        }
        return ans;
    }

    @RequestMapping(value = "/is-candidate/{name}", method = RequestMethod.GET)
    public static Boolean isCandidante(@PathVariable String name) throws Exception {
        String eleUnit = TimeManager.getElectionUnit();
        String query = "SELECT COUNT(*)=1 FROM elections WHERE " +
                "candidate='%s' AND " +
                "(EXTRACT(%s FROM election_date))=(EXTRACT(%s FROM NOW()))";
        query = String.format(query, name, eleUnit, eleUnit);
        var stmt = DBConnector.getCon().createStatement();
        ResultSet resultSet = stmt.executeQuery(query);
        if (resultSet.next() && resultSet.getBoolean(1)) {
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/set-candidate/{name}", method = RequestMethod.PUT)
    private ResponseEntity<Void> setCandidate(@PathVariable String name) throws Exception {
        var stmt = DBConnector.getCon().createStatement();
        {
            String query = "SELECT COUNT(*)=1 FROM elections WHERE " +
                    "candidate='%s' AND " +
                    "DATE_TRUNC('%s', election_date)=DATE_TRUNC('%s', NOW());";
            query = String.format(query, name, TimeManager.getElectionUnit(), TimeManager.getElectionUnit());
            ResultSet resultSet = stmt.executeQuery(query);
            if (resultSet.next() && resultSet.getBoolean(1)) {
                System.out.println("BAD REQ!!!!!");
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }//*/
        String query = "INSERT INTO elections(candidate) VALUES('%s');";
        query = String.format(query, name);
        stmt.execute(query);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
