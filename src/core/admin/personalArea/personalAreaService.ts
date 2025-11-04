import { SendEmailCommand, VerifyEmailIdentityCommand, VerifyEmailIdentityCommandInput } from "@aws-sdk/client-ses";
import sesClient from "../../../config/aws-ses";
import logger from "../../logs/logs";
import { staffModel } from "../../schema/staffSchema";
import { hashPassword } from "../homepage/homepageService";
import { BadRequestException, NotFoundException, UnprocessableEntity } from "../../errors/errorException";
import { emailSchema } from "../../schema/loginSchema";


export async function findUser(email: string) {
    const userEmail = emailSchema.parse(email);
    const user = await staffModel.findOne({ email: userEmail });
    return user;
}

/**
 * Funzione per aggiornare l'email dell'utente passato
 * @param id id dell'utente
 * @param email emial dell'utente
 */
export async function changeEmail(id: string, email: string) {
    logger.info(`Email di: ${id} aggiornata`);
    await staffModel.findByIdAndUpdate(id, { $set: { email: email } });
}








