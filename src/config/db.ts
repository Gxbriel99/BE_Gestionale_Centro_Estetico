import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://gabriel:G7s9KqX_@gestionale.qyhqyv8.mongodb.net/?retryWrites=true&w=majority&appName=Gestionale",
            { dbName: "Gestionale" }
        );

        //{ dbName: "Gestionale" } specifica il nome del database da utilizzare

        console.log("MongoDB Atlas connesso!");
    } catch (err) {
        console.error("Errore di connessione a MongoDB Atlas:", err);
        process.exit(1); // chiude l'app se non si connette
    }
};
