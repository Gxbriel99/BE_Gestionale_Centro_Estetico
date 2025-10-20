import { Express } from 'express';
import http from 'http';
import { connectDB } from '../config/db';
import logger from '../core/logs/logs';


let server: http.Server;
let isShuttingDown = false;

export async function startServer(app: Express) {
    try {
        logger.info('Avvio server in corso...');

        const PORT = process.env.PORT || 3000;
        server = http.createServer(app);
        //server.setTimeout(60000);
        //server.keepAliveTimeout = 5000;  // Keep-alive timeout (5s invece di default 5min)
        // server.headersTimeout = 6000;    // Timeout ricezione headers (6s)

        server.listen(PORT, async () => {
            await connectDB();
            logger.info(`OK! Server HTTP attivo sulla porta ${PORT}`);
        });

    } catch (error: unknown) {
        // Log completo con stack trace
        logger.error({ error }, 'KO! Errore durante il lancio del server');
        logger.warn('Server non avviato');
        process.exit(1);
    }

}

async function gracefulShutdown() {
    console.log('Avvio chiusura server...');
    if (isShuttingDown) {
        console.log('Chiusura server giÃ in corso...');
        return;
    }
    isShuttingDown = true;
    console.log('Server chiuso');
    process.exit(0);
}

// Gestione segnali di sistema
process.on('SIGINT', () => {
    console.log('Ricevuto SIGINT');
    gracefulShutdown();
});

process.on('SIGTERM', () => {
    console.log('Ricevuto SIGTERM');
    gracefulShutdown();
});