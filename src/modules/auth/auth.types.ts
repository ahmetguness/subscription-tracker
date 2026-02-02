export type PublicUser = {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
};

export type SignUpBody = { name: string; email: string; password: string };

export type AuthResponse = {
  success: true;
  message: string;
  data: { token: string; user: PublicUser };
};

export type SignUpResponse = AuthResponse;

export type SignInBody = { email: string; password: string };

export type SignInResponse = AuthResponse;
