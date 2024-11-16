import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        salary:{
            type:Number,
            default:0
        },
        language:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        isManager:{
            type:Boolean,
            default:false
        }
    }
);

export const Employee = mongoose.model("Employee",employeeSchema);