import { io } from "socket.io-client";
import store from '../store/reducer/store'

import {setTracker} from '../store/reducer/VehicleReducer'
import { addLog, setNotification } from "../store/reducer/LogReducer";
import { setShipment } from "../store/reducer/ShipmentReducer";

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
        this.getLog('log')
    }

    createConnection() {
        this.socket = io(this.url, this.config)

        this.socket.on("connect", () => {
            console.log("connected to the server");
        });
     
    }

    getAllVehiclesLocations(room) {
        this.socket.emit("join-room", room)
        this.socket?.on("getAllVehicleLocation", (data) => {
            store.dispatch(setTracker(data))
        });
    }

    getVehicleLocation(room, setVehicle) {
        this.socket.emit("join-room",room);
        this.socket.on("getVehicleLocation", (data) => {
          setVehicle(data)
        });
    }

    getLog(room) {
        this.socket.emit("join-room", room)
        this.socket.on('getLog', (data) => {
            store.dispatch(setNotification(data))
        })
    } 

    getIndividualLog(room) {
        this.socket.emit("join-room", room)
        this.socket.on('getLog', (data) => {
                store.dispatch(addLog(data))
        })
    }

    leaveRoom(room) {
        this.socket.emit("leave-room", room);
    }

    getShipment(room) {
        this.socket.emit("join-room", room)
        this.socket.on('getShipment', (data) => {
            console.log(data)
            store.dispatch(setShipment(data))
        })
    }
  
    
    // stopAllVehicleLocations(room) {
    //     this.socket.emit("leave-room", room)
    //   }
    // stopVehicleLocation(room) {
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
const socket =  new Socket()
export default socket