export interface Book {
  id: number;
  title: string;
  author: string;
  isbn?: string;
  genre?: string;
  available: boolean;
  quantity?: number;
  publishedYear?: number;
  description?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  username: string;
}
