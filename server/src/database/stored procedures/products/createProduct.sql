

CREATE OR ALTER PROCEDURE [dbo].[createProduct]
(@product_id varchar(100) ,
	@title varchar(100) ,	
	@description varchar(250) ,
	@image varchar(500),
    @price int,
    @category varchar(100),
    @stock int   )
AS

BEGIN
    set nocount on;

    INSERT INTO products
    (product_id,
      title,
      price,
      image,      
      description,
      category,
      stock
      )
    VALUES
    (@product_id  ,
	@title  ,	
	@price ,
	@image ,
    @description,
    @category ,
    @stock)
END