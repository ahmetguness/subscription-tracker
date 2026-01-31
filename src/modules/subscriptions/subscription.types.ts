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
}
