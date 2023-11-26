
export interface updatUser {
  user_id: string;
  user_name: string;
  email: string;
 
}
export interface user extends updatUser {
  password: string;

}



export interface checkDetailsUser {
  user_id: string;
  user_name: string;
  email: string;
}