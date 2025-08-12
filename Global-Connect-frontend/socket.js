// import {io} from "socket.io-client";

// const socket = io('ws://localhost:4000');


// export default socket;

//+++++++++++++for deployment
// import { io } from "socket.io-client";

// // Read from env, fallback to localhost in development
// const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000', {
//   withCredentials: true
// });


// export default socket;
import { io } from "socket.io-client";

const socket = io('https://global-connect-05.onrender.com', {
    transports: ['websocket'],
    withCredentials: true
});

export default socket;

