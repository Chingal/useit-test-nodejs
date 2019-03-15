"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let tablero_io;
/*======================================== SOCKET =======================================*/
class Socket {
    /*============= Constructor Por Defecto Del Socket =============*/
    constructor(io) {
        /* ============== METODOS PARA EL SOCKET DEL TABLERO ===============*/
        this.Message = (socket) => {
            socket.on('boards', function (data, callback) {
                try {
                    let obj;
                    obj = JSON.parse(data.toString());
                    socket.broadcast.emit('ideas', obj);
                }
                catch (err) {
                    console.log('Error Al autenticar al pasajero en el Socket', '', err);
                }
            });
        };
        tablero_io = io.of('/');
        tablero_io.on('connect', (socket) => {
            console.log("    ======> ID Socket: " + socket.id);
            this.Message(socket);
            socket.on('disconnect', () => {
                console.log('    ======> Socket Desconectado');
            });
        });
    }
}
exports.Socket = Socket;
//# sourceMappingURL=Socket.js.map