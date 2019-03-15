import * as express from "express";
import * as bodyParser from "body-parser";
import * as socketIo from "socket.io";
import * as cookieParser from "cookie-parser";

declare let require,process, __dirname: any;

let http = require("http");
import {HOST, PORT} from '../utils/Constants'

import {Socket} from './Socket';

/* ====================== Clase donde se configura el servidor ====================== */
export class Server {
    public static readonly PORT:number = PORT;
    public app: any;
    private server: any;
    private io: any;
    private port: string | number;

    /* Constructor Por Defecto */
    constructor() {
        this.CrearApp();                    // Crea una aplicacion express
        this.Configuracion();               // Configuracion de la aplicacion
        this.CrearServidorHttp();
        this.Sockets();
        this.Listen();
    }

    // Crea una aplicacion express
    private CrearApp(): void {
        this.app = express();
    }

    /* Se crean las configuraciones respectivas del servidor */
    public Configuracion() {
        this.port = process.env.PORT || Server.PORT;

        // JSON Parser
        this.app.use(bodyParser.json());

        // Parser de las consultas tipo String
        this.app.use(bodyParser.urlencoded({ extended: true  }));

        // Cookie parser middleware
        this.app.use(cookieParser());

        // Definicion del Access Control
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
    }

    /* Metodo para crear el servidor Http */
    private CrearServidorHttp(): void {
        this.server = http.createServer(this.app);
    }

    /* Metodo para crear los sockets del pasajero y el conductor */
    public Sockets(): void {
        this.io = socketIo(this.server);
        let sockets = new Socket(this.io);
    }

    /* Devuelve una instancia de la aplicacion */
    public static Instance(): Server {
        return new Server();
    }

    /* Metodo donde escucha el servidor en el puerto definido */
    private Listen(): void {

        this.server.listen(this.port, () => {
            console.log(`   ---> Servidor corriendo en ${HOST}${this.port}`);
        });
    }
}