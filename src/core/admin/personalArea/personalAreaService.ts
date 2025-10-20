import logger from "../../logs/logs";
import { staffModel } from "../../schema/staffSchema";
import { hashPassword } from "../homepage/homepageService";

/**
 * Funzione per aggiornare l'email dell'utente passato
 * @param id id dell'utente
 * @param email emial dell'utente
 */
export async function changeEmail(id: string, email: string) {
    logger.info(`Email di: ${id} aggiornata`);
    await staffModel.findByIdAndUpdate(id, { $set: { email: email } });
}

/**
 * Funzione per aggiornare l'email dell'utente passato
 * @param id id dell'utente
 * @param password nuova password dell'utente
 */
export async function changePsw(id: string, password: string) {
    const pswHashata = await hashPassword(password)
    logger.info(`psw di: ${id} aggiornata`);
    await staffModel.findByIdAndUpdate(id, { $set: { password: pswHashata } });
}