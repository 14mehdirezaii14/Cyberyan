// src/services/userService.ts

import type { IUser, IUserQuery } from "@workspace/shared";

export interface UserResponse {
  data: IUserQuery[];
  total: number;
  page: number;
  limit: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetchUsers = async (query: IUserQuery): Promise<{data:IUser[]}> => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const response = await fetch(`${API_URL}/users?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('خطا در برقراری ارتباط با سرور');
  }

  return response.json();
};