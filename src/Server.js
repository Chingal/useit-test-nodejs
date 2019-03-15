"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const cookieParser = require("cookie-parser");
let http = require("http");
const Constants_1 = require("../utils/Constants");
const Socket_1 = require("./Socket");
const IndexRoute_1 = require("../routes/IndexRoute");
/* ====================== Clase donde se configura el servidor ====================== */
class Server {
    /* Constructor Por Defecto */
    constructor() {
        this.CrearApp(); // Crea una aplicacion express
        this.Configuracion(); // Configuracion de la aplicacion
        this.CrearServidorHttp();
        this.Sockets();
        this.Listen();
    }
    // Crea una aplicacion express
    CrearApp() {
        this.app = express();
    }
    /* Se crean las configuraciones respectivas del servidor */
    Configuracion() {
        this.port = process.env.PORT || Server.PORT;
        this.app.use(express.static(path.join(__dirname, "/../build"))); // Agregar la ruta de los static
        // JSON Parser
        this.app.use(bodyParser.json());
        // Parser de las consultas tipo String
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // Cookie parser middleware
        this.app.use(cookieParser());
        // Definicion del Access Control
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
    }
    /* Metodo para crear el servidor Http */
    CrearServidorHttp() {
        this.server = http.createServer(this.app);
    }
    /* Metodo para crear los sockets del pasajero y el conductor */
    Sockets() {
        this.io = socketIo(this.server);
        let sockets = new Socket_1.Socket(this.io);
    }
    /* Devuelve una instancia de la aplicacion */
    static Instance() {
        return new Server();
    }
    /* Se crean las rutas para las paginas en html */
    Routes() {
        let router;
        router = express.Router();
        IndexRoute_1.IndexRoute.Home(router);
        this.app.use(router); // Usa el middleware del Router de express
    }
    /* Metodo donde escucha el servidor en el puerto definido */
    Listen() {
        this.server.listen(this.port, () => {
            console.log(`   ---> Servidor corriendo en ${Constants_1.HOST}${this.port}`);
        });
    }
}
Server.PORT = Constants_1.PORT;
exports.Server = Server;
//# sourceMappingURL=Server.js.map