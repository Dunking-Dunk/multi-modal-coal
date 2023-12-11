import { io } from "socket.io-client";
import store from '../store/reducer/store'

import {setTracker} from '../store/reducer/VehicleReducer'

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

    getAllVehiclesLocations(room) {
        this.socket.emit("join-room", room)
        this.socket?.on("getAllVehicleLocation", (data) => {
            store.dispatch(setTracker(data))
        });
    }

          stopAllVehicleLocations(room) {
        this.socket.emit("leave-room", room)
      }

    getVehicleLocation(room, setVehicle) {
        this.socket.emit("join-room",room);
        this.socket.on("getVehicleLocation", (data) => {
          setVehicle(data)
        });
    }
    
          stopVehicleLocation(room) {
        this.socket.emit("leave-room", room);
      }


  

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