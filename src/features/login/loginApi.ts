import axios from "axios";

const API_ENDPOINT = 'https://reqres.in/api'

const client = axios.create({
  baseURL: API_ENDPOINT
})

export interface LoginUserData {
  email: string
  password: string
}

export interface LoginUserResponse {
  token: string
}

export interface LoginUserError {
  error: string
}

export const login = (data: LoginUserData) => client.post<LoginUserResponse>('/login', data)

