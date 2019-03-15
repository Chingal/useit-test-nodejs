"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
/*=========== Clase para la Ruta del Index ===========*/
class IndexRoute {
    /* ============ Crea el router para el Home ============*/
    static Home(router) {
        router.get("/", function (req, res) {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
    }
}
exports.IndexRoute = IndexRoute;
/*=========== Fin Clase Index ===========*/ 
//# sourceMappingURL=IndexRoute.js.map