DROP TABLE IF EXISTS Partners;
CREATE TABLE Partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(500) NOT NULL DEFAULT '',
    description VARCHAR(5000) NOT NULL DEFAULT '',
    active BOOLEAN NOT NULL DEFAULT FALSE
);
