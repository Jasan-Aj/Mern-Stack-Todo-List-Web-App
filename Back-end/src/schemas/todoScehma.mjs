import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String,
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: false
    }
});

export const Todo = mongoose.model("Todo",todoSchema);