export interface AdminLoginParams {
  email: string;
  password: string;
}
export interface Admin {
  id: string;
  email: string;
  role: 'admin';
}

export interface tableUser {
  id: string;
  email: string;
  fullName: string;
  lastPlan: string;
  planStatus: string;
}
