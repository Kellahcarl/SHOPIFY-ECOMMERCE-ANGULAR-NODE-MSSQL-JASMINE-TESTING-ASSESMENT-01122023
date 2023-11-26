CREATE OR ALTER  PROCEDURE [dbo].[registerUser]
	@user_id varchar(100),
	@user_name varchar(100),	
	@email varchar(250),
	@password varchar(250)
	
as

set nocount on;

begin
	INSERT INTO dbo.users
	(user_id, user_name, email, password  )
	VALUES
	(@user_id,@user_name, @email, @password );
end;