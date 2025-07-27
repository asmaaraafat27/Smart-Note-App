import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLBoolean
} from "graphql";
import { noteResolvers } from "../modules/User/graph/note.controller.js";

// User type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// Note type
const NoteType = new GraphQLObjectType({
  name: "Note",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    owner: { type: UserType }, // populated with user info (Object)
  }),
});

// Pagination result type
const NotesWithPaginationType = new GraphQLObjectType({
  name: "PaginatedNotes",
  fields: () => ({
    notes: { type: new GraphQLList(NoteType) },
    total: { type: GraphQLInt },
    page: { type: GraphQLInt },
    pages: { type: GraphQLInt },
  }),
});

// Filters input type for getNotes query
const FilterInputType = new GraphQLInputObjectType({
  name: "FilterInput",
  fields: () => ({
    userId: { type: GraphQLString },
    title: { type: GraphQLString },
    dateFrom: { type: GraphQLString },
    dateTo: { type: GraphQLString },
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
  }),
});

// Input type for creating a note
const CreateNoteInput = new GraphQLInputObjectType({
  name: "CreateNoteInput",
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    owner: { type: new GraphQLNonNull(GraphQLString) }, // must match your service logic
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    getNotes: {
      type: NotesWithPaginationType,
      args: {
        filters: { type: FilterInputType },
      },
      resolve: noteResolvers.Query.getNotes,
    },
  }),
});

const DeleteNoteResponseType = new GraphQLObjectType({
  name: "DeleteNoteResponse",
  fields: () => ({
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
    message: { type: GraphQLString },
  }),
});

// Root Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createNote: {
      type: NoteType,
      args: {
        input: { type: new GraphQLNonNull(CreateNoteInput) },
      },
      resolve: noteResolvers.Mutation.createNote,
    },
    deleteNote: {
      type: DeleteNoteResponseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) }, // replace with context userId if you have auth
      },
      resolve: noteResolvers.Mutation.deleteNote,
    },
  }),
});

// Export schema
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});