const mongoose = require('mongoose');
const dotenv = require('dotenv');
const WebSocket = require('ws'); // 👈 Add WebSocket support

// Handle uncaught exceptions (sync errors not caught anywhere)
process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Load env ironment variables
dotenv.config({ path: './config.env' });

// Import Express app
const app = require('./app');

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB)
  .then(() => console.log('✅ DB connection successful!'))
  .catch((err) => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });

// Start HTTP server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🚀 App running on port ${PORT}...`);
});

// ✅ Attach WebSocket server to the same HTTP server (same port)
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('🟢 WebSocket client connected');

  // Send a welcome message
  ws.send('Hello from Natours WebSocket server!');

  // Listen for client messages
  ws.on('message', (msg) => {
    console.log('📩 Received from client:', msg.toString());
    ws.send(`Server echo: ${msg}`);
  });

  // Handle disconnects
  ws.on('close', () => {
    console.log('🔴 WebSocket client disconnected');
  });
});

// Handle unhandled promise rejections (async errors)
process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => process.exit(1));
});
