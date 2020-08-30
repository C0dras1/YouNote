const express = require('express');
const mongoose = require('mongoose');
const note = require('./models/note');
const auth = require('./middleware/auth');
const app = express();

const API_PORT = process.env.PORT || 8080;

app.use(express.json());

const dbPath = "mongodb+srv://c0dras1:901JPJS5672@cluster0.nyhtc.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(dbPath, {
  dbName: 'YouNote',
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the DB.");
}).catch(() => console.log("Error connecting to the database."));

app.all('/api/*', auth);

app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));

app.listen(API_PORT, () => console.log(`listening on Port ${API_PORT}`));