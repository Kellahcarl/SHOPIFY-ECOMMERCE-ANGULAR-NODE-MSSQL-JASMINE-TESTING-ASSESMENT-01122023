CREATE OR ALTER PROCEDURE [dbo].[getUserByEmail]
	(@email varchar(250))
as

set nocount on;

begin
	select	club_id,
			email,
			user_name,
			cohort_number,			
			password
	FROM	users  WHERE email = @email AND isDeleted = 0;
end;

EXEC getUserByEmail @email = 'caleb@thejitu.com';