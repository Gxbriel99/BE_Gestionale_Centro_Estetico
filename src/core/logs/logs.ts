import pino from 'pino';

// Logger combinato
const logger = pino(
    {
        level: 'info',
        timestamp: pino.stdTimeFunctions.isoTime
    },
    pino.transport({
        targets: [
            {
                target: 'pino-roll',           // scrittura su file 
                options: {
                    file: './logs/app.log',
                    frequency: 'daily',
                    size: '10M',
                    mkdir: true
                }
            },
            ...(process.env.NODE_ENV !== 'production' ? [{
                target: 'pino-pretty',        // log leggibili in console in sviluppo
                options: { colorize: true }
            }] : [])
        ]
    })
);

export default logger;
