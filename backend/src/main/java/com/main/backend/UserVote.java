package com.main.backend;

public class UserVote {
    private String votedUser, userWhoVoted;
    private String dateVoted;
    public UserVote() {}

    public UserVote(String votedUser, String userWhoVoted) {
        this.votedUser = votedUser;
        this.userWhoVoted = userWhoVoted;
    }

    public String getDateVoted() {
        return dateVoted;
    }

    public String getUserWhoVoted() {
        return userWhoVoted;
    }

    public String getVotedUser() {
        return votedUser;
    }
}
