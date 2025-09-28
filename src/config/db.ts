import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI!,
            { dbName: process.env.DB_NAME }
        );

        console.log("MongoDB Atlas connesso!");
    } catch (err) {
        console.error("Errore di connessione a MongoDB Atlas:", err);
        process.exit(1); // chiude l'app se non si connette
    }
};
