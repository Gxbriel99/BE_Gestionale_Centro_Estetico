import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../core/logs/logs";



dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI!,
            { dbName: process.env.DB_NAME }
        );
        // Log informativo
        logger.info("MongoDB Atlas connesso!");
    } catch (err) {
        // Log di errore 
        logger.error({ err }, "Errore di connessione a MongoDB Atlas");
        process.exit(1); // chiude l'app se non si connette
    }
};
