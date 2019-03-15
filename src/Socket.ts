declare let require: any;

let tablero_io: any;

/*======================================== SOCKET =======================================*/
export class Socket {

    /*============= Constructor Por Defecto Del Socket =============*/
    constructor(io: any){
        tablero_io = io.of('/');

        tablero_io.on('connect', (socket: any) => {
            console.log("    ======> ID Socket: " + socket.id);
            this.Message(socket);
            socket.on('disconnect', () => {
                console.log('    ======> Socket Desconectado');
            });
        });
    }

    /* ============== METODOS PARA EL SOCKET DEL TABLERO ===============*/
    private Message = (socket)  =>  {
        socket.on('boards', function(data: any, callback){
            try{
                let obj: any;
                obj = JSON.parse(data.toString());
                socket.broadcast.emit('ideas', obj);
            }catch (err){
                console.log('Error Al autenticar al pasajero en el Socket', '', err);
            }
        });
    }

}
