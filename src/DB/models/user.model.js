import mongoose, {Schema} from "mongoose";
import { roleTypes } from "../../middlewares/Auth.middleware.js";
import { hash } from "../../utils/Hashing/hash.js"

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Username is required" ],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required" ],
        unique: [true, "Email must be unique"],
        lowecase: true,
        trim: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
        type: String,
        required: [true, "Password is required" ],

    },
    gender: {
        type: String,
        enum:{
            values:["male", "female"],
            message: "Gender must be either 'male' or 'female'",
        }
    },
    confirmEmail:{
        type: Boolean,
        default: false,
    },
    role: {  //useful for Authorization
        type: String,
        enum: Object.values(roleTypes), // object in auth Middleware
        default: roleTypes.User,
    },
    isDeleted:{
        type:Boolean,
        default: false
    }, 
    otp: {
        code: { type: String },
        expiresAt: { type: Date },
        used: { type: Boolean, default: false }
    },
    profilePic: { type: String },
    changedCredentialsTime: Date,
    confirmEmailOTP: String,
    },{timestamps: true}
);
// Hooks
userSchema.pre("save", function (next){

    if(this.isModified("password"))
    {
        this.password = hash({plainText: this.password});
    }
    return next();
});

const userModel = mongoose.model("User", userSchema);
export default userModel;