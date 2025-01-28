import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 5001;
export const mongoURI = process.env.MONGO_URI;
