import userModel from "../../DB/models/user.model.js";

export const uploadProfilePic = async (req, res, next) => {
        if (!req.file) {
          return next(new Error("No file uploaded."), { cause: 400 });
        }
      
        const imagePath = `uploads/${req.file.filename}`;
      
        const result = await userModel.updateOne(
          { _id: req.user._id },
          { $set: { profilePic: imagePath } }
        );
      
        if (result.modifiedCount === 0) {
          return next(new Error("Failed to update profile picture."), { cause: 400 });
        }
      
        return res.status(200).json({
          success: true,
          message: "Profile picture updated successfully.",
          data: { imagePath },
        });
};
      