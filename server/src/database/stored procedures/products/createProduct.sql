

CREATE OR ALTER PROCEDURE [dbo].[createProduct]
(@product_id varchar(100) ,
	@title varchar(100) ,	
	@description varchar(250) ,
	@image varchar(500),
    @price int,
    
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
     
      stock
      )
    VALUES
    (@product_id  ,
	@title  ,	
	@price ,
	@image ,
    @description,
    
    @stock)
END