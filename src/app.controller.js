import connectDB from "./DB/connection.js";
import authRouter from "./modules/Auth/auth.controller.js";
import userRouter from "./modules/User/user.controller.js";
import noteRouter from "./utils/openAI/AIintegration.js";
import globalErrorHandler from "./utils/Error handling/globalErrorHandler.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./modules/app.graphQL.js";

const bootstrap = async (app,express)=> {

    await connectDB(); 

    app.use(express.json()); //parsing body -> global middelware

    app.use("/auth", authRouter); //Auth
    app.use("/users", userRouter); //Users
    app.use("/note", noteRouter) //Notes
    //graphQL
    app.use("/graphql", createHandler({schema: schema, graphiql: true}));

    app.use("/uploads", express.static("uploads")); // serve uploads statically
    app.all("*", (req,res, next)=>{
        return next(new Error("not found handler!!!"), {cause: 404})
    });

    // Helmet - Secure HTTP headers
    app.use(helmet());

    // CORS - Allow access from specific domains (optional config)
    app.use(cors({
    origin: ["http://localhost:3000", "https://your-frontend-domain.com"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    }));

    // Rate Limiting - Protect from brute-force
    const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per IP
    message: {
        success: false,
        message: "Too many requests from this IP, please try again later.",},
    });
    app.use(limiter);

    //global middleware
    app.use(globalErrorHandler);
};

export default bootstrap;
