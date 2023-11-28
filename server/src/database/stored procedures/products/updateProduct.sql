CREATE or alter PROCEDURE [dbo].[updateProduct]
	(@product_id varchar(100) ,
	@title varchar(100) ,	
	@description varchar(250) ,
	@image varchar(500),
    @price int,
    
    @stock int )
as

set nocount on;

begin
	UPDATE dbo.products
	SET 
	
      title = @title,
      price = @price,
      image = @image,
     
      description = @description,
      stock = @stock
	
	WHERE product_id = @product_id ;
end;