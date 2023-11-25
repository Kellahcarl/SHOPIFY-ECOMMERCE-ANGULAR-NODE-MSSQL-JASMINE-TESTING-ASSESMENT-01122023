
export interface updatUser {
  club_id: string;
  user_name: string;
  email: string;
  cohort_number : string;
}
export interface user extends updatUser {
  password: string;

}

export interface extendedUser extends Request {
  user?: updatUser;
}

export interface checkDetailsUser {
  club_id: string;
  user_name: string;
  email: string;
}