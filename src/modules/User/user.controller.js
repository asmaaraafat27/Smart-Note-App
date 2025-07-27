import { Router } from "express";
import * as userService from "./user.service.js";
import {authentication} from "../../middlewares/Auth.middleware.js"
import { asyncHandler } from "../../utils/Error handling/asyncHandler.js";
import { upload } from "../../utils/fileUpload/multer.js";

const router = Router();

router.get("/profile", authentication(),
    asyncHandler(userService.getUser
)); // this route is allowable for users only

router.patch(
  "/upload-profile-pic",
  authentication(),
  upload.single("profilePic"),
  asyncHandler(userService.uploadProfilePic)
);


export default router;