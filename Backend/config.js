import dotenv from 'dotenv';

dotenv.config();

export const PORT = "5555";

const MONGODB_PASS = process.env.MONGODB_URI_PASS

export const monogodbUrl =
 `mongodb+srv://devendra:${MONGODB_PASS}@book-store-mern.thsdvfy.mongodb.net/books-collection?retryWrites=true&w=majority`