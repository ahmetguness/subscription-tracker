import mongoose, { Schema } from "mongoose";
const subscriptionSchema = new Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Subscription must be greater than or equal to 0"],
        max: [1000, "Subscription must be less than or equal to 1000"],
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "TRY"],
        default: "TRY",
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
        required: true,
    },
    category: {
        type: String,
        enum: [
            "sports",
            "entertainment",
            "education",
            "productivity",
            "health",
            "lifestyle",
            "news",
            "technology",
            "finance",
            "politics",
            "other",
        ],
        required: [true, "Subscription category is required"],
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "expired", "canceled", "paused"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: [true, "Subscription start date is required"],
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start date cannot be in the future",
        },
    },
    renewalDate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Subscription user is required"],
        index: true,
    },
}, { timestamps: true });
subscriptionSchema.pre("validate", function () {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        const daysToAdd = renewalPeriods[this.frequency];
        const start = new Date(this.startDate);
        const renewal = new Date(start);
        renewal.setDate(start.getDate() + daysToAdd);
        this.renewalDate = renewal;
    }
    if (this.renewalDate < this.startDate) {
        this.invalidate("renewalDate", "Renewal date cannot be before start date");
    }
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }
});
export const Subscription = mongoose.model("Subscription", subscriptionSchema);
