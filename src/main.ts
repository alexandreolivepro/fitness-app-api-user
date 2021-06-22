import Server from './helpers/core/Server';

// Point d'entree de l'application
const serve = new Server();
const app = serve.main();
export = app;
