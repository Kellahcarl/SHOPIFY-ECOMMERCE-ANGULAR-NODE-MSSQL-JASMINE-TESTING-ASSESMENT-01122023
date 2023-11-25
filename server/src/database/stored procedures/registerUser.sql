CREATE OR ALTER  PROCEDURE [dbo].[registerUser]
	@club_id varchar(100),
	@user_name varchar(100),	
	@email varchar(250),
	@cohort_number int , 
	@password varchar(250)
	
as

set nocount on;

begin
	INSERT INTO dbo.users
	(club_id, user_name, email, password, cohort_number )
	VALUES
	(@club_id,@user_name, @email, @password,@cohort_number  );
end;