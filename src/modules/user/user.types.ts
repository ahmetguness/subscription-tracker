import type { Document } from "mongoose";
import { PublicUser } from "../auth/auth.types.js";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export type GetUsersResponse = {
  success: true;
  data: {
    users: PublicUser[];
  };
};

export type GetUserParams = { id: string };

export type GetUserResponse = {
  success: true;
  data: { user: PublicUser };
};