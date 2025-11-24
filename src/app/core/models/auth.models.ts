export interface AuthRequest {
  username: string;
  password: string;
  deviceId?: string;
  ipAddress?: string;
}

export interface AuthResponse {
  count: number | null;
  data: TokenResponse;
  date: string;
  status: string;
  message: string[];
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserRole {
  role: string; // e.g. 'ADMIN', 'ESTUDIANTE'
}

export interface User {
  id?: string;
  username: string;
  email?: string;
  enabled?: boolean;
  roles: UserRole[];
  phone: String;
  dateOfBirth: Date;
  name: string;
  createdAt:Date; 
  documentNumber?:string;
  speciality?:string;
  academicDegree?:string;
}

export interface UserResponse {
  count: number | null;
  data: User[];
  date: string;
  status: string;
  message: string[];
}

export interface JwtPayload {
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
}