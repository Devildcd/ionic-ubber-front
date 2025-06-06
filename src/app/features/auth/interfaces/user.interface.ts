export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  access_code: string;
  is_active: boolean;
  profileImage?: string;
}


export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmed: string;
  role: 'USER' | 'ADMIN' | 'DEVELOPER';
}
