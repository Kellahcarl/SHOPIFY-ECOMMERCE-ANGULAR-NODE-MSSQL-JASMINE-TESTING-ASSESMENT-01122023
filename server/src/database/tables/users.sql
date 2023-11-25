CREATE DATABASE JITU_CLUB

CREATE  TABLE users (
	club_id varchar(100) NOT NULL PRIMARY KEY,
	user_name varchar(100) NOT NULL,	
	email varchar(250) NOT NULL,	
	isDeleted BIT Default 0,
	cohort_number int,
	password varchar(250) NOT NULL,
)

DROP TABLE users

alter table users
add  justRegistered bit default 1


select * from users
