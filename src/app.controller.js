import connectDB from "./DB/connection.js";
import authRouter from "./modules/Auth/auth.controller.js";
import userRouter from "./modules/User/user.controller.js";
import globalErrorHandler from "./utils/Error handling/globalErrorHandler.js";

const bootstrap = async (app,express)=> {

    await connectDB(); 

    app.use(express.json()); //parsing body -> global middelware

    app.use("/auth", authRouter); //Auth
    app.use("/users", userRouter); //Users
    app.use("/uploads", express.static("uploads")); // serve uploads statically
    app.all("*", (req,res, next)=>{
        return next(new Error("not found handler!!!"), {cause: 404})
    });

    //global middleware
    app.use(globalErrorHandler);
};

export default bootstrap;
