export interface users {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface login {
  email: string;
  password: string;
}
export interface profile {
  username: string;
  imgurl: string;
  bio: string;
}

export interface query {
  num?: string;
  curser?: string;
  sort?: string;
}
