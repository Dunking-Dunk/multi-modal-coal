import { io } from "socket.io-client";
import {
  addAnnouncement,
} from "../store/action";

class Socket {
  constructor() {
    this.url = "http://192.168.4.215:4000";
    this.config = {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 3,
      transports: ["polling", "websocket"],
    };
    this.createConnection();
  }

  createConnection() {
    this.socket = io(this.url, this.config);
    this.socket.on("connect", () => {
      console.log("connected to the server");
    });

    this.errorConnection();
  }

  getAllBusLocations(dispatch) {
    this.socket.emit('join-room', 'allBus')
    this.socket.on("getAllBusLocation", (data) => {
      dispatch(updateTracker(data))
    });
  }

  getBusLocation(room, dispatch) {
    this.socket.emit("join-room", room);
    this.socket.on("getBusLocation", (data) => {
      dispatch(updateTracker(data))
    });
  }

  stopAllBusLocation() {
    this.socket.emit("leave-room", 'allBus');
  }

  stopBusLocation(room) {
    this.socket.emit("leave-room", room);
    this.socket.removeListener("getBusLocation");
  }

  errorConnection() {
    this.socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err}`);
    });
  }

}

export const clientSocket = new Socket();
