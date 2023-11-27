export interface UpdateUser {
  user_id: string;
  fullName: string;
  email: string;
}
export interface User {
  password: string;
  fullName: string;
  email: string;
}

export interface ForgotUser {
  user_id: string;
  password: string;
}

export interface checkDetailsUser {
  user_id: string;
  fullname: string;
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
