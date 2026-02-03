import type { Document, Types } from "mongoose";

export interface ISubscription extends Document {
  name: string;
  price: number;
  currency: "USD" | "EUR" | "GBP" | "TRY";
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  category:
  | "sports"
  | "entertainment"
  | "education"
  | "productivity"
  | "health"
  | "lifestyle"
  | "news"
  | "technology"
  | "finance"
  | "politics"
  | "other";
  paymentMethod: string;
  status: "active" | "inactive" | "expired" | "canceled" | "paused";
  startDate: Date;
  renewalDate: Date;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


export type CreateSubscriptionBody = Omit<
  ISubscription,
  keyof Document | "_id" | "user"
> & {
  startDate: string;
  renewalDate: string;
};

export type CreateSubscriptionResponse = {
  success: true;
  message: string;
  data: {
    _id: string;
    name: string;
    price: number;
    currency: "USD" | "EUR" | "GBP" | "TRY";
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    category: string;
    user: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type PublicSubscription = {
  _id: string;

  name: string;
  price: number;
  currency: "USD" | "EUR" | "GBP" | "TRY";
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  category:
  | "sports"
  | "entertainment"
  | "education"
  | "productivity"
  | "health"
  | "lifestyle"
  | "news"
  | "technology"
  | "finance"
  | "politics"
  | "other";

  paymentMethod: string;
  status: "active" | "inactive" | "expired" | "canceled" | "paused";

  startDate: string;
  renewalDate?: string;

  user: string;

  createdAt: string;
  updatedAt: string;
};


export type GetUserSubscriptionsParams = { id: string };

export type GetUserSubscriptionsResponse = {
  success: true;
  message: string;
  data: PublicSubscription[];
};

