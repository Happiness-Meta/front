export interface LoginFormDto {
  email: string;
  password: string;
}

export interface UserLoginResponseDto {
  email: string;
  nickname: string;
  token: string;
}

export interface UserRegisterDto {
  email: string;
  nickname: string;
  password: string;
}

export interface UserUpdateDto {
  nickname: string;
  password: string;
}

export interface UserResponseDto {
  id: number;
  nickname: string;
  email: string;
  createdAt: string;
  modifiedAt: string;
}
