import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "User Name is required"],
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "User Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, "User Password is required"],
        minlength: 6,
    },
}, { timestamps: true });
export const User = mongoose.model("User", userSchema);
