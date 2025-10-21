🧩 Descrizione del progetto

Preset E-Commerce MEAN è un gestionale scalabile sviluppato in Node.js, Express e MongoDB, progettato come base solida per applicazioni web modulari, sicure e performanti.
Il progetto adotta TypeScript per garantire tipizzazione forte e manutenibilità nel lungo periodo, e utilizza Zod per la validazione dei dati lato server.

🎯 Obiettivi principali

Scalabilità modulare – L’architettura è suddivisa in moduli (es. utenti, prodotti, ordini), ognuno con controller, servizi e modelli indipendenti.

Manutenibilità – Struttura chiara, separazione tra logica di business, routing e accesso ai dati.

Sicurezza – Autenticazione basata su JWT e hashing delle password tramite bcrypt.

Affidabilità – Validazione rigorosa degli input con Zod, gestione centralizzata degli errori, e logging con Pino.

Configurabilità – Variabili d’ambiente gestite tramite dotenv, ideali per ambienti multipli (dev, staging, production).

🧱 Stack Tecnologico
Componente	Descrizione
Node.js + Express	Backend server leggero e flessibile per API REST.
TypeScript	Tipizzazione statica e migliore leggibilità del codice.
MongoDB + Mongoose	Database NoSQL per dati dinamici e scalabili.
Zod	Validazione schema-based dei dati in ingresso.
JWT	Sistema di autenticazione e autorizzazione sicuro.
Pino	Logging performante con supporto a rotating logs (pino-roll).
dotenv	Gestione delle variabili d’ambiente.
⚙️ Caratteristiche chiave

Routing centralizzato con Express Router.

Middleware per logging, parsing, e gestione cookie.

Gestione errori e validazione input standardizzata.

Architettura “layered”: Controller → Service → Model.

Supporto TypeScript end-to-end, con ts-node in sviluppo e tsc per build di produzione.

Pronto per essere containerizzato (Docker) o distribuito in cloud.

🚀 Finalità

Il progetto funge da preset riutilizzabile per la creazione di:

Gestionale aziendale o ERP.

Backend per e-commerce.

Dashboard amministrative con frontend Angular o React.

API RESTful modulari per microservizi futuri.
