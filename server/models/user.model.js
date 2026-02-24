import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
      email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:/^\S+@\S+\.\S+$/
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    name:{
        type:String,
    },
    contactEmail:{
        type:String,
    },
    links:{
        githubLink:String,
        linkedinLink:String,
        portfolioLink:String
    },
    techStack:[
        {
            name:{type:String,required:true,lowercase:true},
            level:{type:String,enum:["beginner","intermediate","advanced"],required:true,default:"beginner"},
            yearsOfExperience:{type:Number,required:true,default:0,min:0}
        }
    ]
},{timestamps:true});


userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return;
    }
    this.password = await bcrypt.hash(this.password,10);
    
});

userSchema.methods.comparePassword = async function(password){
    console.log("password", password);
    console.log("this.password", this.password);
    return await bcrypt.compare(password,this.password);
};


export const userModel = mongoose.model("userModel",userSchema);