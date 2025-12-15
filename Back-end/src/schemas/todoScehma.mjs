import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String,
    },
    Status: {
        type: mongoose.Schema.Types.Boolean
    }
});

export const Todo = mongoose.model("Todo",todoSchema);