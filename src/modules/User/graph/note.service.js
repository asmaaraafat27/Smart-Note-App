import noteModel from "../../../DB/models/note.model.js";
import userModel from "../../../DB/models/user.model.js";

export async function getNotes({
  userId,
  title,
  dateFrom,
  dateTo,
  page = 1,
  limit = 10,
}) {
  const filter = {};

  if (userId) filter.owner = userId;
  if (title) filter.title = { $regex: title, $options: "i" };

  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
    if (dateTo) filter.createdAt.$lte = new Date(dateTo);
  }

  const total = await noteModel.countDocuments(filter);
  const pages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  const notes = await noteModel.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("owner", "_id userName email")
    .lean();

  return {
    notes,
    total,
    page,
    pages,
  };
}

export const createNoteService = async ({ title, content, owner }) => {
  // Check if user exists
  const user = await userModel.findById(owner);
  if (!user) throw new Error("User not found");

  // Create the note
  const note = await noteModel.create({
    title,
    content,
    owner,
  });

  // Populate the owner info to match NoteType return type
  return await note.populate("owner", "_id userName email");
};

export async function deleteNoteService(noteId, userId) {
  return await noteModel.findOneAndDelete({ _id: noteId, owner: userId });
}


