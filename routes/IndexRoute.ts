import { NextFunction, Request, Response, Router } from "express";
import * as path from "path";
declare let __dirname: any;

/*=========== Clase para la Ruta del Index ===========*/
export class IndexRoute {

    /* ============ Crea el router para el Home ============*/
    public static Home(router: Router) {
        router.get("/", function(req, res) {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
    }
}
/*=========== Fin Clase Index ===========*/