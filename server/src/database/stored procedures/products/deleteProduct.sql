CREATE OR ALTER  PROCEDURE [dbo].[deleteProduct]
	@product_id varchar(100)
as

set nocount on;

begin
	UPDATE dbo.products
	SET isDeleted = 1
	
	WHERE product_id = @product_id;
end;