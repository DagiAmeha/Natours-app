const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTIOIN! Shitting down...');
  console.log(process.env.DATABASE);

  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });


console.log(process.env.DATABASE);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shitting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
