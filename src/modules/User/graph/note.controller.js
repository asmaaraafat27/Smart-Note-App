import * as notesService from "./note.service.js";

export const noteResolvers = {
  Query: {
    getNotes: async (_, { filters }) => {
      return notesService.getNotes(filters || {});
    },
  },
  Mutation: {
    createNote: async (_, { input }) => {
      return notesService.createNoteService(input);
    },
    deleteNote: async (_, { id, userId }) => {
      const deleted = await notesService.deleteNoteService(id, userId);
      if (!deleted) {
        throw new Error("Note not found or unauthorized");
      }
      return {
        success: true,
        message: "Note deleted successfully",
      };
    },
  },
};


