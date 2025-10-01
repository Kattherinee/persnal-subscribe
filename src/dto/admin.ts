export interface IAdminLoginParams {
  login: string;
  password: string;
}

export interface IAdminAuthResponse {
  access_token: string;
  role: string;
}
export interface IAdmin {
  access_token: string;
  role: string;
}

export interface ITableUser {
  id: string;
  email: string;
  fullName: string;
  lastPlan: string;
  planStatus: string;
}
