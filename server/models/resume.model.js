import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    resumeLink:{
        type:String,
    },
    resumeContent:{
        type:String,
    }, 
},{timestamps:true});

export const resumeModel = mongoose.model("resumeModel",resumeSchema);