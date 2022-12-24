CREATE DATABASE bug_bounty;
USE bug_bounty;


CREATE TABLE projects (
    id int AUTO_INCREMENT,
    organization VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(255),
    reward_from int NOT NULL,
    reward_to int NOT NULL,
    image_url VARCHAR(255),
    created_at int,
    PRIMARY KEY(id)
);

CREATE TABLE users (
    id int AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type ENUM("0","1","2") Default "0" NOT NULL,
    PRIMARY KEY(id)
);

