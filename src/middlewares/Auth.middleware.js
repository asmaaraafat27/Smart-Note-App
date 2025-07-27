import userModel from "../DB/models/user.model.js";
import { verify } from "../utils/tokens/token.js";
import { asyncHandler } from "../utils/Error handling/asyncHandler.js"
import * as DBService from "../DB/DBService.js"

export const roleTypes ={
    User : "User",
    Admin : "Admin",
}
export const tokenTypes = {
    access: "access",
    refresh: "refresh",
}

export const decoded_token = async ({authorization ="", tokenType = tokenTypes.access, next ={}}) =>{
    if (!authorization) {
        return next(new Error("Missing Authorization Header", { cause: 401 }));
    }
    const [bearer, token] = authorization.split(" ") || [];
    if(!bearer || !token)
    {
        return next(new Error("Invalid Token", {cause: 401}));
    }

    let ACCESS_SIGNATURE = undefined;
    let REFRESH_SIGNATURE = undefined;

    switch(bearer){
            case "User": 
            ACCESS_SIGNATURE =process.env.USER_ACCESS_TOKEN;
            REFRESH_SIGNATURE =process.env.USER_REFRESH_TOKEN;
            break;
            default:
            return next(new Error("Invalid token bearer", { cause: 401 }));
        }

    const decoded = await verify({token, signature: tokenType ===  tokenTypes.access ? ACCESS_SIGNATURE : REFRESH_SIGNATURE});
    const user = await DBService.findOne({model: userModel, filter: {_id: decoded.id, isDeleted: false}});
    if(!user){
        return next(new Error ("User not found", {cause:404}));
    }

    if(user.changeCredentialTime?.getTime() >= decoded.iat *1000){
        return next(new Error ("Invalid token", {cause:400}));
    }
    return user;
};

export const authentication = () =>{
    return asyncHandler(async (req, res, next) => {
        const { authorization } = req.headers;
        req.user = await decoded_token({authorization, next});
        return next();
    });
}

export const allowto = (roles=[])=>{
    return async(req, res, next)=>{ // middleware
        try{
            if(!roles.includes(req.user.role))
            {
                return res.status(403).json({success: false, message: "Forbidden Account!!!"});
            }
            return next();
        }
        catch(error){
            return res.status(500).json({success: false, stack: error.stack});
        }
    };
}

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next(new Error("No token provided"), { cause: 401 });
  
    const token = authHeader.split(" ")[1];
    if (revokedTokens.has(token)) return next(new Error("Token is revoked"), { cause: 401 });
  
    try {
      const decoded = verify({token: token, signature: process.env.TOKEN_SECRET_USER});
      req.user = decoded;
      next();
    } catch {
      return next(new Error("Invalid token"), { cause: 401 });
    }
  };
  