import { io } from "socket.io-client";

class Socket {
    constructor() {
        this.url = "http://localhost:4000";
        this.config = {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 3,
            transports: ["websocket"],
        };
        this.createConnection()
    }

    createConnection() {
        this.socket = io(this.url, this.config)

        this.socket.on("connect", () => {
            console.log("connected to the server");
        });
    }

    //   getAllBusLocations() {
    //     this.socket.emit("join-room", "allBus")
    //     this.socket?.on("getAllBusLocation", (data) => {
    //       store.dispatch(changeCoords(data))
    //     });
    //   }

    //   stopAllBusLocations() {
    //     console.log('left')
    //     this.socket.emit("leave-room", "allBus")
    //   }

    //   getBusLocation(room) {

    //     this.socket.emit("join-room", room);
    //     this.socket.on("getBusLocation", (data) => {
    //       console.log(data)
    //       store.dispatch(changeCoords(data))
    //     });
    //   }

    //   stopBusLocation(room) {
    //     console.log('left')
    //     this.socket.emit("leave-room", room);
    //   }

    //   getUpdatedStop() {
    //     this.socket.on("updateStop", (data) => {
    //       store.dispatch(updateStop(data))
    //     })
    //   }

    //   getUpdatedDriver() {
    //     this.socket.on("updateDriver", (data) => {
    //       store.dispatch(updateDriver(data))
    //     })
    //   }

    disconnectConnection() {
        this.socket.disconnect()
        console.log('disconnected')
    }


    errorConnection() {
        this.socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err}`);
        });
    }
}

export default new Socket()