// const express = require('express')
// const app = express()
// const cookieParser = require('cookie-parser')
// const cors= require('cors')



// require('./connection');

// require('dotenv').config({path:"./config.env"});

// const PORT = process.env.PORT || 4000;

// app.use(express.json());
// app.use(cookieParser());
// // app.use(cors({
// //   credentials: true,
// //   origin: 'http://localhost:5173'
  
// // }));
// //++++++++++for backend deploy
// app.use(cors({
//   origin: "https://global-connect05.netlify.app", // Your frontend URL
//   // methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// const UserRoutes = require('./routes/user');
// const PostRoutes = require('./routes/post');

// const NotificationRoutes = require('./routes/notification')
// const CommentRoutes = require('./routes/comment')
// const ConversationRoutes = require('./routes/conversations');
// const MessageRoutes = require('./routes/message')



// app.use('/api/auth',UserRoutes);
// app.use('/api/post',PostRoutes);
// app.use('/api/notification',NotificationRoutes);
// app.use('/api/comment',CommentRoutes)

// app.use('/api/conversation',ConversationRoutes)
// app.use('/api/message',MessageRoutes)


// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`)
// })

//++++++++++++++++++++++++++++++deployment
// const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const http = require('http'); // Needed for socket.io
// const { Server } = require('socket.io');

// require('./connection');
// require('dotenv').config({ path: "./config.env" });

// const PORT = process.env.PORT || 4000;

// // Create HTTP server for socket.io
// const server = http.createServer(app);

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // CORS setup for deployed frontend
// app.use(cors({
//   origin: "https://global-connect05.netlify.app", // Your frontend URL
//   credentials: true
// }));

// // Routes
// const UserRoutes = require('./routes/user');
// const PostRoutes = require('./routes/post');
// const NotificationRoutes = require('./routes/notification');
// const CommentRoutes = require('./routes/comment');
// const ConversationRoutes = require('./routes/conversations');
// const MessageRoutes = require('./routes/message');

// app.use('/api/auth', UserRoutes);
// app.use('/api/post', PostRoutes);
// app.use('/api/notification', NotificationRoutes);
// app.use('/api/comment', CommentRoutes);
// app.use('/api/conversation', ConversationRoutes);
// app.use('/api/message', MessageRoutes);

// // Setup Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "https://global-connect05.netlify.app", // Your frontend URL
//     credentials: true,
//     methods: ["GET", "POST"]
//   }
// });

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Example: handle custom events
//   socket.on('sendMessage', (data) => {
//     io.emit('receiveMessage', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected:', socket.id);
//   });
// });

// // Start the server
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


//+++++++++++defaultconst express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

require('./connection');
require('dotenv').config({ path: "./config.env" });

const PORT = process.env.PORT || 4000;

// Create HTTP server
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS for API routes
app.use(cors({
  origin: "https://global-connect05.netlify.app", // Deployed frontend
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/user'));
app.use('/api/post', require('./routes/post'));
app.use('/api/notification', require('./routes/notification'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/conversation', require('./routes/conversations'));
app.use('/api/message', require('./routes/message'));

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "https://global-connect05.netlify.app", // Deployed frontend
    credentials: true,
    methods: ["GET", "POST"]
  },
  transports: ["websocket", "polling"], // Ensure compatibility
});

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Root test route
app.get('/', (req, res) => {
  res.send("✅ Backend is running...");
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
