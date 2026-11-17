import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
    type: String,
    required: true
    },
    completed: {
        type: Boolean,
        default:false
    }
})


const result = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default result;
