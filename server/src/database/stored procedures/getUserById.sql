CREATE OR ALTER PROCEDURE [dbo].[getUserById]
	(@club_id varchar(250))
as

set nocount on;

begin
	select	club_id,
			email,
			user_name,
			cohort_number,
			isDeleted
			
		
	from	users  where club_id= @club_id and isDeleted = 0;
end;

exec getUserById 