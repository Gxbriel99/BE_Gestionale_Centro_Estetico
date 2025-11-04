import { SESClient } from '@aws-sdk/client-ses';
import dotenv from 'dotenv';

dotenv.config();

const sesConfig = {
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
};
// Configurazione SES client
const sesClient = new SESClient(sesConfig);
export default sesClient;
