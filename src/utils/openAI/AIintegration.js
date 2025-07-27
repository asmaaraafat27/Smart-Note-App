import noteModel from "../../DB/models/note.model.js";
import { Router } from "express";
import openai from "./openaiClient.js";
import { authentication } from "../../middlewares/Auth.middleware.js";

const router = Router();

router.post("/:id/summarize", authentication(), (req, res) => {
    const noteId = req.params.id;
    const userId = req.user?._id; // from authentication middleware
  
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    // Find the note that belongs to the user
    noteModel.findOne({ _id: noteId, owner: userId })
      .then((note) => {
        if (!note) {
          return res.status(404).json({ error: "Note not found or doesn't belong to you" });
        }
  
        return openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that summarizes notes.",
            },
            {
              role: "user",
              content: `Summarize this note in one short paragraph:\n\n${note.content}`,
            },
          ],
          max_tokens: 100,
          temperature: 0.7,
        }).then((response) => {
          const summary = response.choices[0].message.content.trim();
          res.status(200).json({ summary });
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
      });
  });  

export default router;
