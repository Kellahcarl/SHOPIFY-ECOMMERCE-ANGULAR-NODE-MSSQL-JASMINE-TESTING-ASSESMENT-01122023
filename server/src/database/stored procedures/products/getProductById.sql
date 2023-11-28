CREATE or alter PROCEDURE [dbo].[getProductById]
	@product_id VARCHAR(100)
as

set nocount on;

begin
	select *  from products  
	
    where product_id = @product_id and isDeleted = 0
   
end;