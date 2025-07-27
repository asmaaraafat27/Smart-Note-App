import { Router } from "express";
import * as authService from "./auth.service.js"
import { asyncHandler } from "../../utils/Error handling/asyncHandler.js"
import { validation } from "../../middlewares/validation.middleware.js"
import * as authValidation from "../Auth/auth.validation.js"
const router = Router();

router.post("/register", 
    validation(authValidation.registerSchema), 
    asyncHandler(authService.register)
);

router.post("/login", 
    validation(authValidation.loginSchema),
    asyncHandler(authService.login)
);

router.patch("/verifyEmail", 
    validation(authValidation.confirmEmailSchema),
    asyncHandler(authService.confirmEmail)
);

router.post("/forgetPassword", 
    validation(authValidation.forgetPasswordSchema), 
    asyncHandler(authService.forgetPassword)
);

router.post("/resetPassword", 
    validation(authValidation.resetPasswordSchema), 
    asyncHandler(authService.resetPassword)
);

router.post("/logout", 
    validation(authValidation.logoutSchema),
    asyncHandler(authService.logout)
);

router.get("/refresh_token", asyncHandler(authService.refresh_token));


export default router;