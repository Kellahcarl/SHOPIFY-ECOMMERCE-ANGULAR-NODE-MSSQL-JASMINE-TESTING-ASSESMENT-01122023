CREATE  TABLE products (
	product_id varchar(100) NOT NULL PRIMARY KEY,
	title varchar(100) NOT NULL,	
	description varchar(250) NOT NULL,
	image varchar(500),
    price int not null,
	stock int not null,   
	isDeleted BIT Default 0,
)

Drop TABLE products

select * from products