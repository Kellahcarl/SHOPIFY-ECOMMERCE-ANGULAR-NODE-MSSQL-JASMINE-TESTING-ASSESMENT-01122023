CREATE OR ALTER  PROCEDURE [dbo].[getUsers]
as

set nocount on;

begin
	select	u.[club_id],
			u.user_name,
			u.email,
			u.cohort_number 

	from	[users] u where isDeleted = 0 
end;