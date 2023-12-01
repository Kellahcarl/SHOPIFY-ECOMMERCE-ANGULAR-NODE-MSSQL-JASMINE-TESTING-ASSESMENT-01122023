export interface UpdateUser {
  user_id: string;
  user_name: string;
  email: string;
}
export interface User {
  password: string;
  user_name: string;
  email: string;
}

export interface ResetUser {
  user_id: string;
  password: string;
}

export interface ForgotUser{
  email: string;
}

export interface checkDetailsUser {
  user_id: string;
  user_name: string;
  email: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface userImage {
  imageUrl: string;
  user_id : string;
}
