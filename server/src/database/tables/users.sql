CREATE DATABASE SHOPIFY

CREATE  TABLE users (
	user_id varchar(100) NOT NULL PRIMARY KEY,
	user_name varchar(100) NOT NULL,	
	email varchar(250) NOT NULL,	
	isDeleted BIT Default 0,
	isAdmin Bit Default 0,
	resetPassword Bit default 0,
	justRegistered bit default 1,
	password varchar(250) NOT NULL,
)

DROP TABLE users



select * from users
