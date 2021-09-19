CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS elections (
    candidate TEXT NOT NULL,
    election_date TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (candidate) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS user_votes (
      voted_user TEXT NOT NULL,
      user_who_voted TEXT NOT NULL,
      date_voted TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (voted_user) REFERENCES users(username),
      FOREIGN KEY (user_who_voted) REFERENCES users(username)
);
