CREATE OR ALTER  PROCEDURE [dbo].[deleteUser]
	@club_id varchar(100)
as

set nocount on;

begin
	UPDATE dbo.users
	SET 
	isDeleted=1
	WHERE club_id = @club_id;
end;